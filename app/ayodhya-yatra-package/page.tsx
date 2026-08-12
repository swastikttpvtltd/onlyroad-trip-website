import type { Metadata } from "next";
import PilgrimageLandingPage from "@/components/PilgrimageLandingPage";

const baseUrl = "https://www.onlyroadtrip.com";

export const metadata: Metadata = {
  title: "Ayodhya Yatra Package from Delhi | Ram Mandir Tour | Only Road Trip",
  description: "Book customized Ayodhya Yatra packages from Delhi with Ram Mandir, Ayodhya sightseeing, Saryu, comfortable transport and hotel coordination.",
  keywords: ["Ayodhya Yatra Package", "Ayodhya Yatra Package from Delhi", "Ayodhya Tour Package", "Ram Mandir Tour Package", "Ayodhya Yatra Booking", "Ayodhya Kashi Yatra Package"],
  alternates: { canonical: `${baseUrl}/ayodhya-yatra-package` },
  openGraph: { title: "Ayodhya Yatra Package from Delhi | Only Road Trip", description: "Customized Ayodhya pilgrimage packages with Ram Mandir, sightseeing, transport and stay coordination.", url: `${baseUrl}/ayodhya-yatra-package`, siteName: "Only Road Trip", locale: "en_IN", type: "website" },
  robots: { index: true, follow: true },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: baseUrl }, { "@type": "ListItem", position: 2, name: "Ayodhya Yatra Package", item: `${baseUrl}/ayodhya-yatra-package` }] },
    { "@type": "Service", "@id": `${baseUrl}/ayodhya-yatra-package#service`, name: "Ayodhya Yatra Packages", serviceType: "Ayodhya Yatra Package", provider: { "@id": `${baseUrl}/#travel-agency` }, areaServed: { "@type": "Country", name: "India" }, url: `${baseUrl}/ayodhya-yatra-package` },
  ],
};

export default function AyodhyaYatraPackagePage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /><PilgrimageLandingPage variant="ayodhya" /></>;
}
