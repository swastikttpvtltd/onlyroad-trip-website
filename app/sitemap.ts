import type { MetadataRoute } from "next";
import packages from "@/data/packages";
import { seoPages } from "@/data/seo-pages";

const baseUrl = "https://www.onlyroadtrip.com";

const staticPages = [
  "",
  "about",
  "contact",
  "destinations",
  "packages",
  "corporate-travel",
  "corporate-mice-travel",
  "solo-women-travel-packages",
  "char-dham-yatra-package",
  "kedarnath-yatra-package",
  "kashi-yatra-package",
  "ayodhya-yatra-package",
  "jyotirlinga-yatra",
  "plan-your-trip",
  "booking-policy",
  "cancellation-policy",
  "refund-policy",
  "privacy-policy",
  "cookie-policy",
  "disclaimer",
  "terms-and-conditions",
] as const;

const destinationSlugs = [
  "andhra-pradesh",
  "gujarat",
  "himachal-pradesh",
  "jammu-kashmir",
  "kedarnath",
  "kerala",
  "ladakh",
  "lakshadweep",
  "maharashtra",
  "meghalaya",
  "odisha",
  "rajasthan",
  "sikkim",
  "tamil-nadu",
  "uttar-pradesh",
  "uttarakhand",
  "west-bengal",
];

const legalPages = new Set([
  "privacy-policy",
  "cookie-policy",
  "disclaimer",
  "terms-and-conditions",
]);

function makePage(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly",
): MetadataRoute.Sitemap[number] {
  return {
    url: path ? `${baseUrl}/${path}` : baseUrl,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticEntries = staticPages.map((path) => {
    if (path === "") return makePage(path, 1, "weekly");
    if (legalPages.has(path)) return makePage(path, 0.2, "yearly");
    if (
      [
        "char-dham-yatra-package",
        "kedarnath-yatra-package",
        "kashi-yatra-package",
        "ayodhya-yatra-package",
      ].includes(path)
    ) {
      return makePage(path, 0.95, "weekly");
    }
    return makePage(path, 0.8, "weekly");
  });

  const destinationEntries = destinationSlugs.map((slug) =>
    makePage(`destinations/${slug}`, 0.85, "weekly"),
  );

  const packageEntries = packages
    .filter((pkg) => Boolean(pkg?.slug))
    .map((pkg) => makePage(`packages/${pkg.slug}`, 0.9, "weekly"));

  const seoEntries = Object.keys(seoPages)
    .filter(Boolean)
    .map((slug) => makePage(slug, 0.9, "weekly"));

  // Keep every public URL only once.
  const unique = new Map<string, MetadataRoute.Sitemap[number]>();
  for (const entry of [
    ...staticEntries,
    ...destinationEntries,
    ...packageEntries,
    ...seoEntries,
  ]) {
    if (!unique.has(entry.url)) unique.set(entry.url, entry);
  }

  return Array.from(unique.values());
}
