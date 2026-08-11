import { readdir } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

const IMAGE_EXTENSIONS = new Set([
  ".jpg", ".jpeg", ".jpe", ".jfif", ".png", ".webp", ".avif", ".gif",
  ".bmp", ".dib", ".tif", ".tiff", ".svg", ".ico", ".heic", ".heif", ".jxl",
]);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const folderParam = searchParams.get("folder")?.trim() ?? "";

  if (!folderParam || folderParam.includes("..") || folderParam.startsWith("/") || folderParam.includes("\\")) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  // Accept both the old package path (packages/...) and direct public-image paths.
  const normalizedFolder = folderParam.replace(/^images\//, "");
  const publicRoot = path.join(process.cwd(), "public", "images");
  const absoluteFolder = path.resolve(publicRoot, normalizedFolder);

  if (absoluteFolder !== publicRoot && !absoluteFolder.startsWith(`${publicRoot}${path.sep}`)) {
    return NextResponse.json({ images: [] }, { status: 400 });
  }

  try {
    const entries = await readdir(absoluteFolder, { withFileTypes: true });
    const images = entries
      .filter((entry) => entry.isFile() && IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase()))
      .map((entry) => `/images/${normalizedFolder}/${encodeURIComponent(entry.name)}`)
      .sort((a, b) => a.localeCompare(b));

    return NextResponse.json(
      { images },
      { headers: { "Cache-Control": "public, max-age=300, stale-while-revalidate=3600" } },
    );
  } catch {
    return NextResponse.json({ images: [] }, { status: 200 });
  }
}
