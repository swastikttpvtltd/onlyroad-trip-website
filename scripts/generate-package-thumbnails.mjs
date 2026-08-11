import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const sourceRoot = path.join(root, "public", "images", "packages");
const outputRoot = path.join(root, "public", "images", "package-thumbnails");
const WIDTH = 800;
const HEIGHT = 500;

async function walk(dir, relative = "") {
  if (!fs.existsSync(dir)) return [];
  const result = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const absolute = path.join(dir, entry.name);
    const rel = path.posix.join(relative, entry.name);

    if (entry.isDirectory()) {
      result.push(...(await walk(absolute, rel)));
      continue;
    }

    try {
      const metadata = await sharp(absolute, { animated: false }).metadata();
      if (metadata.width && metadata.height) result.push(rel);
    } catch {
      // Ignore non-image files.
    }
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
    // Generate ONLY a sharp, transparent foreground thumbnail.
    // No blur, crop or artificial background is baked into the thumbnail.
    await sharp(input, { animated: false })
      .rotate()
      .resize(WIDTH, HEIGHT, {
        fit: "contain",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
        withoutEnlargement: false,
      })
      .webp({ quality: 88, effort: 4, alphaQuality: 90 })
      .toFile(output);

    return true;
  } catch (error) {
    console.warn(`Skipped thumbnail: ${relativeFile}`, error?.message || error);
    return false;
  }
}

async function main() {
  const files = (await walk(sourceRoot)).sort((a, b) => a.localeCompare(b));
  let generated = 0;

  for (const file of files) {
    if (await makeThumbnail(file)) generated += 1;
  }

  console.log(`Package thumbnails generated: ${generated} image(s), ${WIDTH}x${HEIGHT}, with no per-package image-count or extension whitelist.`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
