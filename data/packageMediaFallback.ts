import { packageMedia } from "./packageMedia";

function toThumbnailPath(image: string) {
  if (!image) return image;
  if (!image.startsWith("/images/packages/")) return image;
  return image
    .replace(/^\/images\/packages\//, "/images/package-thumbnails/")
    .replace(/\.[^.]+$/, ".webp");
}

export function getPackageMediaFallback(pkg: { slug?: string; state?: string }) {
  const slug = String(pkg.slug ?? "").trim();
  if (!slug) return [] as string[];

  const key = Object.keys(packageMedia).find((entry) => entry.endsWith(`/${slug}`));
  const media = key ? packageMedia[key] ?? [] : [];

  // Generated thumbnails are the most reliable local format for the new package gallery.
  return media.map(toThumbnailPath);
}

export function getPackagePrimaryImage(pkg: { image?: string; slug?: string; state?: string }) {
  const image = String(pkg.image ?? "").trim();
  if (image && !image.includes("package-placeholder") && !image.includes("placeholder.jpg")) {
    return image;
  }

  const fallback = getPackageMediaFallback(pkg);
  return fallback[0] ?? "/images/package-placeholder.jpg";
}
