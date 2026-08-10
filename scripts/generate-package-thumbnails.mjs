import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "public", "images", "packages");
const outputRoot = path.join(root, "public", "images", "package-thumbnails");
const WIDTH = 800;
const HEIGHT = 500;
const MAX_PACKAGE_PHOTOS = 10;

const imageExtensions = new Set([
  ".jpg", ".jpeg", ".jpe", ".jfif", ".png", ".webp", ".avif", ".gif",
  ".bmp", ".dib", ".tif", ".tiff", ".svg", ".ico", ".heic", ".heif", ".jxl",
]);

function walk(dir, relative = "") {
  if (!fs.existsSync(dir)) return [];
  const result = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    const rel = path.posix.join(relative, entry.name);
    if (entry.isDirectory()) result.push(...walk(absolute, rel));
    else if (imageExtensions.has(path.extname(entry.name).toLowerCase())) result.push(rel);
  }
  return result;
}

function safeOutputPath(relativeFile) {
  const withoutExt = relativeFile.replace(/\.[^.]+$/, "");
  return path.join(outputRoot, `${withoutExt}.webp`);
}

async function makeThumbnail(relativeFile) {
  const input = path.join(sourceRoot, relativeFile);
  const output = safeOutputPath(relativeFile);
  fs.mkdirSync(path.dirname(output), { recursive: true });

  try {
    const image = sharp(input, { animated: false }).rotate();
    const metadata = await image.metadata();
    if (!metadata.width || !metadata.height) return false;

    // The actual photo is never cropped. A blurred, cover-sized copy fills
    // the canvas behind it, while the complete original photo is fitted inside.
    const background = await image
      .resize(WIDTH, HEIGHT, { fit: "cover" })
      .blur(18)
      .modulate({ brightness: 0.82, saturation: 0.9 })
      .png()
      .toBuffer();

    const foreground = await image
      .resize(WIDTH, HEIGHT, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();

    await sharp(background)
      .composite([{ input: foreground, blend: "over" }])
      .webp({ quality: 86, effort: 4 })
      .toFile(output);

    return true;
  } catch (error) {
    console.warn(`Skipped thumbnail: ${relativeFile}`, error?.message || error);
    return false;
  }
}

async function main() {
  const files = walk(sourceRoot).sort((a, b) => a.localeCompare(b));
  const seenFolders = new Map();
  let generated = 0;

  for (const file of files) {
    const folder = path.posix.dirname(file);
    const count = seenFolders.get(folder) || 0;
    if (count >= MAX_PACKAGE_PHOTOS) continue;
    seenFolders.set(folder, count + 1);
    if (await makeThumbnail(file)) generated += 1;
  }

  console.log(`Package thumbnails generated: ${generated} image(s), ${WIDTH}x${HEIGHT}, maximum ${MAX_PACKAGE_PHOTOS} per package.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
