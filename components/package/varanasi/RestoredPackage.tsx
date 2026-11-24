import Image from "next/image";
import type { packages } from "@/data/packages";
import snapshot from "@/data/varanasiRestoredPresentation.json";
import BookingSummaryCard from "@/components/package/BookingSummaryCard";
import VaranasiLayout from "./VaranasiLayout";
import { serializeJsonLd } from "@/lib/siteSeo";

export default function RestoredPackage({ pkg: original, schemas }: { pkg: (typeof packages)[number]; schemas: unknown[] }) {
  const pkg = { ...original, inclusions: snapshot.inclusions, exclusions: snapshot.exclusions };
  const faq = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: snapshot.faqs.filter((_, i) => ![0,1,3].includes(i)).map(item => ({ "@type": "Question", name: item.question, acceptedAnswer: { "@type": "Answer", text: item.answer } })) };
  return <main className="bg-slate-50 text-slate-900">
    {schemas.map((schema,i)=><script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />)}
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(faq) }} />
    <section className="relative h-[430px] overflow-hidden">
      <Image src={pkg.image} alt={pkg.title} fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="absolute inset-0 mx-auto flex max-w-7xl items-end px-5 pb-10 md:px-8 sm:pb-12"><div className="max-w-4xl text-white">
        <div className="mb-3 flex flex-wrap gap-2 text-xs font-bold uppercase tracking-wide"><span className="rounded bg-orange-500 px-3 py-1.5">{pkg.category}</span><span className="rounded bg-white/20 px-3 py-1.5">{pkg.state}</span><span className="rounded bg-white/20 px-3 py-1.5">Package ID: {pkg.packageId}</span></div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">{pkg.state}</p><h1 className="text-4xl font-extrabold leading-tight md:text-5xl">{pkg.title}</h1>
        <p className="mt-4 text-base leading-7 text-white/90 md:text-lg">{pkg.vibeHook ?? "Uttar Pradesh is famous for the Taj Mahal, Ayodhya, Varanasi, Mathura-Vrindavan, historic cities, spiritual traditions and the Ganga."}</p><p className="mt-3 text-sm font-semibold text-white/75">{pkg.destination}</p>
      </div></div>
    </section>
    <div className="sticky top-0 z-30 border-b bg-white shadow-sm"><nav className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-bold md:px-8">{[['overview','Overview'],['highlights','Highlights'],['gallery','Gallery'],['hotels','Hotels & Stays'],['itinerary','Itinerary'],['inclusions','Inclusions'],['booking','Pricing'],['faqs','FAQ']].map(([id,label])=><a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-orange-600">{label}</a>)}</nav></div>
    <VaranasiLayout pkg={pkg}><aside id="booking" className="scroll-mt-20 lg:sticky lg:top-24 lg:h-fit"><BookingSummaryCard pkg={pkg} price={pkg.price} /></aside></VaranasiLayout>
  </main>;
}
