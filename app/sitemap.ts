import { MetadataRoute } from "next";
import packages from "@/data/packages";

const baseUrl = "https://www.onlyroadtrip.com";
const destinationSlugs = ["andhra-pradesh","gujarat","himachal-pradesh","jammu-kashmir","kedarnath","kerala","ladakh","lakshadweep","maharashtra","meghalaya","odisha","rajasthan","sikkim","tamil-nadu","uttar-pradesh","uttarakhand","west-bengal"];
const seoSlugs = [
  "kashmir-tour","manali-tour","leh-ladakh-tour","himachal-tour","uttarakhand-tour","rajasthan-tour","kerala-tour","goa-tour","sikkim-tour","darjeeling-tour",
  "kedarnath-yatra-from-delhi","kedarnath-badrinath-yatra-from-delhi","char-dham-yatra-from-delhi","ayodhya-varanasi-tour","varanasi-ayodhya-prayagraj-tour","kashmir-tour-from-delhi","manali-tour-from-delhi","leh-ladakh-tour-from-delhi","rajasthan-tour-from-delhi",
  "corporate-tour-packages","group-tour-packages","family-tour-packages","senior-citizen-tour-packages","customized-tour-packages","luxury-tour-packages","road-trip-packages","pilgrimage-tour-packages",
  "travel-agent-in-delhi","travel-agent-in-gurgaon","travel-agent-in-noida","travel-agent-in-faridabad","travel-agent-in-rohtak"
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/corporate-travel`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/corporate-mice-travel`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/solo-women-travel-packages`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/char-dham-yatra-package`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/kedarnath-yatra-package`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/kashi-yatra-package`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/ayodhya-yatra-package`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/terms-and-conditions`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/booking-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/refund-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cancellation-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/cookie-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${baseUrl}/disclaimer`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];
  const destinationPages = destinationSlugs.map((slug) => ({ url: `${baseUrl}/destinations/${slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 }));
  const packagePages = packages.map((pkg) => ({ url: `${baseUrl}/packages/${pkg.slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.85 }));
  const seoPages = seoSlugs.map((slug) => ({ url: `${baseUrl}/${slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9 }));
  return [...staticPages, ...destinationPages, ...packagePages, ...seoPages];
}
