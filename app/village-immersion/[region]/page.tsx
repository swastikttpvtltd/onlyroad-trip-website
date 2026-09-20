import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type VillageCandidate = { name: string; area: string; focus: string; status: string };
const regionData: Record<string, { name: string; title: string; intro: string; why: string; experiences: string[]; villages: VillageCandidate[]; coming: string }> = {
  haryana: { name: "Haryana", title: "Real Haryana Village Life", intro: "Go beyond the highways and cities to understand the living rural landscape of Haryana — its fields, soil, irrigation, homes, food, occupations and community traditions.", why: "Haryana's village story is closely connected to agriculture, water, cattle, family life and the rhythm of seasonal farming. Our immersion is designed around those real systems rather than staged activities.", experiences: ["Village history & old settlement walk", "Working fields and seasonal crop identification", "Soil, irrigation, tube-well and water-flow explanation", "Traditional Haryanvi home-cooked meals", "Farmer and local family conversations", "Cattle, dairy and rural livelihoods", "Village crafts, occupations and community stories", "Sunrise/sunset village walks and local storytelling"], villages: [{ name: "Mangar", area: "Faridabad–Gurugram belt", focus: "Aravalli landscape, village life and farm-linked experiences", status: "Candidate route" }, { name: "Kami", area: "Sonipat", focus: "Farm life, local food and rural community experiences", status: "Candidate route" }, { name: "Khaintawas", area: "Gurugram / Farrukhnagar belt", focus: "Agricultural landscape and village-led experiences", status: "Candidate route" }, { name: "Tauru–Nuh belt", area: "Nuh", focus: "Rural culture, food, crafts and local livelihoods", status: "Research route" }], coming: "Haryana Tourism officially recognizes Farm Tourism and publishes approved farm-tourism locations. Only Road Trip will shortlist village routes after direct host, safety, access and experience verification." },
  punjab: { name: "Punjab", title: "Living Punjab Beyond the Cities", intro: "Experience Punjab through its villages, fields, kitchens, people, crafts and traditions — with time to understand how everyday rural life works.", why: "Punjab's rural identity is deeply connected with farming, food, community life and a strong cultural tradition. The experience follows the village itself instead of turning it into a staged attraction.", experiences: ["Village history and community walk", "Crop cycles, fields and farm practices", "Canal, tube-well and irrigation systems", "Traditional Punjabi breakfast and home meals", "Local crafts and rural occupations", "Farmer and family conversations", "Folk traditions and village stories", "Village evening and overnight host stay"], villages: [{ name: "Malwa village belt", area: "Punjab", focus: "Agriculture, food, village occupations and community life", status: "Research route" }, { name: "Majha village belt", area: "Punjab", focus: "Village heritage, food, crafts and local traditions", status: "Research route" }], coming: "Village names will be published only after direct local-host and route verification." },
  rajasthan: { name: "Rajasthan", title: "Rural Rajasthan, From Within", intro: "Discover the Rajasthan that exists beyond forts and palaces — village communities, crafts, farming, desert-edge life, food, homes and stories.", why: "Rural Rajasthan changes dramatically by landscape and community. Each itinerary will be built around a specific village story instead of selling a generic rural tour.", experiences: ["Village heritage and architecture walk", "Local farming and desert-edge agriculture", "Traditional water systems and wells", "Regional home cooking", "Artisan and handicraft interactions", "Local family and community stories", "Folk traditions and evening storytelling", "Verified village host stay"], villages: [{ name: "Katariasar", area: "Bikaner", focus: "Ethnic rural life, desert landscape and local culture", status: "Official tourism reference" }, { name: "Rural Shekhawati belt", area: "Jhunjhunu / Churu region", focus: "Village heritage, crafts, homes and food", status: "Research route" }], coming: "Rajasthan Tourism has a Rural Tourism Scheme and identifies villages with distinctive rural, cultural, agricultural or craft experiences. Final Only Road Trip routes require on-ground verification." },
  "jammu-kashmir": { name: "Jammu & Kashmir", title: "Kashmir Village Life, Beyond the Usual Route", intro: "Experience village life through orchards, mountain communities, local food, crafts and the everyday culture that visitors often miss.", why: "A Kashmir village experience should be seasonal and community-led, with respect for local routines, privacy and regional traditions.", experiences: ["Village and local history storytelling", "Orchards and seasonal agriculture", "Local food and family kitchens", "Traditional crafts and livelihoods", "Mountain village walks", "Local community conversations", "Seasonal village activities", "Verified host stay and local guide"], villages: [{ name: "Kashmir orchard village belt", area: "Kashmir Valley", focus: "Orchards, local food, mountain communities and seasonal life", status: "Research route" }, { name: "Jammu hill-village belt", area: "Jammu region", focus: "Mountain agriculture, food and local traditions", status: "Research route" }], coming: "Village routes will be published only after local-partner, access, safety and seasonal verification." },
  "himachal-pradesh": { name: "Himachal Pradesh", title: "Life Inside a Himalayan Village", intro: "Slow down in real Himalayan communities and understand traditional homes, farming, forests, food, local occupations and mountain life.", why: "Himachal's villages are shaped by terrain, seasons, agriculture, forests and close community networks. The itinerary should follow that natural rhythm.", experiences: ["Traditional village architecture and history", "Terrace farming and seasonal crops", "Local water sources and irrigation", "Regional Himachali home cooking", "Apple, orchard or local agriculture experiences where relevant", "Local crafts and occupations", "Mountain walks and village storytelling", "Verified homestay with local host"], villages: [{ name: "Kinnaur village belt", area: "Kinnaur", focus: "Orchards, traditional homes, mountain agriculture and local food", status: "Research route" }, { name: "Kullu village belt", area: "Kullu", focus: "Terrace farming, orchards, crafts and village life", status: "Research route" }, { name: "Mandi village belt", area: "Mandi", focus: "Traditional homes, farming, food and local culture", status: "Research route" }], coming: "Himachal routes will be selected district-by-district and season-by-season after local verification." },
};

