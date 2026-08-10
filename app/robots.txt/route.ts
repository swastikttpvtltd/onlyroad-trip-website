import { NextResponse } from "next/server";

export function GET() {
  const body = `User-agent: *\nAllow: /\nDisallow: /book/\nDisallow: /api/\nDisallow: /admin/\n\nSitemap: https://www.onlyroadtrip.com/sitemap.xml\n`;

  return new NextResponse(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
