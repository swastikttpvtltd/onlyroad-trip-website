import type { ReactNode } from "react";
import { packages } from "@/data/packages";
import snapshot from "@/data/varanasiRestoredPresentation.json";
import ItineraryAccordion from "./ItineraryAccordion";
import PackageGallerySlider from "@/components/package/PackageGallerySlider";
import GroupTourTerms from "@/components/package/GroupTourTerms";
import InclusionsExclusions from "./InclusionsExclusions";
import PackageFaqTabs from "./PackageFaqTabs";
import ScrollBackLink from "./ScrollBackLink";
const panel="scroll-mt-20 rounded-2xl bg-white p-6 shadow-sm md:p-7";
const heading="text-2xl font-extrabold tracking-tight text-slate-900";
function routeMap(route:string[]) {const params=new URLSearchParams({api:"1",origin:route[0],destination:route[route.length-1],travelmode:"driving"});if(route.length>2)params.set("waypoints",route.slice(1,-1).join("|"));return "https://www.google.com/maps/dir/?"+params.toString();}
export default function VaranasiLayout({pkg,children}:{pkg:(typeof packages)[number];children:ReactNode}) {
const gallery=pkg.gallery;
const gateways=snapshot.gateways;
const faqs=snapshot.faqs;
const isGroupTerms=false;
const review={...snapshot.review,route:["Varanasi","Ayodhya","Prayagraj","Varanasi"],mapSearch:undefined,mapNote:undefined};
const namedStays=snapshot.stays;
const itinerary=pkg.itinerary.map(day=>({...day,overnightStay:day.overnightStay=== "Varanasi"?"Varanasi — The Kashi Villa or similar":day.overnightStay==="Ayodhya"?"Ayodhya — Sawarthia Sewa Sadan or similar":day.overnightStay}));
  const itineraryHotels = namedStays.map(({ location, property, nights, road }) => ({
    name: location + " — " + (road ? "Overnight travel by vehicle" : property ? property : "Property to be confirmed") + " · " + nights + (nights === 1 ? " night" : " nights"),
  }));

  const map = review.mapSearch
    ? "https://www.google.com/maps/search/?" + new URLSearchParams({ api: "1", query: review.mapSearch })
    : routeMap(review.route);
  const mapNote = review.mapNote ?? (!review.mapSearch && review.route.length > 5
    ? "Some mobile browsers show fewer stops in Google Maps. The full stop sequence is listed above."
    : undefined);
  const standardHotelMeals = pkg.meals.length === 2
    && pkg.meals[0].startsWith("Buffet Breakfast")
    && pkg.meals[1].startsWith("Buffet Dinner");
  const meals = standardHotelMeals
    ? ["Breakfast and dinner are included at the hotel, served as a buffet or set menu depending on the hotel’s service for your stay."]
    : pkg.meals;
  const faqGroups = [
    { title: "Your route & sightseeing", items: [faqs[9], faqs[10], faqs[11]] },
    { title: "Transfers & transport", items: [faqs[4], faqs[5]] },
    { title: "Hotels, meals & stays", items: [faqs[2]] },
    { title: "Pricing & booking", items: [faqs[6], faqs[7], faqs[8], ...faqs.slice(13)] },
    { title: "Cancellation & refunds", items: [faqs[12]] },
  ].map(({ title, items }) => ({
    title,
    items: items.filter(Boolean).map(({ question, answer }) => ({ question, paragraphs: [answer] })),
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="min-w-0 space-y-7">
          <ScrollBackLink href="/packages">Back to Packages</ScrollBackLink>

          <section id="overview" className={panel}>
            <h2 className={heading}>Tour Overview</h2>
            <p className="mt-3 font-bold">{pkg.duration}</p>
            {gateways?.start && gateways.start === gateways.end && !gateways.start.includes("/") ? (
              <p className="mt-4 rounded-xl bg-slate-50 p-4 font-bold">Starts &amp; ends in {gateways.start}</p>
            ) : <dl className="mt-4 grid grid-cols-2 gap-4 rounded-xl bg-slate-50 p-4">
              <div><dt className="text-sm text-slate-600">Start Point</dt><dd className="font-bold">{gateways?.start && <>Ex–{gateways.start}</>}</dd></div>
              <div><dt className="text-sm text-slate-600">End Point</dt><dd className="font-bold">{gateways?.end}</dd></div>
            </dl>}
            {review.confirmations.length > 0 && <ul className="mt-4 list-disc space-y-1 rounded-xl bg-orange-50 py-3 pr-4 pl-8 text-sm leading-6 text-slate-700">
              {review.confirmations.map(note => <li key={note}>{note}</li>)}
            </ul>}
          </section>

          <section id="highlights" className={panel}>
            <h2 className={heading}>Tour Highlights</h2>
            <ul className="mt-5 space-y-3">{review.highlights.map(item => {
              const [title, ...details] = item.split(" — ");
              const detail = details.join(" — ");
              return <li key={item} className="flex items-start gap-3 leading-7 text-slate-700">
              <span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-orange-500 text-xs text-orange-600">✓</span><span><strong className="font-bold text-slate-900">{title}</strong>{detail && ` — ${detail}`}</span>
            </li>; })}</ul>
          </section>

          <section id="gallery" className={panel}>
            <h2 className={heading}>Tour Gallery</h2>
            <div className="mt-5"><PackageGallerySlider gallery={gallery} title={pkg.title} /></div>
          </section>

          <section id="hotels" className={panel}>
            <h2 className={heading}>Hotels</h2>
            <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-sm">
                <caption className="sr-only">Overnight stops for {pkg.title}</caption>
                <thead className="bg-slate-50 text-slate-700"><tr><th scope="col" className="p-3">City or area</th><th scope="col" className="p-3">Hotel</th><th scope="col" className="p-3">Nights</th></tr></thead>
                <tbody>{namedStays.map((stay, index) => <tr key={index} className="border-t border-slate-200">
                  <th scope="row" className="p-3 font-bold">{stay.location}</th><td className="p-3 text-slate-600">{stay.road ? "Overnight travel by vehicle" : stay.property ? stay.property : "Property to be confirmed"}</td><td className="p-3 font-bold text-orange-600">{stay.nights}</td>
                </tr>)}</tbody>
                <tfoot className="border-t border-slate-200 bg-slate-50"><tr><th scope="row" colSpan={2} className="p-3">Total nights</th><td className="p-3 font-bold">{namedStays.reduce((total, stay) => total + stay.nights, 0)}</td></tr></tfoot>
              </table>
            </div>
            {pkg.slug === "gangtok-darjeeling" && <p className="mt-4 text-sm text-slate-600">Hotel rooms can be arranged for couples on double sharing and for groups across multiple rooms. Group room allocations depend on group size and availability.</p>}
            {pkg.slug === "rajasthan-grand-tour" && <p className="mt-4 text-sm text-slate-600">Night 5 stay: Sam Sand Dunes desert camp or a hotel in Jaisalmer, as confirmed at booking.</p>}
            <p className="mt-4 text-sm text-slate-600">If a listed property is unavailable, we guarantee a replacement hotel or resort in the same or a higher category.</p>
            <div className="mt-5 rounded-xl bg-orange-50 p-4"><h3 className="font-bold">Meals</h3><p className="mt-1 text-sm text-slate-600">{meals.join(" · ")}</p></div>
          </section>

          <section id="itinerary" className={panel}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className={heading}>Itinerary Description</h2>
              <a href={map} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 hover:bg-orange-100">View Map ↗</a>
            </div>
            {review.introduction && <p className="mt-5 leading-8 text-slate-600">{review.introduction}</p>}
            <p className="mt-2 text-sm leading-6 text-slate-600">{review.route.join(" → ")}</p>
            {mapNote && <p className="mt-2 text-xs leading-5 text-slate-500">{mapNote}</p>}
            <h3 className="mt-7 text-xl font-bold">Day-wise Itinerary</h3>
            <div className="mt-5">
              <ItineraryAccordion isGroupTerms={isGroupTerms} itinerary={itinerary} destination={pkg.destination} category={pkg.category} packageTitle={pkg.title} packageId={pkg.packageId} duration={pkg.duration} overview={review.introduction} highlights={review.highlights} inclusions={pkg.inclusions} exclusions={pkg.exclusions} groupRates={pkg.groupRates} sharingRates={pkg.groupRates.sharingRates} bestTime={pkg.bestTime} hotels={itineraryHotels} meals={meals} />
            </div>
          </section>

          <section id="inclusions" className={panel}>
            <h2 className={heading}>Tour Inclusions &amp; Exclusions</h2>
            <div className="mt-5"><InclusionsExclusions initiallyExpanded inclusions={pkg.inclusions} exclusions={pkg.exclusions} /></div>
          </section>
          {isGroupTerms && <GroupTourTerms />}
          <PackageFaqTabs groups={faqGroups} />
          {pkg.slug === "mcleodganj-bir-billing-weekend" && <p className="text-xs text-slate-500"><a href="https://commons.wikimedia.org/wiki/File:Dharamsala_and_dhauladhar_range.jpg">Dhauladhar</a> by Sitikantha kheti (<a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>) · <a href="https://commons.wikimedia.org/wiki/File:Paragliding_in_Bir-Billing_(79401).jpg">Bir paragliding</a> by Gannu03 (<a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>) · <a href="https://commons.wikimedia.org/wiki/File:Chokling_Monastery,_Bir.jpg">Chokling Monastery</a> by Brahmavadini (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>). WebP conversions.</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
