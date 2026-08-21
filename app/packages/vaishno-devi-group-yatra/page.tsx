import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vaishno Devi Group Yatra Package | Katra Mata Vaishno Devi Yatra",
  description:
    "Join a professionally planned Vaishno Devi Group Yatra from Delhi to Katra with coordinated travel, stay and pilgrimage assistance from Only Road Trip.",
  keywords: [
    "Vaishno Devi Group Yatra",
    "Vaishno Devi Yatra Package",
    "Vaishno Devi Tour Package",
    "Mata Vaishno Devi Yatra from Delhi",
    "Katra Vaishno Devi Package",
    "Vaishno Devi Group Tour",
    "Vaishno Devi Yatra from Delhi",
  ],
  alternates: { canonical: "https://www.onlyroadtrip.com/packages/vaishno-devi-group-yatra" },
  openGraph: {
    title: "Vaishno Devi Group Yatra | Only Road Trip",
    description:
      "A comfortable, coordinated group pilgrimage to Mata Vaishno Devi with Only Road Trip.",
    url: "https://www.onlyroadtrip.com/packages/vaishno-devi-group-yatra",
    siteName: "Only Road Trip",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/images/package-placeholder.jpg", alt: "Vaishno Devi Group Yatra" }],
  },
  robots: { index: true, follow: true },
};

const itinerary = [
  ["01", "Delhi → Katra", "Group departure from Delhi and journey towards Katra. Meet the tour coordinator and settle into the planned stay after arrival."],
  ["02", "Katra → Vaishno Devi Bhawan", "Early start for the Mata Vaishno Devi pilgrimage. Proceed towards the Bhawan using the available pilgrimage route and return to Katra after darshan, subject to local operating conditions."],
  ["03", "Katra → Delhi", "Breakfast, check-out and return journey to Delhi. Tour concludes with group drop-off."],
];

const inclusions = [
  "Group tour coordination and assistance",
  "Planned transportation as per the confirmed group itinerary",
  "Hotel stay in Katra as per the confirmed package",
  "Breakfast / meals wherever specifically mentioned in the final confirmation",
  "Tour coordinator assistance during the group journey",
  "Basic pilgrimage-route guidance and coordination",
];

const exclusions = [
  "Helicopter, battery car, pony, palki or other paid pilgrimage services unless specifically included",
  "Personal expenses, shopping and laundry",
  "Meals not specifically mentioned in the final confirmation",
  "Any entry, permit or service fee not mentioned under inclusions",
  "Travel insurance and medical expenses",
  "Anything not expressly listed under inclusions",
];

const faqs = [
  ["Who is this Vaishno Devi Group Yatra suitable for?", "It is designed for travellers who prefer a coordinated group pilgrimage with planned transport, stay and tour assistance instead of arranging every element independently."],
  ["Where does the group journey start?", "The landing page is designed around a Delhi-origin group journey. Exact pickup point, reporting time and departure schedule are confirmed before the tour."],
  ["Is the Vaishno Devi darshan guaranteed?", "Darshan and pilgrimage movement depend on official shrine administration, weather, crowd conditions, security arrangements and other local operating factors. The tour team assists with coordination but cannot guarantee a particular darshan time."],
  ["Can senior citizens join the group?", "Yes, subject to individual mobility and fitness requirements. Travellers should discuss walking, route and assistance needs with the Only Road Trip team before confirmation."],
  ["Can I customise the group package?", "Yes. Private departures, different hotel categories, vehicle preferences and additional nights can be discussed separately with the travel team."],
];

const whatsappUrl =
  "https://wa.me/919211796168?text=Hi%20Only%20Road%20Trip%2C%20I%20want%20details%20for%20the%20Vaishno%20Devi%20Group%20Yatra.";

