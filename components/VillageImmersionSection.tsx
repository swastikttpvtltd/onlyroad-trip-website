"use client";

import Link from "next/link";

const regions = [
  { name: "Haryana Villages", slug: "haryana", tagline: "Farming, water systems, village history & Haryanvi hospitality", accent: "from-blue-950 via-blue-800 to-cyan-700" },
  { name: "Punjab Villages", slug: "punjab", tagline: "Fields, food, crafts, community life & Punjabi traditions", accent: "from-indigo-950 via-blue-800 to-sky-700" },
  { name: "Rajasthan Villages", slug: "rajasthan", tagline: "Heritage, desert life, crafts, farming & rural communities", accent: "from-amber-950 via-orange-800 to-rose-700" },
  { name: "J&K Villages", slug: "jammu-kashmir", tagline: "Orchards, mountain communities, food & Kashmiri life", accent: "from-slate-950 via-indigo-900 to-cyan-700" },
  { name: "Himachal Villages", slug: "himachal-pradesh", tagline: "Himalayan homes, farming, forests & local culture", accent: "from-emerald-950 via-teal-800 to-cyan-700" },
];

export default function VillageImmersionSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16 sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.08),transparent_35%),radial-gradient(circle_at_bottom_left,rgba(30,64,175,0.06),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs font-extrabold uppercase tracking-[0.3em] text-blue-700">Only Road Trip • Signature Experience</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">Discover India Beyond the Tourist Trail</h2>
          <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">Step inside real Indian villages, meet the people who call them home, understand farming and local traditions, taste authentic food and experience rural India from within.</p>
        </div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {regions.map((region) => (
            <Link key={region.slug} href={"/village-immersion/" + region.slug} className="group relative min-h-[220px] overflow-hidden rounded-3xl shadow-[0_18px_50px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,23,42,0.18)]">
              <div className={"absolute inset-0 bg-gradient-to-br " + region.accent} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,0.22),transparent_28%)]" />
              <div className="relative flex h-full min-h-[220px] flex-col justify-end p-5 text-white">
                <span className="mb-auto inline-flex w-fit rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur">Village Immersion</span>
                <h3 className="mt-8 text-xl font-extrabold leading-tight">{region.name}</h3>
                <p className="mt-2 text-xs leading-5 text-white/80">{region.tagline}</p>
                <span className="mt-4 text-xs font-extrabold uppercase tracking-wider text-cyan-200">Explore Region →</span>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center"><Link href="/village-immersion" className="rounded-full bg-blue-800 px-7 py-3 text-sm font-extrabold text-white shadow-lg shadow-blue-800/20 transition hover:bg-blue-900">Explore Village Immersion</Link></div>
      </div>
    </section>
  );
}
