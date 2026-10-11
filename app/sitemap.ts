import type { MetadataRoute } from "next";
import packages from "@/data/packages";
import { seoPages } from "@/data/seo-pages";
import { publicSeoPaths } from "@/data/publicSeoPaths";
import { absoluteImageUrl, siteUrl } from "@/lib/siteSeo";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = new Set<string>([
    ...publicSeoPaths,
    ...Object.keys(seoPages),
    ...packages.map(pkg => "packages/" + pkg.slug),
  ]);
  const images = new Map(packages.map(pkg => ["packages/" + pkg.slug, absoluteImageUrl(pkg.image)]));
  // Omit lastModified until real per-page modification dates are available.
  // A request timestamp must not claim that every page's content just changed.
  return [...paths].sort().map(path => ({
    url: path ? siteUrl + "/" + path : siteUrl + "/",
    ...(images.has(path) ? { images: [images.get(path)!] } : {}),
  }));
}
