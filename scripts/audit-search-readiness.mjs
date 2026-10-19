#!/usr/bin/env node
/**
 * Read-only SEO/AEO/GEO regression audit.
 * Run: node scripts/audit-search-readiness.mjs
 * Checks source contracts; rendered URLs and Cloudflare rules require separate live tests.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const read = (path) => readFileSync(join(root, path), "utf8");
const checks = [];
function check(name, pass, detail) {
  checks.push({ name, pass: Boolean(pass), detail });
}
const files = ["app/robots.ts", "app/sitemap.ts", "app/layout.tsx", "next.config.ts"];
for (const file of files) check(`Required file: ${file}`, existsSync(join(root, file)), file);
const [robots, sitemap, layout] = files.slice(0, 3).map(f => existsSync(join(root, f)) ? read(f) : "");
for (const agent of ["OAI-SearchBot", "GPTBot", "ChatGPT-User", "Google-Extended", "ClaudeBot", "PerplexityBot"]) {
  check(`Crawler policy: ${agent}`, robots.includes(agent), "Explicit rule present; Cloudflare behavior not verified");
}
check("Sitemap references public pages", sitemap.includes("publicSeoPaths"), "Public SEO paths");
check("Sitemap references packages", sitemap.includes("packages.map"), "Package discovery");
check("No synthetic sitemap freshness", !sitemap.includes("lastModified: new Date()"), "Avoid fabricated change dates");
check("Sitewide Organization/TravelAgency schema", layout.includes('"@type": "TravelAgency"'), "Structured data");
check("Sitewide WebSite schema", layout.includes('"@type": "WebSite"'), "Structured data");
check("Open Graph metadata", layout.includes("openGraph:"), "Social sharing");
check("Twitter card metadata", layout.includes("twitter:"), "Social sharing");
check("Site manifest declared", layout.includes("manifest:"), "PWA installability requires separate runtime audit");
check("Structured data safe serialization", layout.includes("serializeJsonLd"), "JSON-LD escaping");
check("AI info index", existsSync(join(root, "public/llms.txt")), "Optional convention; no guaranteed ranking benefit");
const failed = checks.filter(c => !c.pass);
for (const c of checks) console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.name} — ${c.detail}`);
console.log(`\n${checks.length - failed.length}/${checks.length} source checks passed. Not a search-ranking score.`);
process.exitCode = failed.length ? 1 : 0;
