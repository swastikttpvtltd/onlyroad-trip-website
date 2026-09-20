import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const regionData: Record<string, { name: string; title: string; intro: string; why: string; experiences: string[]; coming: string }> = {
  haryana: { name: "Haryana", title: "Real Haryana Village Life", intro: "Go beyond the highways and cities to understand the living rural landscape of Haryana — its fields, soil, irrigation, homes, food, occupations and community traditions.", why: "Haryana's village story is closely connected to agriculture, water, cattle, family life and the rhythm of seasonal farming. Our immersion is designed around those real systems rather than staged activities.", experiences: ["Village history & old settlement walk", "Working fields and seasonal crop identification", "Soil, irrigation, tube-well and water-flow explanation", "Traditional Haryanvi home-cooked meals", "Farmer and local family conversations", "Cattle, dairy and rural livelihoods", "Village crafts, occupations and community stories", "Sunrise/sunset village walks and local storytelling"], coming: "Selected Haryana villages will be launched after host verification and local experience mapping." },
  punjab: { name: "Punjab", title: "Living Punjab Beyond the Cities", intro: "Experience Punjab through its villages, fields, kitchens, people, crafts and traditions — with time to understand how everyday rural life works.", why: "Punjab's rural identity is deeply connected with farming, food, community life and a strong cultural tradition. The experience follows the village itself instead of turning it into a staged attraction.", experiences: ["Village history and community walk", "Crop cycles, fields and farm practices", "Canal, tube-well and irrigation systems", "Traditional Punjabi breakfast and home meals", "Local crafts and rural occupations", "Farmer and family conversations", "Folk traditions and village stories", "Village evening and overnight host stay"], coming: "Selected Punjab villages will be launched after local host and community verification." },
  rajasthan: { name: "Rajasthan", title: "Rural Rajasthan, From Within", intro: "Discover the Rajasthan that exists beyond forts and palaces — village communities, crafts, farming, desert-edge life, food, homes and stories.", why: "Rural Rajasthan changes dramatically by landscape and community. Each itinerary will be built around a specific village story instead of selling a generic rural tour.", experiences: ["Village heritage and architecture walk", "Local farming and desert-edge agriculture", "Traditional water systems and wells", "Regional home cooking", "Artisan and handicraft interactions", "Local family and community stories", "Folk traditions and evening storytelling", "Verified village host stay"], coming: "Village selections will be announced after on-ground experience verification." },
  "jammu-kashmir": { name: "Jammu & Kashmir", title: "Kashmir Village Life, Beyond the Usual Route", intro: "Experience village life through orchards, mountain communities, local food, crafts and the everyday culture that visitors often miss.", why: "A Kashmir village experience should be seasonal and community-led, with respect for local routines, privacy and regional traditions.", experiences: ["Village and local history storytelling", "Orchards and seasonal agriculture", "Local food and family kitchens", "Traditional crafts and livelihoods", "Mountain village walks", "Local community conversations", "Seasonal village activities", "Verified host stay and local guide"], coming: "Selected village routes will be launched after local partner, safety and host verification." },
  "himachal-pradesh": { name: "Himachal Pradesh", title: "Life Inside a Himalayan Village", intro: "Slow down in real Himalayan communities and understand traditional homes, farming, forests, food, local occupations and mountain life.", why: "Himachal's villages are shaped by terrain, seasons, agriculture, forests and close community networks. The itinerary should follow that natural rhythm.", experiences: ["Traditional village architecture and history", "Terrace farming and seasonal crops", "Local water sources and irrigation", "Kumaoni-style? no — regional Himachali home cooking", "Apple, orchard or local agriculture experiences where relevant", "Local crafts and occupations", "Mountain walks and village storytelling", "Verified homestay with local host"], coming: "Village routes will be selected by district and season after local verification." },
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

        <div className="mt-10 rounded-3xl border border-blue-100 bg-blue-50 p-7"><p className="text-xs font-extrabold uppercase tracking-[0.25em] text-blue-700">Launch status</p><p className="mt-3 text-base leading-7 text-blue-950">{data.coming}</p><Link href="/plan-your-trip" className="mt-5 inline-flex rounded-full bg-blue-800 px-6 py-3 text-sm font-extrabold text-white hover:bg-blue-900">Request this experience →</Link></div>
      </section>
    </main>
  );
}
