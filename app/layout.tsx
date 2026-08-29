import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const baseUrl = "https://www.onlyroadtrip.com";
const socialImage = "/images/logo/only-road-trip-logo.jpeg";
const googleTagManagerId = "GTM-MX42J8KW";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "Only Road Trip | Premium Tours & Travel Company in India", template: "%s | Only Road Trip" },
  description: "Explore India with Only Road Trip for premium pilgrimage tours, domestic holidays, road trips, family vacations and customized travel packages.",
  keywords: ["Only Road Trip", "Swastik Tour And Travels", "India Tour Packages", "Pilgrimage Tours", "Kedarnath Package", "Char Dham Yatra", "Amarnath Yatra", "Vaishno Devi Tour", "Leh Ladakh Tour", "Kashmir Tour", "Manali Tour", "Goa Tour", "Kerala Tour", "Corporate Travel", "Luxury Road Trips", "Family Holidays", "Senior Citizen Tours"],
  authors: [{ name: "Swastik Tour And Travels Private Limited" }],
  creator: "Swastik Tour And Travels Private Limited",
  publisher: "Swastik Tour And Travels Private Limited",
  alternates: { canonical: "/" },
  openGraph: { title: "Only Road Trip | Premium Tours & Travel Company in India", description: "Premium pilgrimage tours, luxury road trips, corporate travel and customized holiday packages across India.", url: baseUrl, siteName: "Only Road Trip", locale: "en_IN", type: "website", images: [{ url: socialImage, alt: "Only Road Trip" }] },
  twitter: { card: "summary_large_image", title: "Only Road Trip", description: "Premium Tours & Customized Holidays Across India.", images: [socialImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-video-preview": -1, "max-snippet": -1 } },
  icons: { icon: "/favicon.ico" },
  manifest: "/site.webmanifest",
  applicationName: "Only Road Trip",
  category: "Travel",
  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = { themeColor: "#0891b2", colorScheme: "light" };

const ultraPremiumSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "TravelAgency",
      "@id": "https://www.onlyroadtrip.com/#organization",
      "name": "Only Road Trip",
      "legalName": "Swastik Tour And Travels Private Limited",
      "url": "https://www.onlyroadtrip.com",
      "logo": {
        "@type": "ImageObject",
        "@id": "https://www.onlyroadtrip.com/#logo",
        "url": `${baseUrl}${socialImage}`,
        "caption": "Only Road Trip Logo"
      },
      "image": `${baseUrl}${socialImage}`,
      "telephone": "+91-9211796168",
      "email": "info@onlyroadtrip.com",
      "priceRange": "₹₹₹",
      "currenciesAccepted": "INR",
      "paymentAccepted": "UPI, Credit Card, Debit Card, Net Banking, Cash",
      "duns": "771608667",
      "taxID": "U52291HR2025PTC132225",
      "description": "Premium travel management platform specializing in handcrafted domestic journeys across India. Offering 24/7 support, verified accommodations, customized road trips, sacred pilgrimage tours, wildlife safaris, and specialized itineraries for women and corporate clients.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "F163, Phase-1 New Palam Vihar",
        "addressLocality": "Gurugram",
        "addressRegion": "Haryana",
        "postalCode": "122001",
        "addressCountry": "IN"
      },
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+91-9211796168",
          "contactType": "customer service",
          "email": "info@onlyroadtrip.com",
          "availableLanguage": ["English", "Hindi"],
          "areaServed": "IN"
        }
      ],
      "sameAs": [
        "https://www.facebook.com/profile.php?id=61587958079412",
        "https://www.instagram.com/onlyroadtrip.official"
      ],
      "knowsAbout": [
        "Sacred Pilgrimage Tours",
        "Himalayan Road Trips",
        "Char Dham Yatra",
        "Wildlife Safaris",
        "Corporate Travel Management",
        "Customized Tour Packages",
        "Women Special Travels"
      ],
      "areaServed": [
        { "@type": "AdministrativeArea", "name": "India" },
        { "@type": "AdministrativeArea", "name": "Uttarakhand" },
        { "@type": "AdministrativeArea", "name": "Kashmir" },
        { "@type": "AdministrativeArea", "name": "Ladakh" },
        { "@type": "AdministrativeArea", "name": "Kerala" },
        { "@type": "AdministrativeArea", "name": "Gujarat" },
        { "@type": "AdministrativeArea", "name": "Rajasthan" }
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Only Road Trip Premium Holiday Packages",
        "itemListElement": [
          {
            "@type": "OfferCatalog",
            "name": "Spiritual & Pilgrimage Yatras",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Char Dham Yatra" } },
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Do Dham Yatra" } },
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Kashi, Ayodhya & Varanasi Yatra" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Himalayan Road Trips & Escapes",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Kashmir Classic & Offbeat Tours" } },
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Leh Nubra Pangong Expedition" } },
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Spiti Valley Road Trip" } }
            ]
          },
          {
            "@type": "OfferCatalog",
            "name": "Corporate Offsites & Retreats",
            "itemListElement": [
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Rishikesh Team Offsite" } },
              { "@type": "Offer", "itemOffered": { "@type": "Trip", "name": "Goa Business Corporate Offsite" } }
            ]
          }
        ]
      }
    },
    {
      "@type": "WebSite",
      "@id": "https://www.onlyroadtrip.com/#website",
      "url": "https://www.onlyroadtrip.com/",
      "name": "Only Road Trip",
      "description": "Premium customized road trips, pilgrimage tours, and corporate offsites across India.",
      "publisher": {
        "@id": "https://www.onlyroadtrip.com/#organization"
      },
      "inLanguage": "en-IN"
    }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
      new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
      'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-MX42J8KW');
    `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ultraPremiumSchema)
          }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MX42J8KW"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
