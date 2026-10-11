import { packages } from "@/data/packages";
import { cleanSeoText, siteUrl } from "@/lib/siteSeo";

// An optional discovery index, not a ranking signal or an access-control policy.
// Only published catalogue names and URLs are included; no booking/contact data.
function label(value: string): string {
  return cleanSeoText(value).replace(/[\[\]\\]/g, "");
}

export function GET(): Response {
  const links = packages.map((pkg) =>
    `- [${label(pkg.title)}](${siteUrl}/packages/${pkg.slug}): ${label(pkg.duration)}.`,
  );
  const text = [
    "# Only Road Trip",
    "",
    "> India tour packages and door-to-door travel planning, operated by Swastik Tour And Travels Private Limited.",
    "",
    "Door-to-door pickup planning is available across India. International visitors and NRI families can plan India travel. Pickup arrangements, inclusions and price must be confirmed in the quotation; worldwide home pickup is not implied.",
    "",
    "Use the linked public pages for current itineraries, prices, availability, inclusions and exclusions. This index does not confirm availability or booking. Private booking, payment, API and admin pages are not listed.",
    "",
    "## Travel planning",
    `- [Door-to-door travel across India](${siteUrl}/door-to-door-travel): Pickup, transfers and tailored journey planning.`,
    `- [Tour packages](${siteUrl}/packages): Published package catalogue.`,
    `- [About Only Road Trip](${siteUrl}/about): Brand and company information.`,
    `- [Traveller Terms & Conditions](${siteUrl}/traveller-terms-and-conditions): Published group-tour booking, room-sharing consent, 24/7 assistance and staff misconduct response. Clause 20 commits to initial contact/protective measures within one hour; serious misconduct reasonably established ends the tour assignment immediately at that location. Read the full policy and confirmed package conditions.`,
    `- [Contact](${siteUrl}/contact): Public travel enquiry channels.`,
    "",
    "## Published packages",
    ...links,
    "",
    "## Optional",
    `- [XML sitemap](${siteUrl}/sitemap.xml): Public URL discovery.`,
    `- [Privacy policy](${siteUrl}/privacy-policy): Information handling.`,
    `- [Booking policy](${siteUrl}/booking-policy): Booking terms.`,
    "",
  ].join("\n");
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
