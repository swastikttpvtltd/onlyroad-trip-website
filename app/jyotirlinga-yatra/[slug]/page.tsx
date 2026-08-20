import Link from "next/link";
import { notFound } from "next/navigation";
import { jyotirlingaPackages } from "@/data/packages/jyotirlinga-packages";

export function generateStaticParams() {
  return jyotirlingaPackages.map((pkg) => ({ slug: pkg.slug }));
}

export default async function JyotirlingaPackagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pkg = jyotirlingaPackages.find((item) => item.slug === slug);
  if (!pkg) notFound();

  return (
    <main className="min-h-screen bg-slate-50 pb-16 pt-28">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Link href="/" className="text-sm font-bold text-blue-700">← Back to Only Road Trip</Link>
        <section className="mt-5 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
          <div className="bg-gradient-to-r from-blue-950 via-blue-800 to-blue-600 p-7 text-white md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Jyotirlinga Experience</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-black md:text-5xl">{pkg.title}</h1>
            <p className="mt-4 max-w-3xl text-sm leading-7 text-blue-50 md:text-base">{pkg.overview}</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-white/15 px-3 py-2">{pkg.duration}</span>
              <span className="rounded-full bg-white/15 px-3 py-2">{pkg.groupSize}</span>
              <span className="rounded-full bg-white/15 px-3 py-2">{pkg.difficulty}</span>
            </div>
          </div>

          <div className="grid gap-6 p-6 md:grid-cols-[1.5fr_1fr] md:p-8">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Day-wise Yatra</h2>
              <div className="mt-5 space-y-4">
                {pkg.itinerary.map((day: any) => (
                  <article key={day.day} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex items-start gap-3">
                      <span className="rounded-lg bg-blue-800 px-3 py-1.5 text-xs font-black text-white">{day.day}</span>
                      <h3 className="text-lg font-extrabold text-slate-950">{day.title}</h3>
                    </div>
                    <div className="mt-4 grid gap-3 text-sm text-slate-700 md:grid-cols-3">
                      <div><b className="text-slate-950">Morning</b><ul className="mt-1 list-disc space-y-1 pl-5">{day.morning.map((x: string) => <li key={x}>{x}</li>)}</ul></div>
                      <div><b className="text-slate-950">Afternoon</b><ul className="mt-1 list-disc space-y-1 pl-5">{day.afternoon.map((x: string) => <li key={x}>{x}</li>)}</ul></div>
                      <div><b className="text-slate-950">Evening</b><ul className="mt-1 list-disc space-y-1 pl-5">{day.evening.map((x: string) => <li key={x}>{x}</li>)}</ul></div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-blue-100 bg-white p-6 shadow-sm md:sticky md:top-28">
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">Yatra Snapshot</p>
              <div className="mt-4 space-y-4 text-sm">
                <div><span className="text-slate-500">Route</span><p className="mt-1 font-bold text-slate-950">{pkg.destination}</p></div>
                <div><span className="text-slate-500">Pickup</span><p className="mt-1 font-bold text-slate-950">{pkg.pickup}</p></div>
                <div><span className="text-slate-500">Drop</span><p className="mt-1 font-bold text-slate-950">{pkg.drop}</p></div>
                <div><span className="text-slate-500">Best time</span><p className="mt-1 font-bold text-slate-950">{pkg.bestTime}</p></div>
              </div>
              <div className="mt-6 border-t border-slate-100 pt-5">
                <h3 className="font-black text-slate-950">Package Highlights</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-700">{pkg.highlights.map((x: string) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div className="mt-6 rounded-xl bg-blue-50 p-4 text-xs leading-5 text-slate-700">Darshan, aarti, ferry, helicopter, road and weather operations remain subject to official rules and live operating conditions.</div>
              <Link href="/plan-your-trip" className="mt-5 block rounded-xl bg-blue-800 px-5 py-3 text-center text-sm font-extrabold text-white hover:bg-blue-900">Enquire for this Yatra</Link>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
