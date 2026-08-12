import { MetadataRoute } from "next";
import packages from "@/data/packages";

const baseUrl = "https://www.onlyroadtrip.com";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/destinations`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/packages`, lastModified: now, changeFrequency: "daily", priority: 0.95 },
    { url: `${baseUrl}/corporate-travel`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/north-india`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/south-india`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/honeymoon-packages`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/pilgrimage-tours`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/adventure-travel`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/heritage-cultural-tours`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${baseUrl}/book-domestic-tour-packages`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/char-dham-yatra-package`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/kedarnath-yatra-package`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${baseUrl}/corporate-mice-travel`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/solo-women-travel-packages`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
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

  const destinationPages: MetadataRoute.Sitemap = destinationSlugs.map((slug) => ({
    url: `${baseUrl}/destinations/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  const packagePages: MetadataRoute.Sitemap = packages.map((pkg) => ({
    url: `${baseUrl}/packages/${pkg.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.85,
  }));

  return [...staticPages, ...destinationPages, ...packagePages];
}
