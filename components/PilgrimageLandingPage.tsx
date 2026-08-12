import Link from "next/link";
import { ArrowRight, CheckCircle2, Headphones, MapPinned, ShieldCheck, Sparkles, Users } from "lucide-react";

type Variant = "kashi" | "ayodhya";

type Config = {
  badge: string;
  title: string;
  accent: string;
  intro: string;
  secondary: string;
  cta: string;
  points: string[];
  label: string;
  sectionTitle: string;
  sectionText: string;
  services: { title: string; text: string }[];
  benefits: string[];
  faqs: { question: string; answer: string }[];
};

const configs: Record<Variant, Config> = {
  kashi: {
    badge: "Kashi Yatra Packages",
    title: "Kashi Yatra Package from Delhi",
    accent: "A spiritual journey, thoughtfully planned.",
    intro: "Plan your Kashi Vishwanath and Varanasi pilgrimage with a customized itinerary, comfortable stays, reliable transport and end-to-end travel coordination from Only Road Trip.",
    secondary: "Choose a suitable duration and departure point for your family, couple or group. We can also combine Kashi with Ayodhya and Prayagraj for a complete spiritual circuit.",
    cta: "Get Kashi Yatra Quote",
    points: ["Delhi, Lucknow and Varanasi route options", "Kashi Vishwanath, Ganga Aarti and local sightseeing", "Family, senior-citizen and group travel support"],
    label: "Kashi Vishwanath & Varanasi Travel",
    sectionTitle: "Experience Kashi with a clear and comfortable plan.",
    sectionText: "A Kashi Yatra is more than reaching Varanasi. Temple visits, Ganga Aarti, local sightseeing, transfers and hotel timings all need to work together. We coordinate the practical details around your dates and travel preferences.",
    services: [
      { title: "Customized Kashi Itinerary", text: "Plan the number of nights, departure point, temple visits and sightseeing around your family's pace." },
      { title: "Kashi Vishwanath Darshan Planning", text: "We help structure your travel schedule around the temple visit and other planned spiritual experiences." },
      { title: "Ganga Aarti Experience", text: "Include a suitable Varanasi evening plan around the Ganga Aarti and nearby attractions." },
      { title: "Ayodhya & Prayagraj Add-On", text: "Combine Kashi with Ayodhya and Prayagraj to create a wider Uttar Pradesh spiritual circuit." },
      { title: "Comfortable Transport", text: "Choose suitable cars, SUVs or Tempo Travellers depending on group size and route." },
      { title: "Senior-Friendly Planning", text: "Discuss shorter daily schedules, practical hotel locations and additional rest time for senior travelers." },
    ],
    benefits: ["Customized dates and route planning", "Clear itinerary before booking", "Comfort-focused vehicle and hotel options", "Family and senior-citizen travel support", "Option to combine Kashi, Ayodhya and Prayagraj", "Travel coordination before and during the agreed trip"],
    faqs: [
      { question: "Can I book a Kashi Yatra package from Delhi?", answer: "Yes. We can plan a Kashi Yatra from Delhi with suitable road or other travel arrangements based on your dates, group size and preferences." },
      { question: "Can Kashi be combined with Ayodhya and Prayagraj?", answer: "Yes. Kashi, Ayodhya and Prayagraj can be combined into a customized spiritual circuit depending on the available travel time." },
      { question: "Can you plan a Kashi trip for senior citizens?", answer: "Yes. We can discuss a slower itinerary, practical accommodation locations and suitable transport. Individual fitness and medical considerations should always be assessed before travel." },
    ],
  },
  ayodhya: {
    badge: "Ayodhya Yatra Packages",
    title: "Ayodhya Yatra Package from Delhi",
    accent: "A meaningful spiritual journey, planned your way.",
    intro: "Book a customized Ayodhya Yatra with comfortable transport, hotel coordination, temple and local sightseeing planning and dedicated travel support from Only Road Trip.",
    secondary: "Plan Ayodhya as a standalone pilgrimage or combine it with Kashi and Prayagraj for a complete spiritual journey across Uttar Pradesh.",
    cta: "Get Ayodhya Quote",
    points: ["Delhi, Lucknow and Ayodhya route options", "Ram Mandir, Hanuman Garhi, Saryu and local sightseeing", "Family, senior-citizen and group travel support"],
    label: "Ayodhya Dham Travel Planning",
    sectionTitle: "Plan Ayodhya without the travel stress.",
    sectionText: "Ayodhya has become an important pilgrimage destination with several spiritual and cultural places to experience. We bring transport, accommodation, sightseeing and your preferred travel pace into one practical itinerary.",
    services: [
      { title: "Customized Ayodhya Itinerary", text: "Choose your departure city, number of nights, sightseeing preferences and travel pace." },
      { title: "Ram Mandir Visit Planning", text: "Structure the itinerary around your planned Ram Mandir visit and other important Ayodhya attractions." },
      { title: "Saryu & Evening Experience", text: "Include Saryu riverfront visits and an evening schedule according to your travel plan." },
      { title: "Kashi & Prayagraj Extension", text: "Combine Ayodhya with Kashi and Prayagraj for a multi-destination spiritual circuit." },
      { title: "Family & Group Transport", text: "Arrange suitable cars, SUVs, Tempo Travellers or larger vehicles according to group size." },
      { title: "Senior-Friendly Travel", text: "Discuss convenient hotel locations, rest breaks and a comfortable sightseeing pace for older travelers." },
    ],
    benefits: ["Customized departure dates and route", "Clear day-wise itinerary", "Comfort-focused hotels and transport", "Family and senior-citizen support", "Ayodhya + Kashi + Prayagraj combination options", "Personalized travel coordination"],
    faqs: [
      { question: "Can I book an Ayodhya Yatra package from Delhi?", answer: "Yes. We can plan an Ayodhya Yatra from Delhi with suitable transport, accommodation and sightseeing arrangements based on your requirements." },
      { question: "Can Ayodhya be combined with Kashi?", answer: "Yes. Ayodhya and Kashi can be combined in one customized itinerary, and Prayagraj can also be added when the travel duration allows." },
      { question: "Do you arrange Ayodhya group tours?", answer: "Yes. We can plan family groups, friends, community groups and larger pilgrimage groups with suitable transport and accommodation." },
    ],
  },
};

