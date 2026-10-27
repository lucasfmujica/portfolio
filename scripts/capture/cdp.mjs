// Shared plumbing for the capture scripts: launch a headless Chrome and talk
// to it over the DevTools Protocol with nothing but Node's built-in WebSocket.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

export async function openChrome({ port, width, height }) {
  const proc = spawn(CHROME, [
    "--headless=new", "--disable-gpu", "--no-first-run", "--no-default-browser-check",
    `--remote-debugging-port=${port}`, `--window-size=${width},${height}`,
    "--hide-scrollbars", "--force-device-scale-factor=1", `--user-data-dir=/tmp/capture-${port}`,
  ], { stdio: "ignore" });
  process.on("exit", () => { try { proc.kill("SIGKILL"); } catch {} });

  let targets;
  for (let i = 0; i < 60; i++) {
    try {
      targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json();
      if (targets.some(t => t.type === "page")) break;
    } catch {}
    await sleep(250);
  }
  const ws = new WebSocket(targets.find(t => t.type === "page").webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener("open", r, { once: true }));

  let id = 0;
  const pending = new Map(), events = [], listeners = [];
  ws.addEventListener("message", e => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
    if (m.method) { events.push(m.method); listeners.forEach(fn => fn(m)); }
  });
  const send = (method, params = {}) =>
    new Promise(res => { const n = ++id; pending.set(n, res); ws.send(JSON.stringify({ id: n, method, params })); });
  const evalJs = async expr =>
    (await send("Runtime.evaluate", { expression: expr, awaitPromise: true, returnByValue: true }))
      .result?.result?.value;
  const waitForLoad = async () => {
    for (let i = 0; i < 80 && !events.includes("Page.loadEventFired"); i++) await sleep(250);
  };
  const onEvent = fn => listeners.push(fn);
  const close = () => { ws.close(); try { proc.kill("SIGKILL"); } catch {} };
  return { send, evalJs, waitForLoad, onEvent, close };
}

/** Hide staging-only chrome (Webflow badge, scrollbars) plus any selectors in SHOOT_HIDE. */
export const hideChromeCss = () =>
  `(()=>{const s=document.createElement('style');s.textContent=\`
    .w-webflow-badge,[class*="w-webflow-badge"]{display:none!important}
    ::-webkit-scrollbar{display:none!important}
    ${process.env.SHOOT_HIDE ? process.env.SHOOT_HIDE + "{display:none!important}" : ""}\`;
    document.head.appendChild(s);return 1})()`;
