import AboutHero from "@/components/about/AboutHero";
import AboutCompany from "@/components/about/AboutCompany";
import { serializeJsonLd, siteUrl } from "@/lib/siteSeo";
import { travellerTermsUrl } from "@/lib/travellerTermsSeo";

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@type": "AboutPage", "@id": `${siteUrl}/about#webpage`, url: `${siteUrl}/about`, name: "About Only Road Trip", inLanguage: "en-IN", mainEntity: { "@id": `${siteUrl}/#organization` }, publisher: { "@id": `${siteUrl}/#organization` }, isPartOf: { "@id": `${siteUrl}/#website` }, relatedLink: travellerTermsUrl, mentions: { "@id": `${travellerTermsUrl}#webpage` } }) }} />
      <AboutHero />
      <AboutCompany />
    </>
  );
}
