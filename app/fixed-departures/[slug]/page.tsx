import { connection } from "next/server";
import {proposedDepartureHotels} from "@/features/fixedDepartures/data/fixedDepartureHotels";
import FixedDepartureBookingCard from "@/features/fixedDepartures/components/package/FixedDepartureBookingCard";
import {FixedBookingProvider} from "@/features/fixedDepartures/components/package/FixedBookingState";
import { getFixedDepartureMap } from "@/features/fixedDepartures/data/fixedDepartureMaps";
import { departureStartingPrices, departureIntroductions } from "@/features/fixedDepartures/data/fixedDeparturePresentation";
import FixedDepartureSelector from "@/features/fixedDepartures/components/package/FixedDepartureSelector";
import FixedDepartureFaq from "@/features/fixedDepartures/components/package/FixedDepartureFaq";
import { getFixedDepartureFaqs } from "@/features/fixedDepartures/data/fixedDepartureFaqs";
import type { Metadata } from "next";
import { getDayAttractions, getTourHighlights } from "@/features/fixedDepartures/data/fixedDepartureHighlights";
import Image from "next/image";
import ItineraryAccordion from "@/features/fixedDepartures/components/package/ItineraryAccordion";
import InclusionsExclusions from "@/features/fixedDepartures/components/package/InclusionsExclusions";
import { packages } from "@/data/packages";
import ScrollBackLink from "@/features/fixedDepartures/components/package/ScrollBackLink";
import { notFound } from "next/navigation";
import { fixedDepartureReviews, fixedDepartureInclusions, fixedDepartureExclusions } from "@/features/fixedDepartures/data/fixedDepartureDetails";

type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() { return fixedDepartureReviews.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tour = fixedDepartureReviews.find((item) => item.slug === slug);
  return {
    title: `${tour?.title ?? "Fixed Departure"} | Only Road Trip`,
    ...(tour ? { alternates: { canonical: `https://www.onlyroadtrip.com/fixed-departures/${tour.slug}` } } : {}),
  };
}

