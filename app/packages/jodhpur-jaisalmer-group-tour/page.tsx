import type { Metadata } from "next";
import { jodhpurJaisalmerGroupTour as tour, jodhpurJaisalmerDays, jodhpurJaisalmerFaqs } from "@/data/jodhpurJaisalmerGroupTour";
import ItineraryAccordion from "@/features/jodhpurGroup/components/package/ItineraryAccordion";
import PackageFaqTabs from "@/features/jodhpurGroup/components/package/PackageFaqTabs";
import PackageGallerySlider from "@/features/jodhpurGroup/components/package/PackageGallerySlider";
import InclusionsExclusions from "@/features/jodhpurGroup/components/package/InclusionsExclusions";
import ScrollBackLink from "@/features/jodhpurGroup/components/package/ScrollBackLink";
import BookingSummary from "./BookingSummary";

export const metadata: Metadata = {
  title: "Jodhpur & Jaisalmer Group Tour from Delhi",
  description: "Jodhpur–Jaisalmer group tour from Delhi with 4 Rajasthan nights, Tanot Mata and Sam dunes. Triple ₹21,000; double ₹23,000 per person including GST.",
  alternates: { canonical: "https://www.onlyroadtrip.com/packages/jodhpur-jaisalmer-group-tour" },
  robots: { index: true, follow: true },
};

const sectionClass = "scroll-mt-40 rounded-2xl bg-white p-6 shadow-sm md:p-7";

