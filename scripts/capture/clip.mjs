// Turn raw screencast frames into a web clip: drop leading frames, resample to
// a fixed length/fps, scale down, then encode. Defaults match what ships on the
// case studies: 5 s, 24 fps, 960 px wide, ~1.2 Mbps (≈750 KB).
//
// usage: node clip.mjs <framesDir> <out.mp4> [--seconds 5] [--fps 24] [--width 960] [--skip 0]
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const [src, out, ...rest] = process.argv.slice(2);
const opt = k => { const i = rest.indexOf(`--${k}`); return i >= 0 ? Number(rest[i + 1]) : undefined; };
const seconds = opt("seconds") ?? 5, fps = opt("fps") ?? 24, width = opt("width") ?? 960, skip = opt("skip") ?? 0;

const here = dirname(fileURLToPath(import.meta.url));
const bin = join(here, "encode");
if (!existsSync(bin) || statSync(bin).mtimeMs < statSync(join(here, "encode.swift")).mtimeMs)
  execFileSync("swiftc", ["-O", join(here, "encode.swift"), "-o", bin], { stdio: "inherit" });

const frames = readdirSync(src).filter(f => f.endsWith(".png")).sort().slice(skip);
const target = Math.min(frames.length, Math.round(seconds * fps)), stride = frames.length / target;
const tmp = `${src}-${width}`; rmSync(tmp, { recursive: true, force: true }); mkdirSync(tmp);
for (let n = 0; n < target; n++)
  await sharp(join(src, frames[Math.min(frames.length - 1, Math.floor(n * stride))]))
    .resize(width).png().toFile(join(tmp, `f${String(n).padStart(5, "0")}.png`));
execFileSync(bin, [tmp, out, String(fps)], { stdio: "inherit" });
rmSync(tmp, { recursive: true, force: true });
console.log(`${out}: ${Math.round(statSync(out).size / 1024)} KB`);
