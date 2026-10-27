// Film a real scroll through one section of a live page, as PNG frames.
// There is deliberately NO warm-up scroll: ScrollTrigger reveals are usually
// `once: true`, so pre-scrolling would burn them and the clip would show a page
// where nothing moves. For a looping clip keep the window tight: whatever share
// of the travel shows the subject is the share of the loop a viewer sees it.
//
// usage: SHOOT_TARGET='<selector>' node film.mjs <url> <framesDir> <W> <H> <seconds>
//   SHOOT_LEAD / SHOOT_TRAIL  window around the target, in viewport heights (0.9 / 0.25)
//   SHOOT_HIDE                extra selectors to hide (e.g. a promo modal)
import { setTimeout as sleep } from "node:timers/promises";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { openChrome, hideChromeCss } from "./cdp.mjs";

const [url, dir, W, H, secs] = process.argv.slice(2);
const target = process.env.SHOOT_TARGET;
if (!target) { console.error("set SHOOT_TARGET to the section selector"); process.exit(2); }
rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });

const c = await openChrome({ port: 9500 + (Number(process.env.SHOOT_SLOT) || 0), width: +W, height: +H });
let n = 0, filming = false;
c.onEvent(m => {
  if (m.method !== "Page.screencastFrame") return;
  if (filming) writeFileSync(`${dir}/f${String(n++).padStart(5, "0")}.png`, Buffer.from(m.params.data, "base64"));
  c.send("Page.screencastFrameAck", { sessionId: m.params.sessionId });
});

await c.send("Page.enable"); await c.send("Runtime.enable");
await c.send("Emulation.setDeviceMetricsOverride", { width: +W, height: +H, deviceScaleFactor: 1, mobile: +W < 768 });
await c.send("Page.navigate", { url }); await c.waitForLoad();
await c.evalJs(hideChromeCss());
await sleep(3000); // let the preloader finish before rolling

const range = await c.evalJs(`(() => {
  const el = document.querySelector(${JSON.stringify(target)}); if (!el) return null;
  const max = document.body.scrollHeight - innerHeight, top = el.getBoundingClientRect().top + scrollY;
  return { from: Math.max(0, top - innerHeight * ${Number(process.env.SHOOT_LEAD || 0.9)}),
           to: Math.min(max, top + innerHeight * ${Number(process.env.SHOOT_TRAIL || 0.25)}) };
})()`);
if (!range) { console.error("target not found"); process.exit(1); }
// park BEFORE the camera rolls, so the jump to the start isn't in frame
await c.evalJs(`(()=>{scrollTo(0,${range.from});return 1})()`); await sleep(1200);

await c.send("Page.startScreencast", { format: "png", everyNthFrame: 1, maxWidth: +W, maxHeight: +H });
filming = true;
await c.evalJs(`(async () => {
  const dur = ${Number(secs)} * 1000, t0 = performance.now();
  await new Promise(done => { (function step(now) {
    const p = Math.min(1, (now - t0) / dur);
    scrollTo(0, ${range.from} + (${range.to} - ${range.from}) * p);
    p < 1 ? requestAnimationFrame(step) : done();
  })(t0); });
  await new Promise(r => setTimeout(r, 700)); return 1;
})()`);
filming = false;
await c.send("Page.stopScreencast");
console.log(`captured ${n} frames -> ${dir}`);
c.close(); process.exit(0);
