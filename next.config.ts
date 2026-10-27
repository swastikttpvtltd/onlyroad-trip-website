import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import { PHASE_DEVELOPMENT_SERVER } from "next/constants";

// Required so `next dev` initializes the OpenNext Cloudflare dev runtime.
// This prevents getCloudflareContext() errors during local development.

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(self)",
  },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
];

const nextConfig: NextConfig = {
  output: "standalone",
  poweredByHeader: false,
  async redirects() {
    return [
      // Consolidate public pages on the canonical www host. Keep API callbacks,
      // Next assets and Cloudflare endpoints on their existing host.
      {
        source: "/:path((?!api(?:/|$)|_next(?:/|$)|cdn-cgi(?:/|$)).*)",
        has: [{ type: "host", value: "onlyroadtrip\\.com" }],
        destination: "https://www.onlyroadtrip.com/:path*",
        permanent: true,
      },
      { source: "/door-to-door-travelPosted", destination: "/door-to-door-travel", permanent: true },
      { source: "/char-dham-yatra-package", destination: "/packages/char-dham-yatra", permanent: true },
      { source: "/kashi-yatra-package", destination: "/packages/varanasi-kashi", permanent: true },
      { source: "/kedarnath-yatra-package", destination: "/packages/kedarnath-yatra", permanent: true },
      { source: "/kashi-ayodhya-prayagraj-yatra-package", destination: "/packages/varanasi-prayagraj-ayodhya", permanent: true },
      { source: "/prayagraj-yatra-package", destination: "/packages?state=Uttar%20Pradesh&q=Prayagraj", permanent: true },
      { source: "/jyotirlinga-yatra", destination: "/packages?theme=spiritual&q=jyotirlinga", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
};

export default async function configuration(phase: string): Promise<NextConfig> {
  if (phase === PHASE_DEVELOPMENT_SERVER && process.env.ONLYROADTRIP_PREVIEW_NO_BINDINGS !== "1") {
    await initOpenNextCloudflareForDev();
  }
  return nextConfig;
}

