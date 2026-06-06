/**
 * Email-signature asset generator.
 *
 * Email clients can't load @font-face, so the brand display face (Clash
 * Display) never renders in a signature built from live text. This script
 * rasterizes the two pieces that MUST be the real brand face — the
 * "Lucas Mujica." wordmark and the "LM." monogram tile — to retina PNGs,
 * reusing the same next/og + .ttf pipeline as the OG card. Everything else in
 * the signature stays as live, clickable HTML text (mono eyebrow + links).
 *
 *   node scripts/gen-signature.mjs
 *
 * Emits to public/signature/ — served from https://lucasmujica.dev/signature/*
 */
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";
import React from "react";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/signature");
const h = React.createElement;

const INK = "#0b0b0d";
const EMBER = "#ff4d2e";

const font = (file) => readFile(join(root, "public/fonts", file));
const [clashBold] = await Promise.all([font("ClashDisplay-Bold.ttf")]);

const clashFonts = [{ name: "Clash Display", data: clashBold, style: "normal", weight: 700 }];

async function render(el, width, height) {
  const res = new ImageResponse(el, { width, height, fonts: clashFonts });
  return Buffer.from(await res.arrayBuffer());
}

await mkdir(outDir, { recursive: true });

// ── 1. Wordmark "Lucas Mujica." — white, ember period, transparent bg ───────
// Rendered oversized then trimmed to a tight crop; displayed at half size.
const wordmark = h(
  "div",
  {
    style: {
      display: "flex",
      alignItems: "baseline",
      fontFamily: "Clash Display",
      fontWeight: 700,
      fontSize: 72,
      letterSpacing: -1.2,
      lineHeight: 1,
      color: "#fafaf7",
      padding: "6px 8px",
    },
  },
  "Lucas Mujica",
  h("span", { style: { color: EMBER } }, "."),
);
const wordmarkPng = await render(wordmark, 720, 110);
// Trim transparent padding → tight bounds, keep crispness.
await sharp(wordmarkPng).trim().png().toFile(join(outDir, "wordmark.png"));

// ── 2. Monogram tile "LM." — dark tile, hairline border, ember period ───────
// Matches the OG card / favicon mark. 2× of the 52px display tile.
const monogram = h(
  "div",
  {
    style: {
      display: "flex",
      width: 104,
      height: 104,
      alignItems: "center",
      justifyContent: "center",
      background: "#141416",
      border: "2px solid #2a2a30",
      borderRadius: 28,
      fontFamily: "Clash Display",
      fontWeight: 700,
      fontSize: 46,
      letterSpacing: -1,
      color: "#fafaf7",
    },
  },
  "LM",
  h("span", { style: { color: EMBER } }, "."),
);
const monogramPng = await render(monogram, 104, 104);
await writeFile(join(outDir, "monogram.png"), monogramPng);

// ── 3. Ember-on-ink monogram variant (filled tile) — optional alt ───────────
const monogramFilled = h(
  "div",
  {
    style: {
      display: "flex",
      width: 104,
      height: 104,
      alignItems: "center",
      justifyContent: "center",
      background: EMBER,
      borderRadius: 28,
      fontFamily: "Clash Display",
      fontWeight: 700,
      fontSize: 46,
      letterSpacing: -1,
      color: INK,
    },
  },
  "LM",
  h("span", { style: { color: INK } }, "."),
);
await writeFile(join(outDir, "monogram-filled.png"), await render(monogramFilled, 104, 104));

console.log("signature assets → public/signature/ : wordmark.png, monogram.png, monogram-filled.png");
