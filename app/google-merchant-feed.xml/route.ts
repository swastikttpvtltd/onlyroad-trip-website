import { NextResponse } from "next/server";
import packages from "@/data/packages";

const SITE_URL = "https://www.onlyroadtrip.com";
const XML_NS = "http://base.google.com/ns/1.0";

function escapeXml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function absoluteUrl(value: unknown): string {
  const path = String(value ?? "").trim();
  if (!path) return "";
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}/${path.replace(/^\/+/, "")}`;
}

function formatPrice(value: unknown): string {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? `${amount.toFixed(2)} INR` : "";
}

export async function GET() {
  const items = packages
    .filter((pkg: any) => pkg?.slug && pkg?.title && formatPrice(pkg?.price))
    .map((pkg: any) => {
      const link = absoluteUrl(`packages/${pkg.slug}`);
      const image = absoluteUrl(pkg.image || pkg.hero?.image || "/images/package-placeholder.jpg");
      const description = String(pkg.overview || pkg.short || pkg.title).replace(/\s+/g, " ").trim();
      const gallery = Array.isArray(pkg.gallery)
        ? pkg.gallery
            .map((entry: any) => absoluteUrl(typeof entry === "string" ? entry : entry?.image))
            .filter((url: string) => url && url !== image)
            .slice(0, 10)
        : [];

      return `    <item>
      <g:id>${escapeXml(pkg.packageId || `ORT-${pkg.slug}`)}</g:id>
      <g:title>${escapeXml(pkg.title)}</g:title>
      <g:description>${escapeXml(description)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(image)}</g:image_link>
${gallery.map((url: string) => `      <g:additional_image_link>${escapeXml(url)}</g:additional_image_link>`).join("\n")}
      <g:availability>in_stock</g:availability>
      <g:condition>new</g:condition>
      <g:price>${formatPrice(pkg.price)}</g:price>
      <g:brand>Only Road Trip</g:brand>
      <g:identifier_exists>no</g:identifier_exists>
      <g:product_type>${escapeXml(`Travel > Holiday Packages > ${pkg.category || "Tours"}`)}</g:product_type>
      <g:custom_label_0>${escapeXml(pkg.state || "India")}</g:custom_label_0>
      <g:custom_label_1>${escapeXml(pkg.category || "Tour Package")}</g:custom_label_1>
      <g:custom_label_2>Per person</g:custom_label_2>
    </item>`;
    });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="${XML_NS}">
  <channel>
    <title>Only Road Trip - Holiday Packages</title>
    <link>${SITE_URL}</link>
    <description>India holiday and pilgrimage packages by Only Road Trip.</description>
${items.join("\n")}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    status: 200,
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
