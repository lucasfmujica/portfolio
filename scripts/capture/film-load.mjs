// Film a page's LOAD sequence (a preloader), not its scroll. The camera rolls
// before navigation commits; cache is off so it plays like a first visit.
// The first few frames are the blank tab: trim them before encoding.
//
// usage: node film-load.mjs <url> <framesDir> <W> <H> <seconds>
import { setTimeout as sleep } from "node:timers/promises";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { openChrome } from "./cdp.mjs";

const [url, dir, W, H, secs] = process.argv.slice(2);
rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
const c = await openChrome({ port: 9800 + (Number(process.env.SHOOT_SLOT) || 0), width: +W, height: +H });
let n = 0, filming = false;
c.onEvent(m => {
  if (m.method !== "Page.screencastFrame") return;
  if (filming) writeFileSync(`${dir}/f${String(n++).padStart(5, "0")}.png`, Buffer.from(m.params.data, "base64"));
  c.send("Page.screencastFrameAck", { sessionId: m.params.sessionId });
});
await c.send("Page.enable");
await c.send("Emulation.setDeviceMetricsOverride", { width: +W, height: +H, deviceScaleFactor: 1, mobile: false });
await c.send("Network.enable"); await c.send("Network.setCacheDisabled", { cacheDisabled: true });
await c.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: +W, maxHeight: +H });
filming = true;
c.send("Page.navigate", { url }); // deliberately not awaited: roll first
await sleep(Number(secs) * 1000);
filming = false;
await c.send("Page.stopScreencast");
console.log(`captured ${n} frames -> ${dir}`);
c.close(); process.exit(0);
