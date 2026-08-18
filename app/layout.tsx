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
  description: "Explore India with Only Road Trip. Premium pilgrimage tours, domestic holidays, luxury road trips, corporate travel, family vacations and customized travel packages across India.",
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Only Road Trip (Swastik Tour and Travels Private Limited)",
  "url": "https://www.onlyroadtrip.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "F163, PH-1, New Palam Vihar",
    "addressLocality": "Gurugram",
    "addressRegion": "Haryana",
    "postalCode": "122001",
    "addressCountry": "IN"
  },
  "telephone": "+91-9211796168",
  "email": "info@onlyroadtrip.com",
  "priceRange": "$$"
};

const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", "@id": `${baseUrl}/#website`, url: `${baseUrl}/`, name: "Only Road Trip", publisher: { "@type": "Organization", name: "Only Road Trip (Swastik Tour and Travels Private Limited)" }, inLanguage: "en-IN" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
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
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
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
