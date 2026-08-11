import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Only Road Trip | Travel Assistance & Enquiries",
  description: "Contact Only Road Trip for tour enquiries, travel assistance, customised domestic holidays, pilgrimage journeys and group travel.",
  keywords: ["contact Only Road Trip", "travel enquiry", "tour booking enquiry", "travel assistance", "travel agency Gurugram"],
  alternates: { canonical: "https://www.onlyroadtrip.com/contact" },
};

const details = [
  { icon: Phone, label: "Call us", value: "+91 92117 96168", href: "tel:+919211796168" },
  { icon: Mail, label: "Email us", value: "info@onlyroadtrip.com", href: "mailto:info@onlyroadtrip.com" },
  { icon: MapPin, label: "Visit us", value: "New Palam Vihar, Gurugram, Haryana - 122001", href: "#map" },
  { icon: Clock, label: "Working hours", value: "Monday – Saturday · 10:00 AM – 8:00 PM", href: "#" },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 pb-24 pt-36 text-white sm:pt-40">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Travel assistance & enquiries</p>
          <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">Let’s plan your next journey.</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">Have a question, need help with an existing enquiry, or want to speak with a travel expert? Our team is here to make the next step simple.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/plan-your-trip" className="rounded-full bg-white px-6 py-3 font-bold text-blue-800 shadow-lg transition hover:bg-cyan-50">Plan Your Trip</Link>
            <a href="https://wa.me/919211796168" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20"><MessageCircle size={18}/> WhatsApp</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.05fr_.95fr] lg:py-20">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Send an enquiry</p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl">Tell us how we can help.</h2>
          <p className="mt-3 leading-7 text-slate-600">Share a few details and our travel team will get back to you with the right guidance.</p>
          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <input required placeholder="Full Name" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input required type="tel" placeholder="Mobile Number" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input type="email" placeholder="Email Address" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input placeholder="Destination / Package" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <textarea rows={5} placeholder="How can we help you?" className="sm:col-span-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <button type="submit" className="sm:col-span-2 rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white shadow-lg transition hover:bg-blue-800">Send Message</button>
          </form>
        </div>

        <div className="space-y-5">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7 sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Get in touch</p>
            <h2 className="mt-3 text-3xl font-extrabold">Real people. Real travel support.</h2>
            <p className="mt-3 leading-7 text-slate-600">Speak with our team about customised holidays, pilgrimage journeys, road trips, family travel and group requirements.</p>
            <div className="mt-8 space-y-5">
              {details.map(({icon: Icon,label,value,href})=><a key={label} href={href} className="flex gap-4 rounded-2xl bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-50 text-blue-700"><Icon size={20}/></span><span><span className="block text-sm font-bold text-slate-500">{label}</span><span className="mt-1 block font-semibold text-slate-900">{value}</span></span></a>)}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <a href="https://wa.me/919211796168" target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-green-600 px-4 py-4 text-center font-bold text-white transition hover:bg-green-700">WhatsApp</a>
            <a href="tel:+919211796168" className="rounded-2xl bg-blue-700 px-4 py-4 text-center font-bold text-white transition hover:bg-blue-800">Call Now</a>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl"><div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Our office</p><h2 className="mt-2 text-3xl font-extrabold">Come and meet us</h2></div><Link href="/plan-your-trip" className="font-bold text-blue-700 hover:text-blue-900">Prefer to plan online? →</Link></div><div id="map" className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-xl"><iframe title="Only Road Trip Office Location" src="https://www.google.com/maps?q=F163%20PH-1%20New%20Palam%20Vihar%20Gurugram%20Haryana%20122001&output=embed" width="100%" height="420" loading="lazy" className="border-0" referrerPolicy="no-referrer-when-downgrade" /></div></div>
      </section>
    </main>
  );
}
