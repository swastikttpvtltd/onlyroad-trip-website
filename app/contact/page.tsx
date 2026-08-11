import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Only Road Trip",
  description: "Contact Only Road Trip for travel assistance, tour enquiries, customised domestic holidays and trip planning support.",
  keywords: ["contact Only Road Trip", "travel enquiry India", "tour booking enquiry", "travel assistance", "custom tour enquiry"],
  alternates: { canonical: "https://www.onlyroadtrip.com/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-800 px-6 pb-20 pt-36 text-white sm:pt-40">
        <div className="absolute -right-24 top-10 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-blue-400/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-cyan-200">Travel assistance</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">We’re Here to Help You Travel Better</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-blue-100 sm:text-lg">Have a question about a package, need help choosing a destination, or want to speak with our travel team? Send us your enquiry and we’ll guide you through the next step.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/plan-your-trip" className="rounded-full bg-white px-6 py-3 font-extrabold text-blue-800 shadow-lg">Plan Your Trip</Link>
            <a href="https://wa.me/919211796168" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-white/10 px-6 py-3 font-extrabold text-white backdrop-blur"><MessageCircle size={18}/> WhatsApp Us</a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-14 sm:py-16 lg:grid-cols-[1.05fr_.95fr]">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.10)] sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Send an enquiry</p>
          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">How can we help?</h2>
          <p className="mt-3 leading-7 text-slate-600">Share your details and your question. Our travel team can help with packages, itinerary questions and customised travel planning.</p>
          <form className="mt-8 grid gap-5 sm:grid-cols-2">
            <input required placeholder="Full Name" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input required type="tel" placeholder="Mobile Number" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <input type="email" placeholder="Email Address" className="sm:col-span-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <select className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100"><option>What can we help with?</option><option>Package Enquiry</option><option>Customised Trip</option><option>Booking Assistance</option><option>Existing Trip Support</option><option>General Travel Question</option></select>
            <input placeholder="Destination (optional)" className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <textarea rows={6} placeholder="Your message" className="sm:col-span-2 rounded-xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100" />
            <button type="submit" className="sm:col-span-2 rounded-xl bg-blue-700 px-6 py-4 font-extrabold text-white shadow-lg transition hover:bg-blue-800">Send Enquiry</button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.08)] sm:p-9">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-700">Get in touch</p>
            <h2 className="mt-3 text-3xl font-extrabold">Speak to our travel team.</h2>
            <div className="mt-8 space-y-6">
              <a href="tel:+919211796168" className="flex gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"><Phone className="mt-1 shrink-0 text-blue-700"/><span><b className="block">Call us</b><span className="text-slate-600">+91 92117 96168</span></span></a>
              <a href="mailto:info@onlyroadtrip.com" className="flex gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"><Mail className="mt-1 shrink-0 text-blue-700"/><span><b className="block">Email us</b><span className="text-slate-600">info@onlyroadtrip.com</span></span></a>
              <a href="https://wa.me/919211796168" target="_blank" rel="noopener noreferrer" className="flex gap-4 rounded-2xl border border-slate-200 p-4 transition hover:border-blue-200 hover:bg-blue-50"><MessageCircle className="mt-1 shrink-0 text-blue-700"/><span><b className="block">WhatsApp</b><span className="text-slate-600">Chat with our travel team</span></span></a>
              <div className="flex gap-4 rounded-2xl border border-slate-200 p-4"><MapPin className="mt-1 shrink-0 text-blue-700"/><span><b className="block">Office</b><span className="leading-6 text-slate-600">F163, Phase-1, New Palam Vihar, Gurugram, Haryana 122001</span></span></div>
              <div className="flex gap-4 rounded-2xl border border-slate-200 p-4"><Clock className="mt-1 shrink-0 text-blue-700"/><span><b className="block">Business Hours</b><span className="text-slate-600">Monday – Saturday · 10:00 AM – 8:00 PM<br/>Sunday · By Appointment</span></span></div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-lg">
            <iframe title="Only Road Trip Office Location" src="https://www.google.com/maps?q=F163%20PH-1%20New%20Palam%20Vihar%20Gurugram%20Haryana%20122001&output=embed" width="100%" height="320" loading="lazy" className="border-0" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="px-6 pb-16"><div className="mx-auto max-w-7xl rounded-[2rem] bg-gradient-to-r from-blue-700 to-blue-900 p-8 text-center text-white shadow-2xl sm:p-10"><h2 className="text-3xl font-extrabold">Already know where you want to go?</h2><p className="mx-auto mt-3 max-w-2xl leading-7 text-blue-100">Give us your destination, dates and group details and we’ll help shape the trip around you.</p><Link href="/plan-your-trip" className="mt-6 inline-block rounded-full bg-white px-7 py-3 font-extrabold text-blue-800">Start Planning →</Link></div></section>
    </main>
  );
}