type Props = { title: string; path: string };

export default function LegalSchema({ title, path }: Props) {
  const url = `https://www.onlyroadtrip.com/${path}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "url": url,
    "isPartOf": { "@id": "https://www.onlyroadtrip.com/#website" },
    "about": { "@id": "https://www.onlyroadtrip.com/#organization" },
    "inLanguage": "en-IN",
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
