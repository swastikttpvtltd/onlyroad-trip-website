import Footer from "@/components/Footer";
import Header from "@/components/Header";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

  authors: [
    {
      name: "Swastik Tour And Travels Private Limited",
    },
  ],

  creator: "Swastik Tour And Travels Private Limited",

  publisher: "Swastik Tour And Travels Private Limited",

  alternates: {
    canonical: "/",
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

    googleBot: {
      index: true,

      follow: true,

      "max-image-preview": "large",

      "max-video-preview": -1,

      "max-snippet": -1,
    },
  },

  verification: {
    // Google Search Console verify karne ke baad uncomment karna
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  applicationName: "Only Road Trip",

  category: "Travel",

  referrer: "origin-when-cross-origin",
};

export const viewport: Viewport = {
  themeColor: "#0891b2",
  colorScheme: "light",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-gray-900">
        <Header />

        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}