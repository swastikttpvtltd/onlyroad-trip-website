import type { MetadataRoute } from "next";

const baseUrl = "https://www.onlyroadtrip.com";

const crawlerRules: MetadataRoute.Robots["rules"] = [
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
    // Search discovery is independent of GPTBot's existing training policy.
    userAgent: ["OAI-SearchBot", "Claude-SearchBot", "Claude-User", "Perplexity-User"],
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
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: crawlerRules,
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
