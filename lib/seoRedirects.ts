// Consolidate public page URLs onto the same host used by the sitemap and
// canonical tags. Preserve payment callbacks, lead APIs and checkout origins.
export const canonicalHostRedirect = {
  source: "/:path((?!api(?:/|$)|_next(?:/|$)|book(?:/|$)|payment(?:/|$)|payment-cancelled(?:/|$)|admin(?:/|$)).*)",
  has: [{ type: "host" as const, value: "onlyroadtrip.com" }],
  destination: "https://www.onlyroadtrip.com/:path",
  permanent: true,
};
