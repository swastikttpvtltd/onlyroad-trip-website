import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import GroupToursSlider from "@/components/GroupToursSlider";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import ThemePackageSliders from "@/components/ThemePackageSliders";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import type { Metadata } from "next";
import { packages } from "@/data/packages";
import { packageCardSummary } from "@/lib/packageCardSummary";

const baseUrl = "https://www.onlyroadtrip.com";
const socialImage = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { absolute: "India Tours & Door-to-Door Travel | Only Road Trip" },
  description: "Explore India tour packages, pilgrimage journeys and holidays. Ask Only Road Trip about personalised door-to-door travel planning across India.",
  keywords: ["Only Road Trip", "door-to-door travel planning India", "India holidays with home pickup planning", "customised India tour itineraries", "India pilgrimage travel coordination", "India family and group tour packages"],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "India Tours & Door-to-Door Travel | Only Road Trip",
    description: "All India tour packages, customized holidays, pilgrimage journeys, road trips and corporate travel from Only Road Trip.",
    url: baseUrl, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: socialImage, alt: "Only Road Trip India Tour Packages" }],
  },
  twitter: { card: "summary_large_image", title: "Only Road Trip | India Tour Packages", description: "Premium tours, pilgrimage journeys, road trips and customized holidays across India.", images: [socialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
};

const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }] };

export default function Home() {
  const cards = packages.map(packageCardSummary);
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Hero /><Categories /><GroupToursSlider packages={cards} /><ThemePackageSliders packages={cards} /><FeaturedDestinations packages={cards} /><WhyChooseUs /><Testimonials /><Stats /></>;
}
