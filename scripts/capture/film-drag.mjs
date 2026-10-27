// Film an interaction: park on a widget and drive a real pointer drag across it.
// Genuine CDP mouse events exercise whatever powers the widget (pointer events,
// a range input, a CSS variable) exactly as a visitor would.
//
// usage: node film-drag.mjs <url> <dir> <W> <H> <containerSel> <handleSel> <seconds>
import { setTimeout as sleep } from "node:timers/promises";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { openChrome } from "./cdp.mjs";

const [url, dir, W, H, containerSel, handleSel, secs] = process.argv.slice(2);
rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
const c = await openChrome({ port: 9950 + (Number(process.env.SHOOT_SLOT) || 0), width: +W, height: +H });
let n = 0, filming = false;
c.onEvent(m => {
  if (m.method !== "Page.screencastFrame") return;
  if (filming) writeFileSync(`${dir}/f${String(n++).padStart(5, "0")}.png`, Buffer.from(m.params.data, "base64"));
  c.send("Page.screencastFrameAck", { sessionId: m.params.sessionId });
});
await c.send("Page.enable"); await c.send("Runtime.enable");
await c.send("Emulation.setDeviceMetricsOverride", { width: +W, height: +H, deviceScaleFactor: 1, mobile: false });
await c.send("Page.navigate", { url }); await c.waitForLoad(); await sleep(2500);

const vis = s => `[...document.querySelectorAll(${JSON.stringify(s)})].find(e=>e.offsetWidth>0&&e.getBoundingClientRect().height>0)`;
await c.evalJs(`(()=>{${vis(containerSel)}?.scrollIntoView({block:'center'});return 1})()`);
await sleep(2200); // let the widget's own entrance settle
const box = await c.evalJs(`(() => {
  const ct = ${vis(containerSel)}; if (!ct) return null;
  const h = ${vis(handleSel)} || ct, cb = ct.getBoundingClientRect(), hb = h.getBoundingClientRect();
  return JSON.stringify({ x: Math.round(hb.left + hb.width/2), y: Math.round(hb.top + hb.height/2),
    left: Math.round(cb.left + cb.width*0.14), right: Math.round(cb.left + cb.width*0.86) });
})()`);
if (!box) { console.error("container not found"); process.exit(1); }
const { x, y, left, right } = JSON.parse(box);

await c.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: +W, maxHeight: +H });
filming = true; await sleep(500);
const mouse = (type, px) => c.send("Input.dispatchMouseEvent",
  { type, x: px, y, button: "left", buttons: type === "mouseReleased" ? 0 : 1, clickCount: 1 });
const mid = Math.round((left + right) / 2), legs = [[x, left], [left, right], [right, mid]];
const perLeg = (Number(secs) * 1000) / legs.length;
await mouse("mouseMoved", x); await mouse("mousePressed", x);
for (const [from, to] of legs) {
  const steps = Math.max(12, Math.round(perLeg / 22));
  for (let i = 1; i <= steps; i++) {
    const t = i / steps, ease = t < 0.5 ? 2*t*t : 1 - Math.pow(-2*t + 2, 2) / 2;
    await mouse("mouseMoved", Math.round(from + (to - from) * ease)); await sleep(perLeg / steps);
  }
}
await mouse("mouseReleased", mid); await sleep(700);
filming = false;
await c.send("Page.stopScreencast");
console.log(`captured ${n} frames -> ${dir}`);
c.close(); process.exit(0);
