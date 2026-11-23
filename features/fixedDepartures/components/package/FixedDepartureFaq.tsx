"use client";
import { useState } from "react";
import { MapPinned, Plane, Hotel, CreditCard, RotateCcw, ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import type { DepartureFaqGroup } from "@/features/fixedDepartures/data/fixedDepartureFaqs";

export default function FixedDepartureFaq({ groups }: { groups: DepartureFaqGroup[] }) {
  const [active, setActive] = useState(0);
  const group = groups[active];
  const icons = [MapPinned, Plane, Hotel, CreditCard, RotateCcw];
  if (!group) return null;
  return <section id="faqs" className="mt-7 rounded-2xl bg-white p-6 shadow-sm md:p-7">
    <h2 className="text-2xl font-extrabold">Frequently Asked Questions</h2>
    <p className="mt-3 text-sm leading-7 text-slate-600">Choose a section, then open a question to read the details.</p>
    <div className="mt-6 grid gap-6 lg:grid-cols-[290px_minmax(0,1fr)]">
      <nav aria-label="FAQ sections" className="flex gap-3 overflow-x-auto rounded-2xl bg-slate-50 p-3 lg:flex-col lg:self-start lg:overflow-visible">{groups.map((item, i) => {
        const Icon = icons[i] ?? MapPinned;
        const selected = active === i;
        return <button key={item.title} type="button" aria-pressed={selected} aria-controls="faq-questions" onClick={() => setActive(i)} className={`group flex w-[240px] shrink-0 items-center gap-3 rounded-xl border p-4 text-left transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 motion-reduce:transition-none lg:w-full ${selected ? "border-orange-200 bg-white shadow-[0_4px_18px_rgba(15,23,42,0.07)]" : "border-transparent bg-transparent hover:border-slate-200 hover:bg-white"}`}><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-colors ${selected ? "bg-orange-500 text-white" : "bg-white text-slate-500 group-hover:text-orange-600"}`}><Icon aria-hidden="true" size={19} strokeWidth={1.7} /></span><span className="min-w-0 flex-1"><span className={`block text-sm font-bold leading-5 ${selected ? "text-slate-950" : "text-slate-600"}`}>{item.title}</span><span className="mt-1 block text-xs text-slate-500">{item.items.length} questions</span></span><ChevronRight aria-hidden="true" size={16} className={selected ? "shrink-0 text-orange-500" : "shrink-0 text-slate-300"} /></button>;
      })}</nav>
      <div id="faq-questions" aria-live="polite" className="min-w-0"><div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4"><h3 className="text-xl font-bold tracking-tight">{group.title}</h3><span className="shrink-0 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">{group.items.length} answers</span></div><div key={group.title} className="space-y-3">{group.items.map(item => <details key={item.question} className="group rounded-xl border border-slate-200/80 bg-white p-4 transition-colors open:border-orange-200 open:bg-orange-50/30 sm:p-5"><summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold leading-7 text-slate-900 [&::-webkit-details-marker]:hidden"><span>{item.question}</span><Plus aria-hidden="true" size={18} className="mt-1 shrink-0 text-orange-500 transition-transform group-open:rotate-45 motion-reduce:transition-none" /></summary><div className="mt-4 space-y-3 text-sm leading-7 text-slate-600">{item.rows && <div className="overflow-x-auto"><table className="w-full text-left"><caption className="mb-2 text-left font-semibold">Indicative cancellation charges</caption><thead><tr className="bg-slate-50"><th scope="col" className="p-3">When cancelled before departure</th><th scope="col" className="p-3">Charge on total booking amount</th></tr></thead><tbody>{item.rows.map(([period, charge]) => <tr key={period} className="border-t border-slate-200"><td className="p-3">{period}</td><td className="p-3 font-bold">{charge}</td></tr>)}</tbody></table></div>}{item.paragraphs.map(text => <p key={text}>{text}</p>)}</div></details>)}</div></div>
    </div>
    <div className="mt-7 border-t border-slate-200 pt-5 text-sm leading-7 text-slate-600"><p>Read the complete policies for your booking:</p><div className="mt-2 flex flex-wrap gap-x-5 gap-y-2 font-semibold text-blue-800"><Link href="/booking-policy" className="underline">Booking Policy</Link><Link href="/cancellation-policy" className="underline">Cancellation Policy</Link><Link href="/refund-policy" className="underline">Refund Policy</Link><Link href="/contact" className="underline">Contact support</Link></div></div>
  </section>;
}
