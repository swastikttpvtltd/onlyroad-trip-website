import Link from "next/link";
import {
  BriefcaseBusiness,
  Building2,
  Plane,
  Hotel,
  Bus,
  Users,
  CheckCircle,
  ArrowRight,
  CalendarDays,
  MapPinned,
  Headphones,
  Clock3,
  ShieldCheck,
  IndianRupee,
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Corporate Flight Booking",
    description:
      "Domestic and international flight arrangements planned around business schedules, preferred timings and company budgets, including help when plans change.",
  },
  {
    icon: Hotel,
    title: "Corporate Hotel Reservations",
    description:
      "Comfortable hotels in practical locations for executives, project teams and larger groups, with options based on room needs, meals and budget.",
  },
  {
    icon: Bus,
    title: "Ground Transportation",
    description:
      "Airport transfers, executive cars, SUVs, Tempo Travellers and coaches coordinated with the rest of the trip so local transport stays organised.",
  },
  {
    icon: Users,
    title: "MICE & Corporate Events",
    description:
      "Travel support for meetings, conferences, incentive programmes and corporate events, including accommodation, transfers and local movements.",
  },
  {
    icon: Building2,
    title: "Corporate Offsites & Team Trips",
    description:
      "Practical travel plans for employee outings and offsites, with destinations, hotels, transport and activities arranged around your programme.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Dedicated Travel Coordination",
    description:
      "A single point of coordination for the travel arrangements we manage, making it easier for your team to plan, track and handle changes.",
  },
];

const benefits = [
  "One point of contact for corporate travel requirements",
  "Travel plans built around company budgets and policies",
  "GST invoices and organised booking documentation",
  "Hotel and transport options across major Indian destinations",
  "Support with changes, cancellations and last-minute requirements",
  "Arrangements for individual travellers as well as large groups",
];

const process = [
  [
    "01",
    "Share your requirement",
    "Tell us where your team is travelling, how many people are travelling and what kind of arrangements you need.",
  ],
  [
    "02",
    "We plan the travel",
    "We work through flights, hotels, transport and other requirements and put together suitable options.",
  ],
  [
    "03",
    "We coordinate the trip",
    "Once you confirm the plan, we handle the agreed bookings and remain available for changes or assistance.",
  ],
];

