import Link from "next/link";
import PackageCard from "@/components/PackageCard";
import { packages } from "@/data/packages";
import { destinationGuides } from "@/data/destinationGuides";
import { getDestinationPackages } from "@/lib/destinationPackages";
import { serializeJsonLd, siteUrl } from "@/lib/siteSeo";

type Props = {
  title: string;
  eyebrow: string;
  description: string;
  state?: string;
  matches?: string[];
};

export default function DestinationLandingPage({ title, eyebrow, description, state, matches = [] }: Props) {
  const guide = destinationGuides.find(guide => guide.title === title);
  const filtered = getDestinationPackages(packages, guide ?? { title, state, matches });
  const pageUrl = guide ? siteUrl + guide.path : undefined;

  return (
    <main className="min-h-screen bg-slate-50">
      {pageUrl && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ "@context": "https://schema.org", "@graph": [
        { "@type": "CollectionPage", "@id": pageUrl + "#webpage", url: pageUrl, name: `${title} Tour Packages`, description, inLanguage: "en-IN", mainEntity: { "@id": pageUrl + "#routes" } },
        { "@type": "ItemList", "@id": pageUrl + "#routes", numberOfItems: filtered.length, itemListElement: filtered.map((pkg, index) => ({ "@type": "ListItem", position: index + 1, name: pkg.title, url: `${siteUrl}/packages/${pkg.slug}` })) },
        { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Destinations", item: siteUrl + "/destinations" }, { "@type": "ListItem", position: 2, name: title, item: pageUrl }] },
      ] }) }} />}
      <section className="bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 pb-16 pt-32 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-300">{eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight md:text-6xl">{title} Tour Packages</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200">{description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/packages" className="rounded-full bg-white px-6 py-3 text-sm font-bold text-blue-900 transition hover:bg-slate-100">Explore All Packages</Link>
            <Link href="/plan-your-trip" className="rounded-full border border-white/30 px-6 py-3 text-sm font-bold text-white transition hover:bg-white/10">Plan Your Trip</Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-700">Only Road Trip</p>
            <h2 className="mt-2 text-3xl font-extrabold text-slate-900">{filtered.length ? `${filtered.length} ${title} routes` : `${title} custom itinerary enquiries`}</h2>
          </div>
          <Link href="/contact" className="text-sm font-bold text-blue-700 hover:text-blue-900">Talk to our travel team →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map(pkg => <PackageCard key={pkg.slug} pkg={pkg} />)}
        </div>
        {!filtered.length && <div className="rounded-2xl border border-slate-200 bg-white p-6"><p className="leading-7 text-slate-600">A fixed {title} package is not currently published in our catalogue. Contact our team to discuss dates, route requirements and a confirmed quotation.</p><Link href="/plan-your-trip" className="mt-4 inline-flex font-bold text-blue-800">Request a {title} itinerary →</Link></div>}
        {filtered.length > 0 && <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6"><h3 className="font-bold text-slate-950">Places covered by these {title} itineraries</h3><div className="mt-4 flex flex-wrap gap-2">{[...new Set(filtered.flatMap(pkg => pkg.destination.split("•").map(place => place.trim()).filter(Boolean)))].map(place => <span key={place} className="rounded-full bg-blue-50 px-3 py-1.5 text-sm text-blue-900">{place}</span>)}</div><p className="mt-4 text-sm leading-6 text-slate-600">Compare the actual route, travel duration, room sharing and inclusions on each package page. <Link href="/pricing-and-currencies" className="font-semibold text-blue-800 underline">Prices can be displayed in seven currencies; checkout is in INR.</Link></p></div>}
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:p-10">
          <h2 className="text-2xl font-extrabold text-slate-900">Plan a customised {title} journey</h2>
          <p className="mt-3 max-w-3xl leading-7 text-slate-600">Tell us your travel dates, number of travellers, preferred hotel category and budget. Our team can customise the itinerary, transport and stay around your requirements.</p>
          <Link href="/plan-your-trip" className="mt-6 inline-flex rounded-full bg-blue-800 px-6 py-3 text-sm font-bold text-white hover:bg-blue-900">Start Planning</Link>
        </div>
      </section>
    </main>
  );
}
