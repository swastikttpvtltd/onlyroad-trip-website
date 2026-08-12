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
} from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Corporate Flight Booking",
    description:
      "We arrange domestic and international flights for business travellers, keeping schedules, preferred timings and company budgets in mind. From planned trips to last-minute bookings, our team handles the details and helps when plans change.",
  },
  {
    icon: Hotel,
    title: "Corporate Hotel Reservations",
    description:
      "We help companies find comfortable hotels in convenient locations, whether the requirement is for an executive stay, a project team or a larger corporate group. Options can be planned around location, room requirements, meals and budget.",
  },
  {
    icon: Bus,
    title: "Ground Transportation",
    description:
      "Airport transfers, executive cars, SUVs, Tempo Travellers and coaches can all be arranged as part of the same travel plan. We coordinate the vehicles and timings so your employees do not have to manage local transport themselves.",
  },
  {
    icon: Users,
    title: "MICE & Corporate Events",
    description:
      "For meetings, conferences, incentive trips and corporate events, we can manage accommodation, transfers, local movements, sightseeing and other travel arrangements together under one plan.",
  },
  {
    icon: Building2,
    title: "Corporate Offsites & Team Trips",
    description:
      "Planning an employee outing or an offsite? We create practical travel plans for teams of different sizes, with destination selection, hotels, transportation and activities arranged around your schedule and budget.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Dedicated Travel Coordination",
    description:
      "Instead of dealing with different vendors for every booking, your company gets a single point of coordination for the travel requirements we manage. This makes it easier to plan, track and handle changes along the way.",
  },
];

const benefits = [
  "One point of contact for corporate travel requirements",
  "Customised travel plans based on company budgets and policies",
  "GST invoices and organised booking documentation",
  "Hotel and transport options across major Indian destinations",
  "Support with changes, cancellations and last-minute requirements",
  "Travel arrangements for individuals as well as large groups",
];