export default async function FixedDepartureItinerary({ params }: Props) {
  await connection();
  const { slug } = await params;
  const tour = fixedDepartureReviews.find((item) => item.slug === slug);
  if (!tour) notFound();
  const source = packages.find((item) => item.slug === tour.sourceSlug);
  if (!source) notFound();
  const faqGroups = getFixedDepartureFaqs(tour);
  const startingPrice = departureStartingPrices[tour.slug];
  const introduction = departureIntroductions[tour.slug];
  const hotelRows = tour.slug.startsWith("varanasi") ? [
    { city: "Varanasi", hotel: "Kashi Villa or Similar", nights: 3 },
    { city: "Ayodhya", hotel: "Hotel Sawarthia Sewa Sadan or Similar", nights: 1 },
    ...(tour.nights === 5 ? [{ city: "Bodh Gaya", hotel: "Jataka Inn or Similar", nights: 1 }] : []),
  ] : proposedDepartureHotels[tour.slug] ?? tour.stays.split(" · ").flatMap(stay => { const match = stay.match(/^(.*?)\s+(\d+)N/); return match ? [{ city: match[1].replace(/^Proposed:\s*/, ""), hotel: "Accommodation to be confirmed", nights: Number(match[2]) }] : []; });
  const isVaranasiCircuit = tour.slug.startsWith("varanasi");
  const isExtendedVaranasi = isVaranasiCircuit && tour.nights === 5;
  const routeMapUrl = getFixedDepartureMap(tour.slug);
  const useExistingServices = tour.slug.startsWith("varanasi");
  const inclusions = useExistingServices
    ? [
      "Meals (Breakfast, Lunch and Dinner)",
      ...source.inclusions.filter(item => item.startsWith("Accommodation ") && !item.startsWith("Accommodation in 3-Star")),
      ...source.inclusions.filter(item => item.startsWith("Two bottles")),
      ...source.inclusions.filter(item => /^(Complete transfers|Scheduled transfers)/.test(item)),
      ...source.inclusions.filter(item => item.startsWith("Services of the Tour Manager")),
      ...source.inclusions.filter(item => item.startsWith("Driver Tips")),
      ...source.inclusions.filter(item => item.startsWith("City Tax")),
      ...source.inclusions.filter(item => item.startsWith("Accommodation in 3-Star")),
      "Boat rides on the Ganga in Varanasi and at Triveni Sangam in Prayagraj are included, subject to river conditions and local permissions.",
      "Both onward and return flight tickets between your selected departure city and Varanasi are included.",
      ...source.inclusions.filter(item => item.startsWith("5% GST")),
    ]
    : tour.slug === "amarnath-yatra-kashmir"
      ? [
        "Meals as per the itinerary: dinner on arrival, breakfast and dinner on intermediate days, and breakfast on departure day.",
        "Accommodation in Srinagar on twin sharing for two nights, on arrival and after returning from the yatra.",
        "Accommodation at the authorised Sonamarg/Baltal-side yatra base for two nights, as per the confirmed route and stay arrangements.",
        "Scheduled group pickup and drop between Srinagar Airport and the Srinagar hotel.",
        "Scheduled group road transfers from Srinagar to the authorised yatra base and back, as per the itinerary.",
        "Onward and return economy flights between your selected departure city and Srinagar.",
        "5% GST included in the package price.",
      ]
      : fixedDepartureInclusions.filter((_, i) => i !== 6);
  const exclusions = useExistingServices
    ? [
      "Entrance fees and sightseeing tickets.",
      "Rail fares and flights other than the included onward and return flights.",
      "Personal transfers and sightseeing outside the itinerary.",
      "Additional meals, snacks and drinks beyond the included breakfast, lunch, dinner and two water bottles per person per day.",
      "Shopping, laundry, porterage, telephone calls and other personal expenses.",
      "Extra hotel nights, room upgrades and flight-class upgrades.",
      "Premium airline seats and changes to your booked flights or travel route.",
      "Special pujas, priests, ritual materials and priority darshan unless listed as included.",
      "Additional or repeated activities requested outside the itinerary.",
      "Medical, hospital and other emergency expenses.",
      "Extra costs caused by disruptions, natural events or route changes.",
      "Airfare or hotel-rate increases before booking confirmation.",
      "New or increased government taxes beyond the included 5% GST, if applicable.",
      "Services not listed under inclusions.",
    ]
    : tour.slug === "amarnath-yatra-kashmir"
      ? [
        "Entrance fees and sightseeing tickets.",
        "Rail fares and flights other than the included onward and return flights.",
        "Personal transfers and sightseeing outside the itinerary.",
        "Lunch, additional meals, snacks and drinks outside the stated meal plan.",
        "Shopping, laundry, tips and other personal expenses.",
        "Early check-in, late checkout, extra hotel nights and room upgrades.",
        "Excess baggage, premium airline seats and changes to your booked flights.",
        "Special pujas, priests, ritual materials, donations and priority darshan.",
        "Helicopter tickets, pony rides, palkis and porter services unless listed in your confirmed quotation.",
        "Travel insurance, medical treatment and evacuation expenses.",
        "Extra costs caused by weather disruptions, delays or route changes.",
        "Services not listed under inclusions.",
      ]
      : fixedDepartureExclusions;
  const hotelsByCity = new Map(hotelRows.map(row => [row.city, row.hotel]));
  const stayCityAliases: Record<string, string> = {
    "Kevadia/Vadodara": "Ekta Nagar / Kevadia",
    "Sasan Gir region": "Sasan Gir",
    "Authorised base accommodation": "Authorised yatra base",
  };
  const itinerary = tour.itinerary.map((day, i) => ({ day: i + 1, title: day.title, attractions: getDayAttractions(tour, i), morning: day.morning, afternoon: day.afternoon, evening: day.evening, overnightStay: (() => {
    const city = day.stay.split(" — ")[0];
    const hotel = hotelsByCity.get(stayCityAliases[city] ?? city);
    return hotel ? day.stay + " · " + hotel : day.stay;
  })(), meals: day.meals, notes: [`Scheduled movement: ${day.movement}`, ...day.notes] }));
  return <FixedBookingProvider><main className="min-h-screen bg-slate-50 pb-20 text-slate-900">
    <section className="relative h-[430px] overflow-hidden"><Image src={source.image} alt={tour.title} fill priority sizes="100vw" className="object-cover" /><div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" /><div className="absolute inset-0 mx-auto flex max-w-7xl items-end px-5 pb-12 md:px-8"><div className="max-w-4xl text-white"><span className="rounded bg-orange-500 px-3 py-1.5 text-xs font-bold uppercase">Fixed Departures</span><h1 className="mt-4 text-4xl font-extrabold leading-tight md:text-5xl">{tour.title}</h1><p className="mt-4 text-base leading-7 text-white/90">{tour.route}</p><p className="mt-3 text-sm font-semibold text-white/75">{tour.nights} Nights / {tour.itinerary.length} Days</p></div></div></section>
    <div className="sticky top-0 z-30 border-b bg-white shadow-sm"><div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-bold md:px-8">{[...[ ['departures','Departures'] ],['overview','Overview'],['highlights','Highlights'],['itinerary','Itinerary'],['inclusions','Inclusions'],['hotels','Hotels & Stays'],...(faqGroups.length ? [['faqs','FAQ']] : [])].map(([id,label]) => <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-orange-600">{label}</a>)}</div></div>
    <div className="mx-auto max-w-7xl px-5 py-8 md:px-8">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]"><div className="min-w-0"><ScrollBackLink href="/#fixed-departures">Back to Fixed Departures</ScrollBackLink>

      
      <div className="mt-5 rounded-2xl bg-white p-5 shadow-sm"><p className="text-lg font-bold text-slate-900">{tour.nights} Nights / {tour.itinerary.length} Days</p>
      <p className="mt-4 leading-7 text-slate-600">{tour.route}</p><p className="mt-3 text-xl font-extrabold text-slate-900">Starting from ₹{startingPrice.toLocaleString("en-IN")} <span className="text-sm font-normal text-slate-500">per person · twin sharing · flights and 5% GST included</span></p></div>
      <FixedDepartureSelector nights={tour.nights} slug={tour.slug} />
      <div id="overview" className="mt-6 rounded-2xl bg-white p-6 shadow-sm md:p-7">
        <h2 className="text-xl font-bold">Departure Cities</h2>
        <p className="mt-3 leading-7">Delhi · Mumbai · Chennai · Hyderabad · Bengaluru</p>
        <p className="mt-3 leading-7 text-slate-700">{useExistingServices ? "Onward and return flights to Varanasi are included from your selected departure city." : "Onward and return flights are included from your selected departure city, as specified in the itinerary."}</p>
      </div>
      <section id="highlights" className="mt-7 rounded-2xl bg-white p-6 shadow-sm md:p-7"><h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Tour Highlights</h2><ul className="mt-5 space-y-4">{getTourHighlights(tour).map(item => <li key={item.title} className="flex items-start gap-3 text-base leading-7 text-slate-700"><span aria-hidden="true" className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-orange-500 text-xs text-orange-500">✓</span><span><strong className="font-bold text-slate-900">{item.title}</strong> — {item.description}</span></li>)}</ul></section>
      <section id="hotels" className="mt-8 rounded-2xl bg-white p-6 shadow-sm md:p-7">
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Hotels & Night Stays</h2>
        {hotelRows.length > 0 ? <><div className="mt-5 overflow-x-auto rounded-xl border border-slate-200"><table className="w-full min-w-[420px] text-left text-sm"><caption className="sr-only">Proposed hotels and overnight stays for {tour.title}</caption><thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-600"><tr><th scope="col" className="px-5 py-4">City</th><th scope="col" className="px-5 py-4">Hotel Name</th><th scope="col" className="px-5 py-4">Nights</th></tr></thead><tbody>{hotelRows.map(row => <tr key={row.city} className="border-t border-slate-100"><th scope="row" className="px-5 py-5 font-bold text-slate-900">{row.city}</th><td className="px-5 py-5 text-slate-600">{row.hotel}</td><td className="px-5 py-5 font-semibold text-orange-600">{row.nights}</td></tr>)}</tbody><tfoot className="border-t border-slate-200 bg-slate-50"><tr><th colSpan={2} scope="row" className="px-5 py-4 font-bold">Total Night Stays</th><td className="px-5 py-4 font-bold">{tour.nights}</td></tr></tfoot></table></div><p className="mt-4 text-sm leading-6 text-slate-500">Named properties are proposed options, not confirmed reservations. Final hotel, room category, heating, meal plan, availability and any price change will be agreed before booking confirmation. Online star labels vary; Kedarnath and yatra-base camps are basic pilgrimage accommodation and are not advertised as 3-star hotels.</p><div className="mt-5 rounded-xl bg-orange-50 px-5 py-4"><h3 className="font-bold text-slate-900">Meals</h3><p className="mt-1 text-sm text-slate-600">{useExistingServices ? "Breakfast, Lunch and Dinner included." : "Meals as specified in each day’s itinerary."}</p></div></> : <p className="mt-3 leading-7 text-slate-600">{tour.stays}</p>}
      </section>
      <section id="itinerary" className="mt-7 rounded-2xl bg-white p-6 shadow-sm md:p-7" aria-labelledby="day-wise-heading">
        <div className="flex flex-wrap items-center justify-between gap-4"><h2 id="day-wise-heading" className="text-2xl font-bold">Itinerary Description</h2>{routeMapUrl && <a href={routeMapUrl} target="_blank" rel="noopener noreferrer" className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-bold text-orange-700 transition hover:bg-orange-100">View Map ↗</a>}</div>
        {isVaranasiCircuit ? <div className="mt-5 space-y-4 leading-8 text-slate-600">
          <h3 className="text-xl font-bold leading-8 text-slate-900">A spiritual journey through Kashi, Sangam and the city of Lord Ram</h3>
          <p>Begin your journey in Varanasi, where the evening Ganga Aarti brings the riverfront to life with lamps, prayers and devotional music. Travel to Ayodhya via Prayagraj and visit Triveni Sangam, the sacred meeting of the Ganga, Yamuna and, in Hindu tradition, the unseen Saraswati. In Ayodhya, visit Shri Ram Janmabhoomi Mandir and spend time at the Saryu riverfront before returning to Varanasi.</p>
          {isExtendedVaranasi ? <><p>Continue to Bodh Gaya and explore the Mahabodhi Temple precinct, associated with the Buddha’s enlightenment. Stay overnight in Bodh Gaya, then visit Vishnupad Temple in Gaya where entry is permitted. Return to Varanasi for your final night before departure the following day.</p><p>This six-day pilgrimage brings together the devotional traditions of Kashi, Ayodhya and Prayagraj with the sacred heritage of Bodh Gaya and Gaya. Your five-night journey starts and ends in Varanasi, with onward and return flights from your selected departure city, accommodation, breakfast, lunch and dinner, and scheduled transfers included.</p></> : <><p>Discover Varanasi’s temple heritage on a dedicated local sightseeing day. Visit Kashi Vishwanath and Kaal Bhairav, followed by Sankat Mochan Hanuman Temple, Tulsi Manas Mandir and Shri Vishwanath Mandir inside Banaras Hindu University. Enjoy evening free time in the local markets to browse Banarasi textiles and crafts.</p><p>Standard boat rides on the Ganga in Varanasi and at Triveni Sangam add a riverfront perspective to the journey, subject to river conditions and local permissions. This four-night, five-day circuit starts and ends in Varanasi, with onward and return flights from your selected departure city, accommodation, breakfast, lunch and dinner, and scheduled transfers included.</p></>}
        </div> : <div className="mt-5 space-y-4 leading-8 text-slate-600"><h3 className="text-xl font-bold text-slate-900">{introduction?.tagline}</h3>{introduction?.paragraphs.map(text => <p key={text}>{text}</p>)}</div>}
        <h3 className="mt-7 text-xl font-bold">Day-wise Itinerary</h3>
        <div className="mt-5"><ItineraryAccordion fixedDepartureSlug={tour.slug} showDownload={true} itinerary={itinerary} destination={tour.route} category="Fixed Departure" packageTitle={tour.title} sharingRates={[{ type: "Starting from per person, twin sharing; final city-wise quote required", price: startingPrice }]} duration={tour.nights + " Nights / " + tour.itinerary.length + " Days"} overview={tour.route} highlights={getTourHighlights(tour).map(item => item.title + ": " + item.description)} inclusions={inclusions} exclusions={exclusions} hotels={hotelRows.map(row => ({ name: row.city + ": " + row.hotel + " — " + row.nights + " nights" }))} meals={useExistingServices ? ["Breakfast, Lunch and Dinner"] : ["Meals as specified in each day’s itinerary"]} paymentPolicyOverride={faqGroups.find(group => group.title === "Booking & payment policy")?.items.flatMap(item => [item.question, ...item.paragraphs])} cancellationPolicyOverride={faqGroups.find(group => group.title === "Cancellation & refunds")?.items.flatMap(item => [item.question, ...(item.rows?.map(([period, charge]) => period + ": " + charge + " of total booking amount") ?? []), ...item.paragraphs])} /></div>
      </section>
      <section id="inclusions" className="mt-7 rounded-2xl bg-white p-6 shadow-sm md:p-7"><h2 className="text-2xl font-extrabold tracking-tight text-slate-900">Tour Inclusions & Exclusions</h2><p className="my-5 text-sm leading-6 text-slate-600">Only flights, transfers and services expressly listed in the confirmed itinerary and inclusions are covered. No other transportation or flights are included.</p><InclusionsExclusions inclusions={inclusions} exclusions={exclusions} /></section>
      {faqGroups.length > 0 && <FixedDepartureFaq groups={faqGroups} />}
    </div><aside id="booking" className="lg:sticky lg:top-24 lg:h-fit"><FixedDepartureBookingCard slug={tour.slug} title={tour.title} nights={tour.nights}/></aside></div></div>
  </main></FixedBookingProvider>;
}
