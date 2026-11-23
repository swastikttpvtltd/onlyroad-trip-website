import Link from "next/link";

const journeys = [
  {
    title: "Road trip ideas across India",
    description: "From a weekend escape to a longer holiday, explore routes, stays and itineraries that suit your time and interests. Confirm your pickup point and departure arrangements before booking.",
    href: "/road-trip-packages",
    action: "Explore road trip ideas",
  },
  {
    title: "Corporate travel across India",
    description: "Bring flights, hotels, transfers and team offsites together with one travel team. Plan around your schedule, company travel policy and budget.",
    href: "/corporate-travel",
    action: "Discuss corporate travel",
  },
];

export default function JourneyPlanningLinks() {
  return (
    <section aria-labelledby="journey-planning-heading" className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-800">Plan your journey across India</p>
      <h2 id="journey-planning-heading" className="mt-3 text-3xl font-semibold text-slate-950">Find the right plan for your next journey.</h2>
      <p className="mt-4 max-w-3xl leading-7 text-slate-600">Plan holidays and business travel from Delhi NCR, Gurugram (Gurgaon), Bengaluru (Bangalore), Chennai, Hyderabad, Pune, Mumbai and other major Indian cities. Choose a road trip or tell us what your business needs.</p>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {journeys.map((journey) => (
          <article key={journey.href} className="rounded-3xl border border-slate-200 bg-slate-50 p-7">
            <h3 className="text-xl font-semibold text-slate-950"><Link href={journey.href} className="hover:text-blue-800">{journey.title}</Link></h3>
            <p className="mt-4 leading-7 text-slate-600">{journey.description}</p>
            <Link href={journey.href} className="mt-5 inline-flex font-semibold text-blue-800">{journey.action} →</Link>
          </article>
        ))}
      </div>
    </section>
  );
}
