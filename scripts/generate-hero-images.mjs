import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const directory = path.join(process.cwd(), "public/images/hero");
const files = (await fs.readdir(directory)).filter(name => /^hero(?:-\d+)?\.png$/.test(name)).sort();
let before = 0;
let after = 0;
for (const file of files) {
  const source = path.join(directory, file);
  const target = source.replace(/\.png$/, ".webp");
  before += (await fs.stat(source)).size;
  // Preserve the same photo, aspect ratio and slide order. Generate assets at
  // build time so hero requests do not require per-request image conversion.
  await sharp(source).rotate().resize({ width: 1920, withoutEnlargement: true })
    .webp({ quality: 90, effort: 5 }).toFile(target);
  after += (await fs.stat(target)).size;
}
console.log(`Hero images: ${files.length}; original ${before} bytes; optimized ${after} bytes; reduction ${((1-after/before)*100).toFixed(1)}%.`);
