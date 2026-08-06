import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Categories from "@/components/Categories";
import FeaturedDestinations from "@/components/FeaturedDestinations";
import WhyChooseUs from "@/components/WhyChooseUs";
import Testimonials from "@/components/Testimonials";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.onlyroadtrip.com"),

  title: {
    default: "Only Road Trip | Premium Tours & Travel Company in India",
    template: "%s | Only Road Trip",
  },

  description:
    "Explore India with Only Road Trip. Premium pilgrimage tours, domestic holidays, luxury road trips, corporate travel, family vacations and customized travel packages across India.",

  keywords: [
    "Only Road Trip",
    "Swastik Tour And Travels",
    "India Tour Packages",
    "Pilgrimage Tours",
    "Kedarnath Package",
    "Char Dham Yatra",
    "Amarnath Yatra",
    "Vaishno Devi Tour",
    "Leh Ladakh Tour",
    "Kashmir Tour",
    "Manali Tour",
    "Goa Tour",
    "Kerala Tour",
    "Corporate Travel",
    "Luxury Road Trips",
    "Family Holidays",
    "Senior Citizen Tours",
  ],

  alternates: {
    canonical: "https://www.onlyroadtrip.com",
  },

  openGraph: {
    title: "Only Road Trip | Premium Tours & Travel Company in India",
    description:
      "Premium pilgrimage tours, luxury road trips, corporate travel and customized holiday packages across India.",
    url: "https://www.onlyroadtrip.com",
    siteName: "Only Road Trip",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Only Road Trip",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Only Road Trip",
    description:
      "Premium Tours & Customized Holidays Across India.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
  },
};
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",

  "@id": "https://www.onlyroadtrip.com/#organization",

  name: "Only Road Trip",

  legalName: "Swastik Tour And Travels Private Limited",

  alternateName: "Only Road Trip",

  url: "https://www.onlyroadtrip.com",

  logo: "https://www.onlyroadtrip.com/logo.png",

  image: "https://www.onlyroadtrip.com/og-image.jpg",

  description:
    "Premium pilgrimage tours, luxury road trips, domestic holidays and customized travel packages across India.",

  email: "info@onlyroadtrip.com",

  telephone: "+91-9211796168",

  foundingDate: "2025-05-20",

  address: {
    "@type": "PostalAddress",

    streetAddress: "F163, PH-1, Mew Palam Vihar",

    addressLocality: "Gurugram",

    addressRegion: "Haryana",

    postalCode: "122001",

    addressCountry: "IN",
  },

  areaServed: {
    "@type": "Country",
    name: "India",
  },

  contactPoint: {
    "@type": "ContactPoint",

    telephone: "+91-9211796168",

    email: "info@onlyroadtrip.com",

    contactType: "Customer Support",

    availableLanguage: ["English", "Hindi"],
  },

  sameAs: [
    "https://www.instagram.com/onlyroadtrip.official",
    "https://www.facebook.com/onlyroadtrip",
  ],
};
const localBusinessSchema = {
  "@context": "https://schema.org",

  "@type": "TravelAgency",

  "@id": "https://www.onlyroadtrip.com/#localbusiness",

  name: "Only Road Trip",

  image: "https://www.onlyroadtrip.com/og-image.jpg",

  url: "https://www.onlyroadtrip.com",

  telephone: "+91-9211796168",

  email: "info@onlyroadtrip.com",

  priceRange: "₹₹",

  address: {
    "@type": "PostalAddress",

    streetAddress: "F163, PH-1, Mew Palam Vihar",

    addressLocality: "Gurugram",

    addressRegion: "Haryana",

    postalCode: "122001",

    addressCountry: "IN",
  },

  geo: {
    "@type": "GeoCoordinates",

    latitude: 28.510493,

    longitude: 77.024296,
  },

  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",

      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],

      opens: "10:00",

      closes: "19:00",
    },
  ],

  areaServed: {
    "@type": "Country",

    name: "India",
  },

  sameAs: [
    "https://www.instagram.com/onlyroadtrip.official",
    "https://www.facebook.com/onlyroadtrip",
  ],
};
const faqSchema = {
  "@context": "https://schema.org",

  "@type": "FAQPage",

  mainEntity: [
    {
      "@type": "Question",

      name: "What destinations does Only Road Trip offer?",

      acceptedAnswer: {
        "@type": "Answer",

        text:
          "Only Road Trip offers pilgrimage tours, family holidays, luxury road trips, corporate travel, Leh Ladakh, Kashmir, Goa, Kerala, Rajasthan, Kedarnath, Char Dham, Vaishno Devi, Amarnath and many more destinations across India.",
      },
    },

    {
      "@type": "Question",

      name: "Does Only Road Trip provide customized tour packages?",

      acceptedAnswer: {
        "@type": "Answer",

        text:
          "Yes. We create fully customized travel packages according to your budget, destination, duration and travel preferences.",
      },
    },

    {
      "@type": "Question",

      name: "Do you provide corporate travel services?",

      acceptedAnswer: {
        "@type": "Answer",

        text:
          "Yes. We provide complete corporate travel solutions including hotel bookings, transport, meetings, conferences and business travel management.",
      },
    },

    {
      "@type": "Question",

      name: "Are your tours suitable for senior citizens?",

      acceptedAnswer: {
        "@type": "Answer",

        text:
          "Yes. We organize senior citizen friendly tours with comfortable transportation, medical assistance support and carefully planned itineraries.",
      },
    },

    {
      "@type": "Question",

      name: "How can I contact Only Road Trip?",

      acceptedAnswer: {
        "@type": "Answer",

        text:
          "You can contact us by phone at +91-9211796168 or email us at info@onlyroadtrip.com.",
      },
    },
  ],
};
const websiteSchema = {
  "@context": "https://schema.org",

  "@type": "WebSite",

  "@id": "https://www.onlyroadtrip.com/#website",

  url: "https://www.onlyroadtrip.com",

  name: "Only Road Trip",

  alternateName: "Swastik Tour And Travels Private Limited",

  description:
    "Premium India Tour Packages, Pilgrimage Tours, Luxury Road Trips, Corporate Travel and Customized Holidays across India.",

  inLanguage: "en-IN",

  publisher: {
    "@id": "https://www.onlyroadtrip.com/#organization",
  },

  potentialAction: {
    "@type": "SearchAction",

    target: {
      "@type": "EntryPoint",

      urlTemplate:
        "https://www.onlyroadtrip.com/search?q={search_term_string}",
    },

    "query-input": "required name=search_term_string",
  },
};
export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />

      <Hero />

      <Stats />

      <Categories />
            <FeaturedDestinations />

      <WhyChooseUs />

      <Testimonials />
    </>
  );
}