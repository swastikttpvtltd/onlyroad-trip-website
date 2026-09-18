import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import GroupToursSlider from "@/components/GroupToursSlider";
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

const localBusinessSchema = { "@context": "https://schema.org", "@type": "TravelAgency", "@id": `${baseUrl}/#localbusiness`, name: "Only Road Trip", url: baseUrl, image: `${baseUrl}${socialImage}`, telephone: "+91-9211796168", email: "info@onlyroadtrip.com", priceRange: "₹₹", address: { "@type": "PostalAddress", streetAddress: "F163, PH-1, New Palam Vihar", addressLocality: "Gurugram", addressRegion: "Haryana", postalCode: "122001", addressCountry: "IN" }, geo: { "@type": "GeoCoordinates", latitude: 28.510493, longitude: 77.024296 }, areaServed: { "@type": "Country", name: "India" }, openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:00" }] };
const faqSchema = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [
  { "@type": "Question", name: "What destinations does Only Road Trip offer?", acceptedAnswer: { "@type": "Answer", text: "Only Road Trip offers pilgrimage tours, family holidays, luxury road trips, corporate travel, Leh Ladakh, Kashmir, Goa, Kerala, Rajasthan, Kedarnath, Char Dham, Vaishno Devi, Amarnath and other destinations across India." } },
  { "@type": "Question", name: "Does Only Road Trip provide customized tour packages?", acceptedAnswer: { "@type": "Answer", text: "Yes. We create customized travel packages according to your budget, destination, duration and travel preferences." } },
  { "@type": "Question", name: "Do you provide corporate travel services?", acceptedAnswer: { "@type": "Answer", text: "Yes. We provide corporate travel solutions including business travel, accommodation, transport, meetings, conferences and corporate offsites." } },
  { "@type": "Question", name: "How can I contact Only Road Trip?", acceptedAnswer: { "@type": "Answer", text: "You can contact Only Road Trip at +91-9211796168 or info@onlyroadtrip.com." } },
  { "@type": "Question", name: "What does Only Road Trip offer?", acceptedAnswer: { "@type": "Answer", text: "Only Road Trip offers pilgrimage tours, domestic holidays, road trips, family vacations, customized travel, wildlife and adventure experiences, and corporate travel and MICE services across India." } },
  { "@type": "Question", name: "Where does Only Road Trip operate?", acceptedAnswer: { "@type": "Answer", text: "Only Road Trip provides thoughtfully curated travel experiences and customized tour packages across India." } },
  { "@type": "Question", name: "Who can travel with Only Road Trip?", acceptedAnswer: { "@type": "Answer", text: "Only Road Trip creates travel solutions for families, solo travellers, women travellers, senior citizens, differently-abled travellers, groups and corporate organizations." } },
  { "@type": "Question", name: "Can Only Road Trip create a customized India tour?", acceptedAnswer: { "@type": "Answer", text: "Yes. Only Road Trip can create customized India travel plans based on destination, travel dates, duration, group size, accommodation preferences and other travel requirements." } },
  { "@type": "Question", name: "Does Only Road Trip arrange pilgrimage and spiritual journeys?", acceptedAnswer: { "@type": "Answer", text: "Yes. Only Road Trip offers thoughtfully planned pilgrimage and spiritual journeys across India, including destinations such as Ayodhya, Varanasi, Kedarnath, Char Dham and Vaishno Devi." } },
  { "@type": "Question", name: "Does Only Road Trip provide corporate and MICE travel?", acceptedAnswer: { "@type": "Answer", text: "Yes. Only Road Trip provides corporate travel management and MICE solutions for businesses and organizations, including coordinated travel and corporate movement requirements." } },
  { "@type": "Question", name: "Does Only Road Trip support senior and accessible travel?", acceptedAnswer: { "@type": "Answer", text: "Only Road Trip creates travel solutions with special consideration for senior citizens and differently-abled travellers, including accessibility and personalized assistance requirements where available." } }
] };
const breadcrumbSchema = { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }] };

export default function Home() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} /><Hero /><Categories /><GroupToursSlider /><FeaturedDestinations /><WhyChooseUs /><Testimonials /><Stats /></>;
}
