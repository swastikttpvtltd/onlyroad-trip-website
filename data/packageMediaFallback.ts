import { packageMedia } from "./packageMedia";

export function getPackageMediaFallback(pkg: { slug?: string; state?: string }) {
  const slug = String(pkg.slug ?? "").trim();
  if (!slug) return [] as string[];

  const key = Object.keys(packageMedia).find((entry) => entry.endsWith(`/${slug}`));
  return key ? packageMedia[key] ?? [] : [];
}

export function getPackagePrimaryImage(pkg: { image?: string; slug?: string; state?: string }) {
  const image = String(pkg.image ?? "").trim();
  if (image && !image.includes("package-placeholder") && !image.includes("placeholder.jpg")) {
    return image;
  }

  const fallback = getPackageMediaFallback(pkg);
  return fallback[0] ?? "/images/package-placeholder.jpg";
}