export default function PilgrimageLandingPage({ variant }: { variant: Variant }) {
  const c = configs[variant];
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute -right-24 top-0 h-[520px] w-[520px] rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-slate-100 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8 lg:pb-28 lg:pt-40">
          <div className="grid items-center gap-14 lg:grid-cols-[1.12fr_.88fr]">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-blue-800"><Sparkles size={15} />{c.badge}</div>
              <h1 className="mt-7 text-5xl font-semibold leading-[1.05] tracking-tight text-slate-950 md:text-6xl lg:text-7xl">{c.title}<span className="mt-3 block text-blue-800">{c.accent}</span></h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl">{c.intro}</p>
              <p className="mt-4 max-w-2xl text-base leading-7 text-slate-500">{c.secondary}</p>
              <div className="mt-9 flex flex-wrap gap-4"><Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-800 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-900/10 transition hover:bg-blue-900">{c.cta}<ArrowRight size={18} /></Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">Speak to Our Team</Link></div>
            </div>
            <div className="rounded-[32px] border border-slate-200 bg-white p-5 shadow-[0_25px_70px_rgba(15,23,42,0.10)]"><div className="rounded-[24px] bg-slate-950 p-7 text-white md:p-9"><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-300">{c.label}</p><h2 className="mt-4 text-3xl font-semibold leading-tight">Your pilgrimage, coordinated in one plan.</h2><div className="mt-8 space-y-4">{c.points.map((item) => <div key={item} className="flex items-start gap-4 border-t border-white/10 pt-4 first:border-t-0 first:pt-0"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-blue-300"><MapPinned size={19} /></div><span className="text-sm font-medium leading-6 text-slate-200">{item}</span></div>)}</div></div></div>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">{c.label}</p><h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">{c.sectionTitle}</h2></div><p className="text-base leading-8 text-slate-600 md:text-lg">{c.sectionText}</p></div></div></section>

      <section className="border-y border-slate-100 bg-slate-50 py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">What We Handle</p><h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">Complete pilgrimage travel support</h2></div><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{c.services.map((s) => <div key={s.title} className="group rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-800"><CheckCircle2 size={23} /></div><h3 className="mt-6 text-xl font-semibold text-slate-950">{s.title}</h3><p className="mt-3 text-sm leading-7 text-slate-600">{s.text}</p></div>)}</div></div></section>

      <section className="py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-10 lg:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Why Only Road Trip</p><h2 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 md:text-5xl">A pilgrimage plan built around your family.</h2><p className="mt-6 text-lg leading-8 text-slate-600">We focus on practical travel planning, comfortable movement and clear communication so your family can spend less time coordinating logistics and more time experiencing the journey.</p></div><div className="grid gap-3 sm:grid-cols-2">{c.benefits.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={20} /><span className="text-sm leading-6 text-slate-700">{item}</span></div>)}</div></div></div></section>

      <section className="border-y border-slate-100 bg-slate-50 py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-5 md:grid-cols-3"><div className="rounded-3xl border border-slate-200 bg-white p-7"><Users className="text-blue-700" /><h3 className="mt-5 text-xl font-semibold">Family & Groups</h3><p className="mt-3 text-sm leading-7 text-slate-600">Suitable arrangements for families, friends and organized pilgrimage groups.</p></div><div className="rounded-3xl border border-slate-200 bg-white p-7"><ShieldCheck className="text-blue-700" /><h3 className="mt-5 text-xl font-semibold">Practical Planning</h3><p className="mt-3 text-sm leading-7 text-slate-600">Clear routes, stays and transport options discussed before you confirm the trip.</p></div><div className="rounded-3xl border border-slate-200 bg-white p-7"><Headphones className="text-blue-700" /><h3 className="mt-5 text-xl font-semibold">Travel Support</h3><p className="mt-3 text-sm leading-7 text-slate-600">Responsive coordination for the travel arrangements handled by our team.</p></div></div></div></section>

      <section className="py-20 lg:py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-700">Frequently Asked Questions</p><h2 className="mt-4 text-4xl font-semibold text-slate-950 md:text-5xl">Before you plan your yatra</h2></div><div className="mt-10 space-y-4">{c.faqs.map((faq) => <details key={faq.question} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><summary className="cursor-pointer list-none pr-8 text-base font-semibold text-slate-950">{faq.question}</summary><p className="mt-4 max-w-4xl text-sm leading-7 text-slate-600">{faq.answer}</p></details>)}</div></div></section>

      <section className="pb-20 lg:pb-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="overflow-hidden rounded-[32px] bg-blue-800 px-7 py-12 text-white md:px-12 lg:px-16"><div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.24em] text-blue-200">Plan Your Yatra</p><h2 className="mt-4 text-4xl font-semibold leading-tight md:text-5xl">Ready to plan your pilgrimage?</h2><p className="mt-5 text-base leading-7 text-blue-100 md:text-lg">Share your dates, departure city, group size and requirements. We will prepare suitable travel options for you.</p></div><Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-bold text-blue-900 shadow-sm transition hover:bg-blue-50">Get Your Quote<ArrowRight size={18} /></Link></div></div></div></section>
    </main>
  );
}
