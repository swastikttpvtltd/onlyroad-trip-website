import type { Metadata } from "next";

export const siteUrl = "https://www.onlyroadtrip.com";

export function cleanSeoText(value: unknown): string {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

export function absoluteImageUrl(image: string): string {
  return new URL(image, `${siteUrl}/`).href;
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const name = cleanSeoText(title).replace(/\s*\|\s*Only Road Trip\s*$/i, "");
  const url = new URL(path, `${siteUrl}/`).href;
  const socialTitle = `${name} | Only Road Trip`;
  return {
    title: name,
    description,
    alternates: { canonical: url },
    openGraph: { type: "website", locale: "en_IN", siteName: "Only Road Trip", title: socialTitle, description, url },
    twitter: { card: "summary_large_image", title: socialTitle, description },
  };
}

export type PackageSeoInput = {
  title: string;
  destination: string;
  duration: string;
  state?: string;
  category?: string;
  seoKeywords?: string[];
};

// Search intent phrases are derived from the real route, duration and service.
// They are not search-volume estimates or guarantees of pickup inclusion.
export function packageSearchIntents(pkg: PackageSeoInput): string[] {
  const title = cleanSeoText(pkg.title);
  const destination = cleanSeoText(pkg.destination);
  return [...new Set([
    title,
    `${title} itinerary`,
    `${title} inclusions and exclusions`,
    `${title} group prices`,
    `${title} ${cleanSeoText(pkg.duration)}`,
    `${destination} tour with door-to-door travel planning`,
    ...(pkg.seoKeywords ?? []).map(cleanSeoText),
  ].filter(Boolean))];
}

export function packageDescription(pkg: PackageSeoInput): string {
  return `${cleanSeoText(pkg.title)}: ${cleanSeoText(pkg.duration)}. View itinerary, inclusions and group prices. Ask about door-to-door travel planning across India.`;
}
