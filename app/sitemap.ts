import type { MetadataRoute } from "next";
import packages from "@/data/packages";
import { seoPages } from "@/data/seo-pages";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

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
  "andhra-pradesh", "gujarat", "himachal-pradesh", "jammu-kashmir",
  "kedarnath", "kerala", "ladakh", "lakshadweep", "maharashtra",
  "meghalaya", "odisha", "rajasthan", "sikkim", "tamil-nadu",
  "uttar-pradesh", "uttarakhand", "west-bengal",
];

const legalPages = new Set([
  "privacy-policy", "cookie-policy", "disclaimer", "terms-and-conditions",
  "booking-policy", "cancellation-policy", "refund-policy",
]);

function makePage(path: string, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] = "weekly") {
  return {
    url: path ? `${baseUrl}/${path}` : baseUrl,
    lastModified: new Date(),
    changeFrequency,
    priority,
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...staticPages,
    ...destinationSlugs.map((slug) => `destinations/${slug}`),
    ...packages.filter((pkg) => Boolean(pkg?.slug)).map((pkg) => `packages/${pkg.slug}`),
    ...Object.keys(seoPages).filter(Boolean),
  ];

  const unique = new Set(paths);
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of SUPPORTED_LOCALES) {
    for (const path of unique) {
      const priority = path === "" ? 1 : legalPages.has(path) ? 0.2 : path.includes("packages/") ? 0.9 : 0.8;
      entries.push(makePage(`${locale}/${path}`, priority, legalPages.has(path) ? "yearly" : "weekly"));
    }
  }

  return entries;
}
