const LAKSHADWEEP_FOLDERS: Record<string, string> = {
  "lakshadweep-kavaratti-island": "Lakshadweep-Kavaratti-Island-Escape",
  "lakshadweep-agatti-island": "Lakshadweep-Agatti-Island-Holiday",
  "lakshadweep-honeymoon": "Romantic-Lakshadweep-Honeymoon",
  "lakshadweep-water-sports": "Lakshadweep-Lagoon-Water-Sports-Escape",
};

export function getPackageMediaFallback(pkg: { slug?: string; state?: string }) {
  if (String(pkg.state ?? "").trim().toLowerCase() !== "lakshadweep") return [];

  const folder = LAKSHADWEEP_FOLDERS[String(pkg.slug ?? "").trim().toLowerCase()];
  if (!folder) return [];

  const base = `/images/lakshadweep/${folder}`;
  return [
    `${base}/hero.jpg`,
    `${base}/gallery1.jpg`,
    `${base}/gallery2.jpg`,
    `${base}/gallery3.jpg`,
    `${base}/gallery4.jpg`,
  ];
}

export function getPackagePrimaryImage(pkg: { image?: string; slug?: string; state?: string }) {
  const fallback = getPackageMediaFallback(pkg)[0];
  const image = String(pkg.image ?? "").trim();

  if (!image || image.includes("package-placeholder") || image.includes("placeholder.jpg")) {
    return fallback ?? "/images/package-placeholder.jpg";
  }

  return image;
}
