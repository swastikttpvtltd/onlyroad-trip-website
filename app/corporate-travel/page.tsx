import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BarChart3,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  Headphones,
  MapPinned,
  MessagesSquare,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  WalletCards,
} from "lucide-react";

const services = [
  {
    icon: BriefcaseBusiness,
    title: "Corporate Travel Management",
    description:
      "A single, dependable partner for executive movement, business trips, employee travel and recurring corporate requirements.",
  },
  {
    icon: Users,
    title: "Employee Offsites & Retreats",
    description:
      "Well-planned team getaways with transport, stays, activities and on-ground coordination managed end to end.",
  },
  {
    icon: CalendarDays,
    title: "MICE & Corporate Events",
    description:
      "Meetings, incentives, conferences and events designed around your agenda, guest profile and business objectives.",
  },
  {
    icon: MapPinned,
    title: "Corporate Road Trips",
    description:
      "Premium road travel for leadership teams, dealer meets, branch visits, site inspections and multi-city programs.",
  },
  {
    icon: Building2,
    title: "Business Group Travel",
    description:
      "Coordinated movement for teams of every size, from small leadership groups to large employee and partner programs.",
  },
  {
    icon: Headphones,
    title: "Dedicated Travel Desk",
    description:
      "A responsive point of contact for planning, confirmations, changes, coordination and post-trip support.",
  },
];

const benefits = [
  "Dedicated corporate relationship manager",
  "Customized itineraries and travel programs",
  "GST-ready billing and documentation",
  "Pan-India supplier and ground network",
  "24×7 assistance for active corporate trips",
  "Premium, standard and value-led options",
];

const process = [
  {
    number: "01",
    title: "Share Your Requirement",
    text: "Tell us your destination, dates, group size, travel objective and service expectations.",
  },
  {
    number: "02",
    title: "Receive a Curated Plan",
    text: "Our team builds a practical proposal with routing, stays, transport, activities and commercial options.",
  },
  {
    number: "03",
    title: "Approve & Confirm",
    text: "Once approved, we coordinate confirmations, documentation, payments and the final travel plan.",
  },
  {
    number: "04",
    title: "Travel With Confidence",
    text: "Your dedicated team stays connected throughout the journey for smooth on-ground execution.",
  },
];

const useCases = [
  "Leadership & executive travel",
  "Annual employee offsites",
  "Dealer & channel partner meets",
  "Sales team travel",
  "Conferences & incentive trips",
  "Training & learning programs",
  "Site visits & inspections",
  "Corporate celebrations",
];

