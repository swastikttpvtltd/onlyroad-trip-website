import type { Metadata } from "next";
import SeoLandingPage, { buildSeoMetadata } from "@/components/SeoLandingPage";

const config = {
  slug: "ayodhya-yatra",
  title: "Ayodhya Yatra Packages",
  eyebrow: "Ayodhya Yatra Packages",
  intro: "Plan a spiritual Ayodhya Yatra with visits to Ram Mandir and other important places, along with comfortable stays, transport and flexible sightseeing.",
  focus: "package" as const,
  highlights: ["Ram Mandir Darshan", "Flexible itinerary", "Family and group options"],
  keywords: ["Ayodhya Yatra package", "Ayodhya Yatra packages", "Ayodhya Ram Mandir tour", "Ayodhya tour package", "Ayodhya pilgrimage package"]
};

export const metadata: Metadata = buildSeoMetadata(config);

export default function AyodhyaYatraPage() {
  return <SeoLandingPage config={config} />;
}
