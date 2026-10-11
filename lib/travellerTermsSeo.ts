import { groupTourTerms } from "@/components/package/GroupTourTerms";
import { siteUrl } from "./siteSeo";

export const travellerTermsUrl = `${siteUrl}/traveller-terms-and-conditions`;
export const travellerSafetyFaqs = [
  { question: "How can I report a safety concern during this group tour?", answer: "Contact Only Road Trip's 24/7 support team on +91 92117 96168. The published Traveller Terms commit to contacting the complainant and initiating appropriate protective measures within one hour of receiving a safety or harassment complaint, with earlier intervention wherever possible. This is not a promise of final resolution within one hour. You may contact emergency authorities directly without company approval." },
  { question: "What consent and safety rules apply to room sharing?", answer: "Individual travellers must expressly agree to the confirmed sharing arrangement. Unrelated male and female travellers will not be allocated a shared room without express consent. Harassment, unwanted contact, privacy violations and retaliation are prohibited. See the Traveller Terms & Conditions linked in the group-tour terms section for the complete conditions." },
] as const;

export function travellerTermsSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", "@id": `${travellerTermsUrl}#webpage`, url: travellerTermsUrl, name: "Traveller Terms & Conditions", description: "Published group-tour booking, room-sharing consent, safety assistance and complaint-response conditions.", inLanguage: "en-IN", datePublished: "2026-07-20", dateModified: "2026-10-01", publisher: { "@id": `${siteUrl}/#organization` }, isPartOf: { "@id": `${siteUrl}/#website` }, hasPart: groupTourTerms.map(([name], index) => ({ "@type": "WebPageElement", "@id": `${travellerTermsUrl}#clause-${index + 1}`, name })) },
      { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: siteUrl }, { "@type": "ListItem", position: 2, name: "Traveller Terms & Conditions", item: travellerTermsUrl }] },
    ],
  };
}
