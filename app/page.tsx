import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import type { Metadata } from "next";

const baseUrl = "https://www.onlyroadtrip.com";
const socialImage = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "Only Road Trip | Best Travel Agency in India | Tour Packages",
  description: "Only Road Trip offers all India tour packages, customized tour packages in India, domestic holidays, pilgrimage tours, road trips, family vacations and corporate travel solutions.",
  keywords: [
    "Only Road Trip", "Best travel agency in India", "Top tour operators in India", "Best domestic travel agency in India", "All India tour packages", "Customized tour packages in India", "Best travel agent for domestic tours",
    "Book domestic tour packages online", "Cheapest family tour packages in India", "Luxury travel agency in India", "Corporate group tour operators in India", "Travel packages with flight and hotel India",
    "India honeymoon packages", "Best pilgrimage tour packages in India", "Adventure travel agency India", "Heritage and cultural tours India",
    "Travel Agency in Gurugram", "Travel Agency in Gurgaon", "Tour Operator in Delhi NCR", "India Tour Packages", "Road Trip Packages India", "Senior Citizen Tours India", "Corporate Travel Management India", "MICE Travel India",
  ],
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "Only Road Trip | Best Travel Agency in India | Tour Packages",
    description: "All India tour packages, customized holidays, pilgrimage journeys, road trips and corporate travel from Only Road Trip.",
    url: baseUrl, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: socialImage, alt: "Only Road Trip India Tour Packages" }],
  },
  twitter: { card: "summary_large_image", title: "Only Road Trip | India Tour Packages", description: "Premium tours, pilgrimage journeys, road trips and customized holidays across India.", images: [socialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
};

const organizationSchema = { "@context": "https://schema.org", "@type": "TravelAgency", "@id": `${baseUrl}/#travel-agency`, name: "Only Road Trip", legalName: "Swastik Tour And Travels Private Limited", alternateName: "Only Road Trip", url: baseUrl, logo: `${baseUrl}${socialImage}`, image: `${baseUrl}${socialImage}`, description: "Travel agency offering pilgrimage tours, domestic holidays, luxury road trips, family vacations, heritage tours, adventure journeys and corporate travel across India.", email: "info@onlyroadtrip.com", telephone: "+91-9211796168", foundingDate: "2025-05-20", address: { "@type": "PostalAddress", streetAddress: "F163, PH-1, New Palam Vihar", addressLocality: "Gurugram", addressRegion: "Haryana", postalCode: "122001", addressCountry: "IN" }, areaServed: { "@type": "Country", name: "India" }, contactPoint: { "@type": "ContactPoint", telephone: "+91-9211796168", email: "info@onlyroadtrip.com", contactType: "Customer Support", availableLanguage: ["English", "Hindi"] } };
const localBusinessSchema = { "@context": "https://schema.org", "@type": "TravelAgency", "@id": `${baseUrl}/#localbusiness`, name: "Only Road Trip", url: baseUrl, image: `${baseUrl}${socialImage}`, telephone: "+91-9211796168", email: "info@onlyroadtrip.com", priceRange: "₹₹", address: { "@type": "PostalAddress", streetAddress: "F163, PH-1, New Palam Vihar", addressLocality: "Gurugram", addressRegion: "Haryana", postalCode: "122001", addressCountry: "IN" }, geo: { "@type": "GeoCoordinates", latitude: 28.510493, longitude: 77.024296 }, areaServed: { "@type": "Country", name: "India" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" }] };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "What destinations does Only Road Trip offer?", acceptedAnswer: { "@type": "Answer", text: "Only Road Trip offers pilgrimage tours, family holidays, luxury road trips, corporate travel, Leh Ladakh, Kashmir, Goa, Kerala, Rajasthan, Kedarnath, Char Dham, Vaishno Devi, Amarnath and other destinations across India." } }, { "@type": "Question", name: "Does Only Road Trip provide customized tour packages?", acceptedAnswer: { "@type": "Answer", text: "Yes. We create customized travel packages according to your budget, destination, duration and travel preferences." } }, { "@type": "Question", name: "Do you provide corporate travel services?", acceptedAnswer: { "@type": "Answer", text: "Yes. We provide corporate travel solutions including business travel, accommodation, transport, meetings, conferences and corporate offsites." } }, { "@type": "Question", name: "How can I contact Only Road Trip?", acceptedAnswer: { "@type": "Answer", text: "You can contact Only Road Trip at +91-9211796168 or info@onlyroadtrip.com." } }] };
const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${baseUrl}/#website`, url: baseUrl, name: "Only Road Trip", description: "Premium India tour packages, pilgrimage tours, luxury road trips, corporate travel and customized holidays across India.", inLanguage: "en-IN", publisher: { "@id": `${baseUrl}/#travel-agency` } };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }] };

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Hero /><Categories /><FeaturedDestinations /><WhyChooseUs /><Testimonials /><Stats /></>;
}