export default function CorporateTravelPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute right-[-180px] top-[-160px] h-[620px] w-[620px] rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute bottom-[-120px] left-[-160px] h-[420px] w-[420px] rounded-full bg-slate-100 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-28 lg:px-8 lg:pb-28 lg:pt-36">
          <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_.92fr] lg:gap-20">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-800">
                <BriefcaseBusiness size={15} />
                Corporate Travel
              </div>

              <h1 className="mt-7 max-w-3xl text-5xl font-semibold leading-[1.03] tracking-[-0.035em] text-slate-950 md:text-6xl lg:text-[72px]">
                Corporate travel,
                <span className="block text-blue-800">handled properly.</span>
              </h1>

              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
                Managing business travel can take a lot of time, especially when employees are travelling to different cities, plans keep changing and several bookings have to be coordinated at the same time. At Only Road Trip, we take care of these arrangements so your team can focus on work.
              </p>

              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500 md:text-[17px]">
                From flights and hotels to airport transfers, meetings, conferences, employee outings and corporate offsites, we can plan the travel requirement around your company&apos;s schedule and budget.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-900"
                >
                  Discuss Your Requirement
                  <ArrowRight size={18} />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-4 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50"
                >
                  Speak to Our Team
                </Link>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-2"><ShieldCheck size={16} className="text-blue-700" /> Organised documentation</span>
                <span className="inline-flex items-center gap-2"><Clock3 size={16} className="text-blue-700" /> Support when plans change</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl border border-blue-100 bg-blue-50/80" />
              <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-3xl border border-slate-100 bg-slate-50/90" />

              <div className="relative rounded-[34px] border border-slate-200 bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
                <div className="overflow-hidden rounded-[26px] bg-slate-950 p-7 text-white md:p-9">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300">Corporate Travel Desk</p>
                      <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">One team to coordinate your travel.</h2>
                    </div>
                    <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-blue-300 sm:flex">
                      <BriefcaseBusiness size={22} />
                    </div>
                  </div>

                  <p className="mt-5 max-w-md text-sm leading-7 text-slate-300">
                    Whether it is one executive travelling for a meeting or a complete team travelling for an offsite, we keep the different parts of the trip connected.
                  </p>

                  <div className="mt-8 space-y-3">
                    {[
                      [CalendarDays, "Planned & last-minute travel"],
                      [MapPinned, "Hotels and transport across India"],
                      [Headphones, "Support when plans change"],
                    ].map(([Icon, text]) => {
                      const ItemIcon = Icon as typeof CalendarDays;
                      return (
                        <div key={String(text)} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-300">
                            <ItemIcon size={19} />
                          </div>
                          <span className="text-sm font-medium text-slate-200">{text}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 grid grid-cols-2 gap-3 border-t border-white/10 pt-6">
                    <div>
                      <p className="text-2xl font-semibold">1:1</p>
                      <p className="mt-1 text-xs text-slate-400">Travel coordination</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">PAN India</p>
                      <p className="mt-1 text-xs text-slate-400">Travel support</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.78fr_1.22fr] lg:items-start lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">Corporate Travel Management</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-5xl">
                Your business moves. We manage the journey.
              </h2>
            </div>
            <div className="space-y-5 text-base leading-8 text-slate-600 md:text-lg">
              <p>
                Business travel involves much more than booking a flight or reserving a room. Timings have to match meetings, airport transfers need to be on time, employees may have different requirements and plans can change at short notice.
              </p>
              <p>
                We bring these requirements together into one travel plan. Our team works with your requirements, preferred standards and budget to arrange the practical details of the trip. The aim is simple: fewer things for your team to chase and a better organised travel experience for everyone travelling on behalf of your company.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="border-y border-slate-100 bg-slate-50 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">What We Handle</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Complete corporate travel support</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">
                Tell us what your company needs and we can build the travel arrangements around it. You can use us for one service or coordinate the complete trip through our team.
              </p>
            </div>
            <span className="hidden rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs font-semibold text-slate-500 lg:inline-flex">Flights • Hotels • Transport • MICE</span>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="group relative overflow-hidden rounded-[28px] border border-slate-200 bg-white p-7 shadow-[0_8px_30px_rgba(15,23,42,0.035)] transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(15,23,42,0.08)] md:p-8">
                  <span className="absolute right-7 top-7 text-xs font-bold text-slate-300">0{index + 1}</span>
                  <div className="flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition group-hover:bg-blue-800 group-hover:text-white">
                    <Icon size={23} />
                  </div>
                  <h3 className="mt-7 pr-10 text-xl font-semibold text-slate-950">{service.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-slate-600">{service.description}</p>
                  <div className="mt-6 h-px w-10 bg-blue-200 transition-all duration-300 group-hover:w-16 group-hover:bg-blue-800" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* MICE / Offsites */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">MICE & Corporate Offsites</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight text-slate-950 md:text-5xl">From business meetings to team getaways.</h2>
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Corporate trips often involve more moving parts than a normal holiday. A group may need flights, rooming arrangements, airport transfers, local transport, meeting venues, meals and activities — all within a fixed schedule. We can coordinate these requirements into one practical plan.
              </p>
              <p className="mt-5 text-base leading-7 text-slate-500">
                Whether you are arranging a dealer meet, leadership retreat, employee outing, incentive trip or a conference, we can help with the travel and logistics around the programme.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                ["Executive Travel", "Comfortable and well-planned arrangements for senior management and business travellers.", Plane],
                ["Employee Offsites", "Hotels, transport and activities planned around your team size and programme.", Users],
                ["Dealer & Incentive Trips", "Travel programmes that combine business requirements with a good experience for participants.", IndianRupee],
                ["Meetings & Conferences", "Coordinated accommodation, transfers and local movements for business events.", Building2],
              ].map(([title, text, Icon]) => {
                const CardIcon = Icon as typeof Plane;
                return (
                  <div key={String(title)} className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-blue-800"><CardIcon size={20} /></div>
                    <h3 className="mt-5 font-semibold text-slate-950">{title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="relative overflow-hidden bg-slate-950 py-20 text-white lg:py-28">
        <div className="absolute right-[-180px] top-[-180px] h-[480px] w-[480px] rounded-full bg-blue-900/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:gap-20">
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-300">Why Only Road Trip</p>
              <h2 className="mt-4 text-4xl font-semibold leading-[1.08] tracking-tight md:text-5xl">A travel partner your team can actually rely on.</h2>
              <p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">
                Every company works differently. Some need strict budgets, some need flexibility and some need a mix of both. We keep the process straightforward and work around the way your business operates rather than forcing every requirement into the same package.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {benefits.map((item) => (
                <div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.045] p-5 transition hover:border-blue-400/30 hover:bg-white/[0.07]">
                  <CheckCircle className="mt-0.5 shrink-0 text-blue-300" size={20} />
                  <span className="text-sm leading-6 text-slate-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">How It Works</p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 md:text-5xl">Simple from the first conversation.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">A straightforward process without making your team chase multiple vendors.</p>
          </div>

          <div className="relative mt-14 grid gap-5 md:grid-cols-3">
            <div className="absolute left-[16.66%] right-[16.66%] top-9 hidden h-px bg-slate-200 md:block" />
            {process.map(([number, title, text]) => (
              <div key={number} className="relative rounded-[28px] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
                <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-800 text-sm font-bold text-white shadow-lg shadow-blue-900/15">{number}</span>
                <h3 className="mt-6 text-xl font-semibold text-slate-950">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[36px] bg-blue-800 px-7 py-12 text-white shadow-[0_25px_70px_rgba(30,64,175,0.18)] md:px-12 md:py-14 lg:px-16 lg:py-16">
            <div className="absolute right-[-80px] top-[-120px] h-80 w-80 rounded-full bg-white/10 blur-2xl" />
            <div className="relative grid gap-9 lg:grid-cols-[1fr_auto] lg:items-center">
              <div className="max-w-3xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-200">Let&apos;s Plan Your Next Trip</p>
                <h2 className="mt-4 text-4xl font-semibold leading-[1.08] md:text-5xl">Have a corporate travel requirement?</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
                  Share your dates, destination, group size and requirements with us. We&apos;ll discuss the options with you and prepare a travel plan that makes sense for your business.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-bold text-blue-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-slate-50"
              >
                Get a Corporate Quote
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
