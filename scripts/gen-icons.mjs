/**
 * Favicon / icon generator.
 *
 * The brand is typographic — the "Lucas Mujica." wordmark with the ember
 * period (see components/layout/Wordmark.tsx). The favicon distills that into
 * an "LM." monogram on the dark "ink" tile. Run with:
 *   node scripts/gen-icons.mjs
 *
 * Emits the App Router icon conventions (src/app/) plus manifest PNGs (public/).
 * To swap in a real graphic logo later, replace `monogramSvg` below and re-run.
 */
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const INK = "#0b0b0d";
const EMBER = "#ff4d2e";

// 512×512 master: rounded ink tile, "LM" monogram, ember period dot.
const masterSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="112" fill="${INK}"/>
  <text x="248" y="270" font-family="Helvetica, Arial, sans-serif" font-weight="700" font-size="236" letter-spacing="-6" fill="#ffffff" text-anchor="middle" dominant-baseline="central">LM</text>
  <circle cx="408" cy="338" r="22" fill="${EMBER}"/>
</svg>`;

const svgBuf = Buffer.from(masterSvg);
const png = (size) => sharp(svgBuf, { density: 384 }).resize(size, size).png().toBuffer();

// Build a multi-image .ico (PNG-encoded entries, Vista+).
function buildIco(images) {
  const count = images.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(count, 4);
  const dir = Buffer.alloc(16 * count);
  let offset = 6 + 16 * count;
  images.forEach((img, i) => {
    const b = i * 16;
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b);
    dir.writeUInt8(img.size >= 256 ? 0 : img.size, b + 1);
    dir.writeUInt8(0, b + 2);
    dir.writeUInt8(0, b + 3);
    dir.writeUInt16LE(1, b + 4);
    dir.writeUInt16LE(32, b + 6);
    dir.writeUInt32LE(img.data.length, b + 8);
    dir.writeUInt32LE(offset, b + 12);
    offset += img.data.length;
  });
  return Buffer.concat([header, dir, ...images.map((i) => i.data)]);
}

// App Router icons
await writeFile(join(root, "src/app/icon.svg"), masterSvg);
await writeFile(join(root, "src/app/apple-icon.png"), await png(180));

const ico = buildIco(
  await Promise.all([16, 32, 48].map(async (size) => ({ size, data: await png(size) }))),
);
await writeFile(join(root, "src/app/favicon.ico"), ico);

// Manifest PNGs
await writeFile(join(root, "public/icon-192.png"), await png(192));
await writeFile(join(root, "public/icon-512.png"), await png(512));
await writeFile(join(root, "public/icon-maskable-512.png"), await png(512));

console.log("icons generated: favicon.ico (16/32/48), icon.svg, apple-icon.png (180), icon-192/512.png");