export default function CorporateTravelPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Premium hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-blue-100/50 blur-3xl" />
        <div className="absolute -left-40 bottom-0 h-[360px] w-[360px] rounded-full bg-slate-100 blur-3xl" />
        <div className="absolute right-[12%] top-24 h-2 w-2 rounded-full bg-blue-600 shadow-[0_0_0_10px_rgba(37,99,235,0.08)]" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-700">
                <Sparkles size={14} />
                Only Road Trip • Corporate Travel
              </div>

              <h1 className="mt-7 text-4xl font-bold leading-[1.08] tracking-tight text-slate-950 sm:text-5xl lg:text-7xl">
                Corporate travel,
                <span className="block text-blue-700">planned around business.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
                Premium corporate travel solutions for executive movement, employee offsites, MICE programs, road trips and business groups — thoughtfully planned, professionally coordinated and backed by a dedicated travel team.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 rounded-full bg-blue-700 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:-translate-y-0.5 hover:bg-blue-800"
                >
                  Request a Corporate Proposal
                  <ArrowRight size={18} className="transition group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-7 py-4 text-sm font-bold text-slate-800 transition hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
                >
                  Speak to Our Travel Expert
                </Link>
              </div>

              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-sm font-semibold text-slate-600">
                <span className="inline-flex items-center gap-2"><BadgeCheck size={17} className="text-blue-700" /> Business-focused planning</span>
                <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-blue-700" /> Reliable execution</span>
                <span className="inline-flex items-center gap-2"><Headphones size={17} className="text-blue-700" /> Dedicated support</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -inset-5 rounded-[40px] bg-gradient-to-br from-blue-100 via-white to-slate-100 blur-2xl" />
              <div className="relative overflow-hidden rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_25px_80px_rgba(15,23,42,0.12)] sm:p-7">
                <div className="rounded-[24px] bg-gradient-to-br from-blue-950 via-blue-900 to-slate-900 p-7 text-white sm:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-200">Corporate Travel Desk</p>
                      <h2 className="mt-3 text-3xl font-bold leading-tight">One partner.<br />Every journey.</h2>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur">
                      <BriefcaseBusiness size={24} />
                    </div>
                  </div>

                  <div className="mt-9 grid grid-cols-2 gap-3">
                    {[
                      ["Executive Travel", "Premium coordination"],
                      ["MICE Programs", "End-to-end planning"],
                      ["Team Offsites", "Built for groups"],
                      ["Road Trips", "Pan-India movement"],
                    ].map(([title, text]) => (
                      <div key={title} className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm">
                        <p className="text-sm font-bold">{title}</p>
                        <p className="mt-1 text-xs leading-5 text-blue-100">{text}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 rounded-2xl border border-white/10 bg-white/10 p-4">
                    <div className="flex items-center justify-between text-xs font-semibold text-blue-100">
                      <span>Travel program</span>
                      <span>Managed end-to-end</span>
                    </div>
                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full w-[86%] rounded-full bg-blue-300" />
                    </div>
                    <p className="mt-3 text-sm font-semibold">Planning • Coordination • Support</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 divide-x divide-slate-200 pt-5 text-center">
                  <div><p className="text-xl font-bold text-slate-950">PAN India</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Coverage</p></div>
                  <div><p className="text-xl font-bold text-slate-950">24×7</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Trip support</p></div>
                  <div><p className="text-xl font-bold text-slate-950">1 Desk</p><p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-slate-500">Single contact</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-slate-50 py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-700">Built for businesses</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">Travel that works as hard as your team.</h2>
            </div>
            <p className="max-w-3xl text-base leading-8 text-slate-600 sm:text-lg">
              Corporate travel is more than getting people from one place to another. It is about timing, comfort, accountability, budget control and a smooth experience for every traveler. Only Road Trip brings these pieces together through a structured, responsive corporate travel desk.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-700">Our corporate solutions</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">A complete corporate travel ecosystem.</h2>
            <p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">From a single executive journey to a multi-city company program, every service is designed around clarity, comfort and dependable execution.</p>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-700 transition group-hover:bg-blue-700 group-hover:text-white">
                      <Icon size={25} />
                    </div>
                    <ChevronRight size={18} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600" />
                  </div>
                  <h3 className="mt-7 text-xl font-bold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="border-y border-slate-100 bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-700">Why companies choose us</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Professional service, without the complexity.</h2>
              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">Your team should focus on business, not chasing confirmations. We take ownership of the travel coordination so your people can travel with confidence.</p>
              <Link href="/contact" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:text-blue-900">Discuss your corporate travel needs <ArrowRight size={17} /></Link>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                  <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-blue-700" />
                  <span className="text-sm font-semibold leading-6 text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Business use cases */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-700">For every business requirement</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-5xl">Built around the way your company travels.</h2>
              <p className="mt-5 text-base leading-8 text-slate-600">Flexible programs for recurring travel, one-time events and everything in between.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {useCases.map((item, index) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl border border-slate-200 p-5 transition hover:border-blue-200 hover:bg-blue-50/40">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-blue-700">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm font-bold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-slate-950 py-20 text-white lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-blue-300">Simple process</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">From requirement to journey — handled.</h2>
            <p className="mt-5 text-base leading-8 text-slate-400 sm:text-lg">A clear workflow keeps your team informed and your travel program organized.</p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {process.map((item) => (
              <div key={item.number} className="relative rounded-3xl border border-white/10 bg-white/[0.04] p-6">
                <span className="text-sm font-bold text-blue-300">{item.number}</span>
                <h3 className="mt-6 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capability strip */}
      <section className="bg-white py-16">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            [BarChart3, "Cost-conscious planning", "Options aligned to your business budget"],
            [WalletCards, "Clear documentation", "Structured invoices and travel records"],
            [Target, "Purpose-led itineraries", "Plans built around business objectives"],
            [MessagesSquare, "Responsive coordination", "One team to handle changes and support"],
          ].map(([Icon, title, text]) => {
            const CapabilityIcon = Icon as typeof BarChart3;
            return (
              <div key={title as string} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                <CapabilityIcon size={21} className="text-blue-700" />
                <h3 className="mt-4 text-sm font-bold text-slate-950">{title as string}</h3>
                <p className="mt-2 text-xs leading-5 text-slate-500">{text as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-white px-6 pb-20 pt-4 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-[36px] bg-gradient-to-br from-blue-700 via-blue-800 to-slate-950 px-7 py-14 text-center text-white shadow-[0_25px_80px_rgba(30,64,175,0.22)] sm:px-12 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-blue-200">Let&apos;s plan your next program</p>
          <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">Your business has places to be. We&apos;ll make the journey easier.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100 sm:text-lg">Share your corporate travel requirement with us and receive a tailored proposal from the Only Road Trip team.</p>
          <Link href="/contact" className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-100">
            Get a Corporate Quote
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