export default function Page() {
  return <main className="bg-slate-50 text-slate-900">
    <style>{`@media (min-width:1024px){img.jodhpur-group-hero-photo{height:100%;width:100%;object-fit:cover;object-position:center 48%}.jodhpur-group-hero-copy{min-height:660px;padding-top:144px;padding-bottom:112px}}`}</style>
    <section className="relative isolate overflow-hidden bg-slate-950 text-white">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={tour.hero} alt="Camel ride across Sam sand dunes at sunset, Jaisalmer" width={2200} height={1650} className="jodhpur-group-hero-photo block h-auto w-full lg:absolute lg:inset-0"/>
      <div className="absolute inset-0 hidden bg-gradient-to-r from-slate-950/75 via-slate-950/35 to-transparent lg:block"/>
      <div className="jodhpur-group-hero-copy relative z-10 px-6 pb-10 pt-7 lg:mx-auto lg:min-h-[660px] lg:max-w-7xl lg:px-12 lg:pb-28 lg:pt-36"><div className="max-w-2xl lg:max-w-[60%]"><p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-cyan-200">Rajasthan · Group Tour</p><h1 className="text-4xl font-bold leading-tight md:text-6xl">Jodhpur &amp; Jaisalmer<br/>Group Tour</h1><p className="mt-5 text-xl">{tour.destination}</p><p className="mt-4 leading-7 text-slate-200">Blue City stories. Golden Fort lanes. A desert sunset worth travelling for.</p></div></div>
    </section>
    <nav aria-label="Package sections" className="sticky top-0 z-30 border-b bg-white px-5 py-4 shadow-sm"><div className="mx-auto flex max-w-6xl flex-wrap gap-x-6 gap-y-3 text-sm font-semibold">{["Overview", "Highlights", "Gallery", "Hotels", "Itinerary", "Inclusions", "Pricing", "FAQ"].map(label => <a key={label} href={`#${label === "FAQ" ? "faqs" : label.toLowerCase()}`} className="whitespace-nowrap hover:text-orange-600">{label === "Inclusions" ? "Included / Excluded" : label}</a>)}</div></nav>
    <div className="mx-auto grid max-w-6xl gap-8 px-5 py-8 md:px-8 lg:grid-cols-[minmax(0,1fr)_360px]">
      <div className="space-y-7">
        <ScrollBackLink href="/packages?theme=group-tour">Back to Group Tours</ScrollBackLink>
        <section id="overview" className={sectionClass}><h2 className="text-2xl font-extrabold tracking-tight">Tour Overview</h2><p className="mt-3 font-bold">{tour.duration}</p><p className="mt-2 text-sm text-slate-600">{tour.overallDuration}</p><p className="mt-4 rounded-xl bg-slate-50 p-4 font-bold">Starts &amp; ends in Delhi</p><p className="mt-3 text-sm leading-6 text-slate-600">Overnight travel by Volvo coach, bus or Tempo Traveller, allocated according to group size.</p><p className="mt-5 leading-8 text-slate-600">{tour.overview}</p></section>
        <section id="highlights" className={sectionClass}><h2 className="text-2xl font-extrabold tracking-tight">Tour Highlights</h2><ul className="mt-5 space-y-4">{tour.highlights.map(item => <li key={item.title} className="flex items-start gap-3 leading-7 text-slate-700"><span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-orange-500 text-xs text-orange-600">✓</span><span><strong className="text-slate-900">{item.title}</strong> — {item.detail}</span></li>)}</ul></section>
        <section id="gallery" className={sectionClass}><h2 className="mb-5 text-2xl font-extrabold tracking-tight">Tour Gallery</h2><PackageGallerySlider title={tour.title} gallery={tour.gallery}/></section>
        <section id="hotels" className={sectionClass}><h2 className="text-2xl font-extrabold tracking-tight">Hotels &amp; Stays</h2><div className="mt-5 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full text-left text-sm"><thead className="bg-slate-50"><tr><th className="p-3">City / area</th><th className="p-3">Proposed hotel / camp</th><th className="p-3">Nights</th></tr></thead><tbody>{tour.hotels.map(hotel => <tr key={hotel.location} className="border-t border-slate-200"><th scope="row" className="p-3 align-top">{hotel.location}</th><td className="p-3 text-slate-600">{hotel.name}<p className="mt-2 text-xs leading-5">{hotel.detail}</p></td><td className="p-3 align-top font-bold text-orange-600">{hotel.nights}</td></tr>)}</tbody><tfoot className="border-t border-slate-200 bg-slate-50"><tr><th colSpan={2} className="p-3">Accommodation nights</th><td className="p-3 font-bold">4</td></tr></tfoot></table></div><p className="mt-4 text-sm leading-6 text-slate-600">If a listed property is unavailable, we guarantee a replacement hotel or resort in the same or a higher category. Camp availability determines whether the Sam night is spent in a tent or a Jaisalmer hotel.</p></section>
        <section id="itinerary" className={sectionClass}>
          <div className="flex flex-wrap items-center justify-between gap-4"><h2 className="text-2xl font-extrabold tracking-tight">Itinerary Description</h2><a href="https://www.google.com/maps/dir/Delhi/Jodhpur/Jaisalmer/Tanot+Mata+Temple/Sam+Sand+Dunes/Jaisalmer/Jodhpur/Delhi" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700">View Map ↗</a></div>
          <p className="mt-5 text-sm leading-7 text-slate-600">{tour.route}</p><h3 className="mb-5 mt-7 text-xl font-bold">Day-wise Itinerary</h3>
          <ItineraryAccordion itinerary={jodhpurJaisalmerDays} destination={tour.destination} category="Group Tour" packageTitle={tour.title} packageId={tour.packageId} duration={`${tour.duration}; ${tour.overallDuration}`} overview={`${tour.overview} Available Delhi departures: 11, 16 and 23 December 2026. Offline booking through the team only; no online checkout.`} highlights={tour.highlights.map(item => `${item.title} — ${item.detail}`)} inclusions={tour.inclusions} exclusions={tour.exclusions} groupRates={tour.groupRates} sharingRates={tour.groupRates.sharingRates} hotels={tour.hotels.map(hotel => ({name:`${hotel.location}: ${hotel.name} · ${hotel.nights} night${hotel.nights === 1 ? "" : "s"}`}))} meals={tour.meals} hidePackageId showDownload isGroupTerms/>
        </section>
        <section id="inclusions" className={sectionClass}><h2 className="mb-5 text-2xl font-extrabold tracking-tight">What&apos;s Included &amp; What&apos;s Excluded</h2><InclusionsExclusions inclusions={tour.inclusions} exclusions={tour.exclusions} initiallyExpanded/></section>
        <PackageFaqTabs groups={jodhpurJaisalmerFaqs} showTravellerTerms/>
      </div>
      <BookingSummary/>
    </div>
  </main>;
}

