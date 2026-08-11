export function getPackageMediaFallback(_pkg: { slug?: string; state?: string }) {
  return [] as string[];
}

export function getPackagePrimaryImage(pkg: { image?: string; slug?: string; state?: string }) {
  const image = String(pkg.image ?? "").trim();
  return image && !image.includes("package-placeholder") && !image.includes("placeholder.jpg")
    ? image
    : "/images/package-placeholder.jpg";
}