export default function VaishnoDeviGroupYatraPage() {
  const packageSchema = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Vaishno Devi Group Yatra",
    description:
      "Coordinated group pilgrimage journey to Mata Vaishno Devi with Katra stay and group travel assistance.",
    touristType: ["Pilgrimage travellers", "Families", "Group travellers", "Senior travellers"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: itinerary.map(([position, name, description]) => ({
        "@type": "ListItem",
        position: Number(position),
        name,
        description,
      })),
    },
    provider: {
      "@type": "TravelAgency",
      name: "Only Road Trip",
      url: "https://www.onlyroadtrip.com",
      telephone: "+91-9211796168",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(packageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div
          className="absolute inset-0 -z-20 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/package-placeholder.jpg')" }}
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(2,6,23,.94),rgba(2,6,23,.76),rgba(2,6,23,.36))]" />
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-28">
          <div className="max-w-4xl">
            <div className="mb-5 flex flex-wrap gap-2 text-xs font-extrabold uppercase tracking-wider">
              <span className="rounded-full bg-orange-500 px-4 py-2">Group Yatra</span>
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur">Pilgrimage Tour</span>
              <span className="rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur">Katra • Jammu & Kashmir</span>
            </div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[.3em] text-cyan-300">Mata Vaishno Devi</p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
              Vaishno Devi Group Yatra Package
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-8 text-white/85 md:text-xl">
              A coordinated pilgrimage experience for families and groups, with planned travel, Katra stay and on-trip assistance by Only Road Trip.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-orange-500 px-6 py-4 text-center font-extrabold shadow-lg transition hover:bg-orange-600">
                Get Group Tour Details on WhatsApp
              </a>
              <a href="#itinerary" className="rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-center font-extrabold backdrop-blur transition hover:bg-white/15">
                View Itinerary
              </a>
            </div>
          </div>
        </div>
      </section>

      <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
        <div className="mx-auto flex max-w-7xl gap-6 overflow-x-auto px-5 py-4 text-sm font-extrabold md:px-8">
          {[["overview", "Overview"], ["itinerary", "Itinerary"], ["inclusions", "Inclusions"], ["why-us", "Why Only Road Trip"], ["faqs", "FAQ"]].map(([id, label]) => (
            <a key={id} href={`#${id}`} className="whitespace-nowrap hover:text-orange-600">{label}</a>
          ))}
        </div>
      </div>

      <section id="overview" className="mx-auto max-w-7xl px-5 py-10 md:px-8 md:py-14">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Departure", "Delhi"],
            ["Destination", "Katra / Vaishno Devi"],
            ["Tour Type", "Group Pilgrimage"],
            ["Ideal For", "Families & Groups"],
          ].map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-xs font-black uppercase tracking-widest text-slate-500">{label}</p>
              <p className="mt-2 text-lg font-extrabold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
          <article className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-10">
            <p className="text-sm font-bold uppercase tracking-widest text-orange-600">Plan your pilgrimage with confidence</p>
            <h2 className="mt-2 text-3xl font-black tracking-tight md:text-4xl">Vaishno Devi Yatra, organised for the group</h2>
            <p className="mt-5 text-base leading-8 text-slate-600">
              This landing page is built for travellers who want the convenience of a group departure instead of managing transport, hotel coordination and the pilgrimage journey separately. The final departure date, reporting time, hotel and inclusions are confirmed for each group before booking.
            </p>
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              {["Coordinated group departure", "Katra stay assistance", "Pilgrimage route guidance", "Family & senior-friendly planning", "Dedicated tour coordination", "Flexible private-group options"].map((item) => (
                <div key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4 font-semibold">
                  <span className="text-xl font-black text-orange-500">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </article>

          <aside className="rounded-3xl bg-slate-950 p-7 text-white shadow-xl md:p-8">
            <p className="text-xs font-black uppercase tracking-widest text-cyan-300">Need the next departure?</p>
            <h2 className="mt-3 text-2xl font-black">Check dates & group availability</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">
              Group departures can vary by season and demand. Message the team for the current departure schedule, price, hotel and pickup details.
            </p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="mt-7 block rounded-xl bg-orange-500 px-5 py-4 text-center font-extrabold hover:bg-orange-600">
              WhatsApp the Travel Team
            </a>
            <a href="tel:+919211796168" className="mt-3 block rounded-xl border border-white/15 bg-white/5 px-5 py-4 text-center font-bold hover:bg-white/10">
              Call +91 92117 96168
            </a>
          </aside>
        </div>
      </section>

      <section id="itinerary" className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
          <p className="text-sm font-bold uppercase tracking-widest text-orange-600">Day-wise plan</p>
          <h2 className="mt-2 text-3xl font-black md:text-4xl">Vaishno Devi Group Yatra Itinerary</h2>
          <p className="mt-4 max-w-3xl leading-7 text-slate-600">The sequence below is a planning framework. Final timings, transport, stay and pilgrimage movement are confirmed according to the selected departure.</p>
          <div className="mt-9 space-y-4">
            {itinerary.map(([day, title, description]) => (
              <div key={day} className="grid gap-5 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:grid-cols-[80px_230px_1fr] md:items-start">
                <div className="text-3xl font-black text-orange-500">{day}</div>
                <h3 className="text-xl font-extrabold">{title}</h3>
                <p className="leading-7 text-slate-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="inclusions" className="mx-auto max-w-7xl px-5 py-12 md:px-8 md:py-16">
        <div className="grid gap-7 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-9">
            <h2 className="text-2xl font-black">Tour Inclusions</h2>
            <div className="mt-6 space-y-3">{inclusions.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-emerald-50 p-4"><span className="font-black text-emerald-600">✓</span><span className="leading-6">{item}</span></div>)}</div>
          </div>
          <div className="rounded-3xl bg-white p-7 shadow-sm ring-1 ring-slate-200 md:p-9">
            <h2 className="text-2xl font-black">Tour Exclusions</h2>
            <div className="mt-6 space-y-3">{exclusions.map((item) => <div key={item} className="flex gap-3 rounded-xl bg-rose-50 p-4"><span className="font-black text-rose-600">×</span><span className="leading-6">{item}</span></div>)}</div>
          </div>
        </div>
      </section>

      <section id="why-us" className="bg-slate-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-18">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-300">Only Road Trip</p>
          <h2 className="mt-2 max-w-3xl text-3xl font-black md:text-4xl">A pilgrimage experience focused on coordination, comfort and clarity</h2>
          <div className="mt-9 grid gap-5 md:grid-cols-3">
            {["Transparent package communication", "Group-focused travel coordination", "Support for families and senior travellers"].map((title, index) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <div className="text-2xl font-black text-orange-400">0{index + 1}</div>
                <h3 className="mt-4 text-lg font-extrabold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-white/65">We confirm the practical details of the selected departure before booking so travellers know what is included and what remains subject to local conditions.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faqs" className="mx-auto max-w-5xl px-5 py-12 md:px-8 md:py-16">
        <p className="text-sm font-bold uppercase tracking-widest text-orange-600">Frequently asked questions</p>
        <h2 className="mt-2 text-3xl font-black md:text-4xl">Vaishno Devi Yatra FAQs</h2>
        <div className="mt-8 space-y-4">
          {faqs.map(([question, answer]) => (
            <details key={question} className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <summary className="cursor-pointer list-none pr-8 font-extrabold marker:hidden">{question}</summary>
              <p className="mt-4 leading-7 text-slate-600">{answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-orange-500">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 px-5 py-10 text-white md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-white/80">Ready for Mata Vaishno Devi?</p>
            <h2 className="mt-1 text-2xl font-black md:text-3xl">Ask for the next group departure</h2>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-white px-7 py-4 text-center font-black text-slate-900 shadow-lg hover:bg-slate-100">
            Get Package Details
          </a>
        </div>
      </section>
    </main>
  );
}
