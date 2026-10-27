// Clean still of a live page section: real headless Chrome, every ScrollTrigger
// walked once so reveals finish, staging badge hidden, then park and capture.
// usage: node shoot.mjs <url> <out.png> <W> <H> <selector|scrollY> [align]
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { writeFileSync } from "node:fs";
const [url,out,W,H,target,align="center"]=process.argv.slice(2);
const PORT=9333+(Number(process.env.SHOOT_SLOT)||0);
const chrome=spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",["--headless=new","--disable-gpu","--no-first-run",`--remote-debugging-port=${PORT}`,`--window-size=${W},${H}`,"--hide-scrollbars","--force-device-scale-factor=1","--user-data-dir=/tmp/fd-shoot-"+PORT],{stdio:"ignore"});
process.on("exit",()=>{try{chrome.kill("SIGKILL")}catch{}});
let t;for(let i=0;i<60;i++){try{t=await(await fetch(`http://127.0.0.1:${PORT}/json`)).json();if(t.some(x=>x.type==="page"))break}catch{}await sleep(250)}
const ws=new WebSocket(t.find(x=>x.type==="page").webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener("open",r,{once:true}));
let id=0;const p=new Map(),ev=[];const send=(m,q={})=>new Promise(r=>{const i=++id;p.set(i,r);ws.send(JSON.stringify({id:i,method:m,params:q}))});
ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id)}else if(m.method)ev.push(m.method)});
const js=async x=>(await send("Runtime.evaluate",{expression:x,awaitPromise:true,returnByValue:true})).result?.result?.value;
await send("Page.enable");await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride",{width:+W,height:+H,deviceScaleFactor:Number(process.env.SHOOT_DSF)||1,mobile:+W<768});
await send("Page.navigate",{url});for(let i=0;i<80&&!ev.includes("Page.loadEventFired");i++)await sleep(250);await sleep(3500);
await js(`(()=>{const s=document.createElement('style');s.textContent='.w-webflow-badge{display:none!important}::-webkit-scrollbar{display:none!important}${process.env.SHOOT_HIDE?process.env.SHOOT_HIDE+'{display:none!important}':''}';document.head.appendChild(s);return 1})()`);
await js(`(async()=>{for(let y=0;y<document.body.scrollHeight;y+=innerHeight*0.6){scrollTo(0,y);await new Promise(r=>setTimeout(r,220))}return 1})()`);
const ok=await js(/^\d+$/.test(target)?`(()=>{scrollTo(0,${target});return 1})()`:`(()=>{const e=document.querySelector(${JSON.stringify(target)});if(!e)return 0;e.scrollIntoView({block:${JSON.stringify(align)}});return 1})()`);
if(!ok){console.error("selector not found");process.exit(1)}
await sleep(2800);
const shot=await send("Page.captureScreenshot",{format:"png"});writeFileSync(out,Buffer.from(shot.result.data,"base64"));console.log("wrote",out);ws.close();process.exit(0);
