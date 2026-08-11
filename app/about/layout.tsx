import type { Metadata } from "next";

const baseUrl = "https://www.onlyroadtrip.com";
const socialImage = "/images/logo/only-road-trip-logo.jpeg";

export const metadata: Metadata = {
  title: "About Only Road Trip | Travel Company in Gurugram",
  description:
    "Learn about Only Road Trip, the travel brand of Swastik Tour And Travels Private Limited, offering pilgrimage tours, domestic holidays, road trips and corporate travel across India.",
  keywords: ["About Only Road Trip", "Only Road Trip Gurugram", "Swastik Tour And Travels Private Limited", "travel company in Gurugram", "travel agency in Gurgaon", "India tour operator"],
  alternates: { canonical: `${baseUrl}/about` },
  openGraph: {
    title: "About Only Road Trip | Travel Company in Gurugram",
    description: "Discover Only Road Trip and our approach to pilgrimage tours, domestic holidays, road trips and corporate travel across India.",
    url: `${baseUrl}/about`,
    siteName: "Only Road Trip",
    locale: "en_IN",
    type: "website",
    images: [{ url: socialImage, alt: "About Only Road Trip" }],
  },
  twitter: { card: "summary_large_image", title: "About Only Road Trip", description: "Travel experiences and customized journeys across India.", images: [socialImage] },
  robots: { index: true, follow: true },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
    { "@type": "ListItem", position: 2, name: "About", item: `${baseUrl}/about` },
  ],
};

export default function AboutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      {children}
    </>
  );
}
