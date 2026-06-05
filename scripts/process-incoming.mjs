/**
 * One-off: optimize the raw screenshots in public/incoming/ and the avatars in
 * public/avatars/ into web-ready webp under public/assets/. Selection per
 * project is curated below. Safe to delete public/incoming after running.
 */
import sharp from "sharp";

const screens = [
  ["truenorth1","truenorth-hero",1500], ["truenorth5","truenorth-shot1",1400],
  ["truenorth2","truenorth-shot2",1400], ["truenorth4","truenorth-shot3",1400],
  ["k2btools1","k2btools-hero",1500], ["k2btools2","k2btools-shot1",1400],
  ["k2btools3","k2btools-shot2",1400], ["k2btools4","k2btools-shot3",1400],
  ["bike1","bike-hero",1500], ["bikeloader","bike-shot1",1400],
  ["bike2","bike-shot2",1400], ["bike3","bike-shot3",1400],
  ["homeorganizers1","homeorganizers-hero",1500], ["homeorganizers2","homeorganizers-shot1",1400],
  ["homeorganizers4","homeorganizers-shot2",1400], ["homeorganizers3","homeorganizers-shot3",1400],
  ["nextfense1","nextfense-hero",1500], ["nextfense2","nextfense-shot1",1400],
  ["nextfense3","nextfense-shot2",1400], ["nextfense4","nextfense-shot3",1400],
  ["seilas1","seilas-card",1400],
];
const avatars = [
  ["carolinafreese.avif","carolinafreese"], ["eugenia.jpeg","eugenia"],
  ["maxsher.jpeg","maxsher"], ["artem.avif","artem"], ["francocaputo.avif","francocaputo"],
];

for (const [src, out, w] of screens) {
  await sharp(`public/incoming/${src}.png`).resize({ width: w, withoutEnlargement: true })
    .webp({ quality: 78 }).toFile(`public/assets/${out}.webp`);
}
for (const [src, out] of avatars) {
  await sharp(`public/avatars/${src}`).resize(200, 200, { fit: "cover", position: "attention" })
    .webp({ quality: 82 }).toFile(`public/assets/avatars/${out}.webp`);
}
console.log("processed", screens.length, "screens +", avatars.length, "avatars");