export async function generateStaticParams() {
  return Object.keys(regionData).map((region) => ({ region }));
}

export async function generateMetadata({ params }: { params: Promise<{ region: string }> }): Promise<Metadata> {
  const { region } = await params;
  const data = regionData[region];
  if (!data) return {};
  return { title: data.title + " | Only Road Trip", description: data.intro, alternates: { canonical: "https://www.onlyroadtrip.com/village-immersion/" + region } };
}

export default async function VillageRegionPage({ params }: { params: Promise<{ region: string }> }) {
  const { region } = await params;
  const data = regionData[region];
  if (!data) notFound();

  return (
    <main className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-br from-[#071325] via-[#102a5c] to-[#0f5c78] pb-16 pt-36 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link href="/village-immersion" className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-300">← Village Immersion</Link>
          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.3em] text-cyan-300">Select Region • {data.name}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">{data.title}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-200">{data.intro}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <article className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><p className="text-xs font-extrabold uppercase tracking-[0.25em] text-blue-700">Why this region</p><h2 className="mt-3 text-3xl font-extrabold text-slate-950">The village is the experience.</h2><p className="mt-4 text-base leading-8 text-slate-600">{data.why}</p></article>
          <article className="rounded-3xl bg-slate-900 p-7 text-white shadow-xl"><p className="text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-300">Experience standard</p><h2 className="mt-3 text-2xl font-extrabold">Real • Local • Small Group</h2><p className="mt-4 text-sm leading-7 text-slate-300">Each route is planned around verified local hosts, community members and working village environments. The final itinerary varies by season and village.</p></article>
        </div>

        <div className="mt-10"><p className="text-xs font-extrabold uppercase tracking-[0.25em] text-blue-700">What you can experience</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950">Inside {data.name}</h2><div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{data.experiences.map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm font-semibold leading-6 text-slate-700 shadow-sm">{item}</div>)}</div></div>

        <div className="mt-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.25em] text-blue-700">Village shortlist</p>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-950">Places we are researching for this experience.</h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">These are research/candidate routes, not guaranteed bookable tours yet. We will publish a village as bookable only after local host, safety, access and experience checks.</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.villages.map((v) => <article key={v.name} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-blue-700">{v.status}</span><h3 className="mt-3 text-xl font-extrabold text-slate-950">{v.name}</h3><p className="mt-1 text-xs font-bold text-slate-500">{v.area}</p><p className="mt-3 text-sm leading-6 text-slate-600">{v.focus}</p></article>)}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-7"><p className="text-xs font-extrabold uppercase tracking-[0.25em] text-blue-700">Launch status</p><p className="mt-3 text-base leading-7 text-blue-950">{data.coming}</p><Link href="/plan-your-trip" className="mt-5 inline-flex rounded-full bg-blue-800 px-6 py-3 text-sm font-extrabold text-white hover:bg-blue-900">Request this experience →</Link></div>
      </section>
    </main>
  );
}
