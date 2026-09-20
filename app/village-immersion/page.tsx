import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Village Immersion Tours in India | Only Road Trip",
  description: "Experience real Indian village life through curated village immersion tours across Haryana, Punjab, Rajasthan, J&K and Himachal Pradesh.",
  alternates: { canonical: "https://www.onlyroadtrip.com/village-immersion" },
};

const regions = [
  ["Haryana", "haryana", "Real Haryana village life — farming, soil, irrigation, tube-wells, local homes, food and community stories."],
  ["Punjab", "punjab", "Living Punjab beyond the cities — farms, village kitchens, crafts, local traditions and everyday rural life."],
  ["Rajasthan", "rajasthan", "Rural Rajasthan through heritage, desert-edge communities, crafts, agriculture, food and local stories."],
  ["Jammu & Kashmir", "jammu-kashmir", "Village life through orchards, mountain communities, local food, crafts and Kashmiri traditions."],
  ["Himachal Pradesh", "himachal-pradesh", "Himalayan village life, traditional homes, farming, forests, food and community-led experiences."],
];

const experiencePoints = [
  ["Village History", "Understand how the village developed, its traditions, architecture and the stories passed between generations."],
  ["Farming & Soil", "Walk through working fields, identify seasonal crops and learn how local soil is prepared and used."],
  ["Water & Irrigation", "See tube-wells, canals, channels and local irrigation systems and understand how water reaches the fields."],
  ["Local Food", "Share home-cooked regional meals prepared with local ingredients and traditional methods."],
  ["People & Livelihoods", "Meet farmers, artisans, families and other local members who shape everyday village life."],
  ["Village Stay", "Stay with a verified local host and experience the village after the day visitors have left."],
  ["Crafts & Traditions", "Discover local skills, occupations, festivals, customs and the cultural details that make each village distinct."],
  ["Slow Travel", "Small groups, local storytelling and time to observe rather than rushing from one sightseeing stop to another."],
];

export default function VillageImmersionPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#071325] via-[#102a5c] to-[#0f5c78] pb-20 pt-36 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(103,232,249,0.18),transparent_30%),radial-gradient(circle_at_10%_80%,rgba(59,130,246,0.18),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-extrabold uppercase tracking-[0.32em] text-cyan-300">Only Road Trip • Signature Experience</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-7xl">Village Immersion</h1>
          <p className="mt-5 max-w-3xl text-xl font-semibold text-white/95 sm:text-2xl">Live the village. Understand India.</p>
          <p className="mt-5 max-w-3xl text-base leading-8 text-slate-200 sm:text-lg">This is not a farm resort and not a staged village attraction. Our village immersion journeys take you into real rural communities to understand how people live, work, farm, cook, celebrate and connect with their land.</p>
          <div className="mt-8 flex flex-wrap gap-3 text-xs font-bold text-white/85">{["Real Villages", "Local Hosts", "Farming", "Food", "History", "Culture", "Small Groups"].map((item) => <span key={item} className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">{item}</span>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[0.28em] text-blue-700">What you will experience</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">A village is the destination.</h2><p className="mt-4 text-base leading-8 text-slate-600">Every itinerary is designed around the real life of the community rather than a checklist of tourist attractions.</p></div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{experiencePoints.map(([title, text]) => <article key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-lg font-extrabold text-slate-900">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></article>)}</div>
      </section>

      <section className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl"><p className="text-xs font-extrabold uppercase tracking-[0.28em] text-blue-700">Select Region</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950 sm:text-4xl">Choose the village story you want to experience.</h2></div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-5">{regions.map(([name, slug, text], index) => <Link key={slug} href={"/village-immersion/" + slug} className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition hover:-translate-y-1 hover:border-blue-300 hover:bg-white hover:shadow-xl"><span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">0{index + 1}</span><h3 className="mt-4 text-2xl font-extrabold text-slate-950">{name}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p><span className="mt-6 inline-block text-xs font-extrabold uppercase tracking-wider text-blue-700">Explore →</span></Link>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:px-8">
        <p className="text-xs font-extrabold uppercase tracking-[0.28em] text-blue-700">Our Philosophy</p><h2 className="mt-3 text-3xl font-extrabold text-slate-950 sm:text-4xl">Not a resort pretending to be a village.</h2><p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-slate-600">Real homes. Real fields. Real families. Real stories. We work with selected local hosts and community members so travellers can experience rural India respectfully, comfortably and authentically.</p><Link href="/plan-your-trip" className="mt-8 inline-flex rounded-full bg-blue-800 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-800/20 hover:bg-blue-900">Plan a Village Immersion</Link>
      </section>
    </main>
  );
}
