import type { Metadata } from "next";
import SeoLandingPage, { buildSeoMetadata } from "@/components/SeoLandingPage";

const config = {
  slug: "kashi-yatra",
  title: "Kashi Yatra Packages",
  eyebrow: "Kashi Yatra Packages",
  intro: "Plan a spiritual Kashi Yatra to Varanasi with customized itineraries, comfortable stays, transport coordination and sightseeing around your travel dates.",
  focus: "package" as const,
  highlights: ["Varanasi and Kashi Vishwanath", "Flexible itinerary", "Family and group options"],
  keywords: ["Kashi Yatra package", "Kashi Yatra packages", "Varanasi Kashi Yatra", "Kashi Vishwanath Yatra", "Kashi tour package"]
};

export const metadata: Metadata = buildSeoMetadata(config);

export default function KashiYatraPage() {
  return <SeoLandingPage config={config} />;
}