export default function CorporateTravelPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute right-0 top-0 h-[520px] w-[520px] rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_.9fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-blue-800"><BriefcaseBusiness size={15} />Corporate Travel</div>
              <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 md:text-6xl lg:text-7xl">Corporate travel,<span className="block text-blue-800">handled properly.</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">Managing business travel can take a lot of time, especially when employees are travelling to different cities, plans keep changing and several bookings have to be coordinated at the same time. At Only Road Trip, we take care of these travel arrangements so your team can focus on work.</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">From flights and hotels to airport transfers, meetings, conferences, employee outings and corporate offsites, we can plan the complete travel requirement around your company&apos;s schedule and budget.</p>
              <div className="mt-9 flex flex-wrap gap-4"><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-blue-900">Discuss Your Requirement<ArrowRight size={18} /></Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">Speak to Our Team</Link></div>
            </div>
            <div className="relative"><div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]"><div className="rounded-[24px] bg-slate-950 p-7 text-white md:p-9"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">Corporate Travel Desk</p><h2 className="mt-4 text-3xl font-semibold leading-tight">One team to coordinate your travel.</h2><p className="mt-4 text-sm leading-7 text-slate-300">Whether it is one executive travelling for a meeting or a complete team travelling for an offsite, we keep the different parts of the trip connected.</p><div className="mt-8 space-y-4">{[[CalendarDays,"Planned & last-minute travel"],[MapPinned,"Hotels and transport across India"],[Headphones,"Support when plans change"]].map(([Icon,text])=>{const ItemIcon=Icon as typeof CalendarDays;return <div key={String(text)} className="flex items-center gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300"><ItemIcon size={19}/></div><span className="text-sm font-medium text-slate-200">{String(text)}</span></div>})}</div></div></div></div>
          </div>
        </div>
      </section>
      <section className="py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Corporate Travel Management</p><h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">Your business moves. We manage the journey.</h2></div><div className="space-y-5 text-base leading-8 text-slate-600 md:text-lg"><p>Business travel involves much more than booking a flight or reserving a room. Timings have to match meetings, airport transfers need to be on time, employees may have different requirements and plans can change at short notice.</p><p>We bring these requirements together into one travel plan. Our team works with your requirements, preferred standards and budget to arrange the practical details of the trip. The aim is simple: fewer things for your team to chase and a better organised travel experience for everyone travelling on behalf of your company.</p></div></div></div></section>
      <section className="border-y border-slate-100 bg-slate-50 py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">What We Handle</p><h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">Complete corporate travel support</h2><p className="mt-5 text-lg leading-8 text-slate-600">Tell us what your company needs and we can build the travel arrangements around it. You can use us for one service or coordinate the complete trip through our team.</p></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{services.map((service)=>{const Icon=service.icon;return <div key={service.title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-slate-200/50"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800 transition group-hover:bg-blue-800 group-hover:text-white"><Icon size={23}/></div><h3 className="mt-6 text-xl font-semibold text-slate-950">{service.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{service.description}</p></div>})}</div></div></section>
      <section className="py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-14 lg:grid-cols-2 lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">MICE & Corporate Offsites</p><h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">From business meetings to team getaways.</h2><p className="mt-6 text-lg leading-8 text-slate-600">Corporate trips often involve more moving parts than a normal holiday. A group may need flights, rooming arrangements, airport transfers, local transport, meeting venues, meals and activities — all within a fixed schedule. We can coordinate these requirements into one practical plan.</p><p className="mt-5 text-base leading-7 text-slate-500">Whether you are arranging a dealer meet, leadership retreat, employee outing, incentive trip or a conference, we can help with the travel and logistics around the programme.</p></div><div className="grid gap-4 sm:grid-cols-2">{[["Executive Travel","Comfortable and well-planned arrangements for senior management and business travellers."],["Employee Offsites","Hotels, transport and activities planned around your team size and programme."],["Dealer & Incentive Trips","Travel programmes that combine business requirements with a good experience for participants."],["Meetings & Conferences","Coordinated accommodation, transfers and local movements for business events."]].map(([title,text])=><div key={title} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="font-semibold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{text}</p></div>)}</div></div></div></section>
      <section className="bg-slate-950 py-20 text-white lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-14 lg:grid-cols-[.85fr_1.15fr] lg:items-center"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-300">Why Only Road Trip</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">A travel partner your team can actually rely on.</h2><p className="mt-6 text-base leading-8 text-slate-300 md:text-lg">Every company works differently. Some need strict budgets, some need flexibility and some need a mix of both. We keep the process straightforward and work around the way your business operates rather than forcing every requirement into the same package.</p></div><div className="grid gap-3 sm:grid-cols-2">{benefits.map((item)=><div key={item} className="flex gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5"><CheckCircle className="mt-0.5 shrink-0 text-blue-300" size={20}/><span className="text-sm leading-6 text-slate-200">{item}</span></div>)}</div></div></div></section>
      <section className="py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="text-center"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">How It Works</p><h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">Simple from the first conversation.</h2></div><div className="mt-14 grid gap-5 md:grid-cols-3">{[["01","Share your requirement","Tell us where your team is travelling, how many people are travelling and what kind of arrangements you need."],["02","We plan the travel","Our team works through the flights, hotels, transport and other requirements and puts together suitable options."],["03","We coordinate the trip","Once you confirm the plan, we handle the agreed bookings and remain available for changes or assistance."]].map(([number,title,text])=><div key={number} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"><span className="text-sm font-bold text-blue-700">{number}</span><h3 className="mt-5 text-xl font-semibold text-slate-950">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{text}</p></div>)}</div></div></section>
      <section className="pb-20 lg:pb-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="overflow-hidden rounded-[32px] bg-blue-800 px-7 py-12 text-white md:px-12 md:py-14 lg:px-16"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Let&apos;s Plan Your Next Trip</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Have a corporate travel requirement?</h2><p className="mt-5 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">Share your dates, destination, group size and requirements with us. We&apos;ll discuss the options with you and prepare a travel plan that makes sense for your business.</p></div><Link href="/contact" aria-label="Get a Corporate Quote" className="!inline-flex !w-fit !items-center !gap-2 !rounded-full !bg-white !px-7 !py-3.5 !text-sm !font-bold !text-blue-900 !no-underline shadow-sm transition hover:!bg-blue-50 hover:!text-blue-900"><span>Get a Corporate Quote</span><ArrowRight size={18} aria-hidden="true"/></Link></div></div></div></section>
    </main>
  );
}
