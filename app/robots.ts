import type { MetadataRoute } from "next";

const baseUrl = "https://www.onlyroadtrip.com";

const crawlerRules = [
  {
    userAgent: "*",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  {
    userAgent: "Bingbot",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  {
    userAgent: "GPTBot",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  {
    userAgent: "ChatGPT-User",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  {
    userAgent: "Google-Extended",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  {
    userAgent: "ClaudeBot",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
  {
    userAgent: "PerplexityBot",
    allow: "/",
    disallow: ["/api/", "/admin/"],
  },
] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: crawlerRules,
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}

// Keep the current production branch deployment in sync with the latest fixed package-page source.
