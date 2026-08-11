import { ArrowRight, CheckCircle2, Clock3, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import type { Metadata } from "next";
import { sendTripEnquiry } from "./actions";
import CountryPhoneField from "./CountryPhoneField";
import DestinationSearch from "./DestinationSearch";

export const metadata: Metadata = {
  title: "Contact & Plan Your Trip | Only Road Trip",
  description:
    "Plan your next journey with Only Road Trip. Share your destination, dates and travel requirements and our team will help build a practical travel plan for you.",
  keywords: ["contact Only Road Trip", "plan your trip", "travel enquiry", "custom travel packages", "tour booking"],
  alternates: { canonical: "https://www.onlyroadtrip.com/contact" },
  openGraph: {
    title: "Contact & Plan Your Trip | Only Road Trip",
    description: "Tell us about your trip and let Only Road Trip help you plan the journey.",
    url: "https://www.onlyroadtrip.com/contact",
    siteName: "Only Road Trip",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Plan your trip with Only Road Trip" }],
  },
};

const planningPoints = [
  "Custom itineraries built around your dates and budget",
  "Domestic holidays, pilgrimage tours and road trips across India",
  "Comfortable hotels and practical transportation options",
  "Support for families, couples, senior citizens and groups",
  "Corporate travel, offsites and MICE arrangements",
  "One team to coordinate the travel arrangements we manage",
];

type ContactPageProps = {
  searchParams: Promise<{ submitted?: string; error?: string }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-white">
        <div className="absolute right-[-180px] top-[-220px] h-[620px] w-[620px] rounded-full bg-blue-50 blur-3xl" />
        <div className="absolute bottom-[-180px] left-[-160px] h-[420px] w-[420px] rounded-full bg-slate-100 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 pb-16 pt-28 lg:px-8 lg:pb-24 lg:pt-36">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-blue-800">Plan Your Trip</span>
              <h1 className="mt-6 text-5xl font-semibold leading-[1.04] tracking-[-0.035em] text-slate-950 md:text-6xl lg:text-[72px]">
                Tell us where you want to go.
                <span className="block text-blue-800">We&apos;ll help plan the rest.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-600 md:text-xl md:leading-9">
                Every trip is a little different. Tell us your destination, travel dates, number of travellers and what you have in mind. Our team will look at the details and help you put together a travel plan that works for you.
              </p>
              <div className="mt-8 flex flex-wrap gap-3 text-sm font-medium text-slate-600">
                <span className="inline-flex items-center gap-2"><ShieldCheck size={17} className="text-blue-700" />Personalised planning</span>
                <span className="inline-flex items-center gap-2"><Clock3 size={17} className="text-blue-700" />Quick response</span>
              </div>
            </div>
            <div className="relative mx-auto w-full max-w-[500px]">
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-3xl border border-blue-100 bg-blue-50/80" />
              <div className="absolute -bottom-4 -left-4 h-28 w-28 rounded-3xl border border-slate-100 bg-slate-50/90" />
              <div className="relative rounded-[34px] border border-slate-200 bg-white p-3 shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
                <div className="rounded-[27px] bg-slate-950 p-7 text-white md:p-9">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-blue-300">Travel Planning Desk</p>
                  <h2 className="mt-3 text-3xl font-semibold leading-tight md:text-4xl">Start with a conversation.</h2>
                  <p className="mt-5 text-sm leading-7 text-slate-300">You do not need to have the whole trip figured out before contacting us. Share whatever details you have and we can take it from there.</p>
                  <div className="mt-7 space-y-3">
                    {["Destination and approximate dates", "Number of travellers and trip type", "Budget, hotel or transport preferences"].map((item) => (
                      <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-blue-300" />
                        <span className="text-sm leading-6 text-slate-200">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr] lg:items-start lg:gap-16">
            <div className="rounded-[32px] border border-slate-200 bg-white p-7 shadow-[0_18px_60px_rgba(15,23,42,0.07)] md:p-10">
              <div className="max-w-2xl">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">Trip Enquiry</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-950 md:text-4xl">Let&apos;s plan your trip</h2>
                <p className="mt-4 text-base leading-7 text-slate-600">Fill in the details below. The more you tell us, the better we can understand what you are looking for and suggest suitable options.</p>
              </div>

              {params.submitted === "1" && (
                <div className="mt-7 rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-800">
                  Thank you. Your trip enquiry has been sent successfully. Our team will contact you shortly.
                </div>
              )}
              {params.error && (
                <div className="mt-7 rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm font-semibold text-red-800">
                  We could not send your enquiry right now. Please try again or call/WhatsApp our team directly.
                </div>
              )}

              <form action={sendTripEnquiry} className="mt-9 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-sm font-semibold text-slate-800">Name</span>
                    <div className="grid grid-cols-[82px_1fr] gap-2">
                      <select name="title" defaultValue="Mr" aria-label="Title" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-2.5 py-3.5 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50">
                        <option value="Mr">Mr.</option>
                        <option value="Mrs">Mrs.</option>
                        <option value="Ms">Ms.</option>
                      </select>
                      <input name="name" required type="text" placeholder="Your name" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50" />
                    </div>
                  </label>
                  <div className="[&>div>div>button[aria-haspopup='listbox']]:!w-[96px] [&>div>div>button[aria-haspopup='listbox']]:!px-3">
                    <CountryPhoneField />
                  </div>
                </div>
                <div className="grid gap-5 md:grid-cols-2">
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">Email Address</span><input name="email" required type="email" placeholder="you@example.com" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50" /></label>
                  <DestinationSearch />
                </div>
                <div className="grid gap-5 md:grid-cols-3">
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">Travel Date</span><input name="travelDate" type="date" min={today} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50" /></label>
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">Travellers</span><select name="travellers" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"><option value="" disabled>Select</option><option>1 Traveller</option><option>2 Travellers</option><option>3–5 Travellers</option><option>6–10 Travellers</option><option>10+ Travellers</option></select></label>
                  <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">Trip Type</span><select name="tripType" defaultValue="" className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-700 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50"><option value="" disabled>Select</option><option>Family Holiday</option><option>Couple / Honeymoon</option><option>Pilgrimage</option><option>Road Trip</option><option>Corporate / MICE</option><option>Group Tour</option></select></label>
                </div>
                <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-800">Tell us what you have in mind</span><textarea name="message" rows={5} placeholder="Hotel preference, budget, transport, places you want to cover or anything else we should know..." className="w-full resize-y rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-50" /></label>
                <button type="submit" className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-800 px-7 py-4 text-sm font-bold !text-white shadow-lg shadow-blue-900/15 transition hover:-translate-y-0.5 hover:bg-blue-900 md:w-auto">Send Trip Enquiry <ArrowRight size={18} /></button>
              </form>
            </div>

            <aside className="space-y-5">
              <div className="rounded-[30px] bg-slate-950 p-7 text-white md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-300">Talk to our team</p>
                <h2 className="mt-3 text-3xl font-semibold">Need help deciding?</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">Call or WhatsApp us if you would rather discuss the trip first. We can understand your requirements over a conversation and take the planning forward from there.</p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <a href="tel:+919211796168" className="relative z-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3.5 text-sm font-extrabold !text-slate-950 shadow-sm transition hover:bg-slate-100" style={{ color: "#020617" }}><Phone size={18} /> Call +91 92117 96168</a>
                  <a href="https://wa.me/919211796168" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#16a34a] px-5 py-3.5 text-sm font-extrabold !text-white shadow-sm transition hover:bg-[#15803d]" style={{ color: "#ffffff" }}><MessageCircle size={18} /> WhatsApp Us</a>
                </div>
              </div>

              <div className="rounded-[30px] border border-slate-200 bg-white p-7 shadow-sm md:p-8">
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">Contact Details</p>
                <div className="mt-6 space-y-6">
                  <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800"><Phone size={19} /></div><div><p className="text-sm font-semibold text-slate-900">Phone</p><a href="tel:+919211796168" className="mt-1 block text-sm text-slate-600 hover:text-blue-700">+91 92117 96168</a></div></div>
                  <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800"><Mail size={19} /></div><div><p className="text-sm font-semibold text-slate-900">Email</p><a href="mailto:info@onlyroadtrip.com" className="mt-1 block text-sm text-slate-600 hover:text-blue-700">info@onlyroadtrip.com</a></div></div>
                  <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800"><MapPin size={19} /></div><div><p className="text-sm font-semibold text-slate-900">Office</p><p className="mt-1 text-sm leading-6 text-slate-600">F163, PH-1, New Palam Vihar,<br />Gurugram, Haryana - 122001</p></div></div>
                  <div className="flex gap-4"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-800"><Clock3 size={19} /></div><div><p className="text-sm font-semibold text-slate-900">Business Hours</p><p className="mt-1 text-sm leading-6 text-slate-600">Monday – Saturday<br />10:00 AM – 8:00 PM<br /><span className="text-slate-400">Sunday: By Appointment</span></p></div></div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:items-start lg:gap-20">
            <div><p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">Why Plan With Us</p><h2 className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-slate-950 md:text-5xl">A little help can make the planning much easier.</h2></div>
            <div className="grid gap-4 sm:grid-cols-2">{planningPoints.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-slate-200 bg-white p-5"><CheckCircle2 className="mt-0.5 shrink-0 text-blue-700" size={20} /><p className="text-sm leading-6 text-slate-700">{item}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid overflow-hidden rounded-[34px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.07)] lg:grid-cols-[1.05fr_.95fr]">
            <div className="p-7 md:p-10 lg:p-12">
              <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-700">Visit Us</p>
              <h2 className="mt-3 text-3xl font-semibold text-slate-950 md:text-4xl">Prefer to speak in person?</h2>
              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">Our office is in New Palam Vihar, Gurugram. If you would like to discuss a detailed itinerary, group requirement or corporate travel plan, get in touch with the team before visiting.</p>
              <a href="https://www.google.com/maps?q=F163%20PH-1%20New%20Palam%20Vihar%20Gurugram%20Haryana%20122001" target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-800 transition hover:border-blue-200 hover:bg-blue-50">Open Office Location <ArrowRight size={17} /></a>
            </div>
            <div className="min-h-[320px] bg-slate-100"><iframe title="Only Road Trip Office Location" src="https://www.google.com/maps?q=F163%20PH-1%20New%20Palam%20Vihar%20Gurugram%20Haryana%20122001&output=embed" width="100%" height="100%" loading="lazy" className="min-h-[320px] border-0" referrerPolicy="no-referrer-when-downgrade" /></div>
          </div>
        </div>
      </section>

      <section className="pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-[34px] bg-blue-800 px-7 py-12 text-white shadow-[0_25px_70px_rgba(30,64,175,0.18)] md:px-12 md:py-14 lg:px-16">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-blue-200">Ready when you are</p>
                <h2 className="mt-3 text-4xl font-semibold tracking-tight md:text-5xl">Let&apos;s start planning.</h2>
                <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">Send us the basic details of your trip. We&apos;ll take a look and get back to you with the next steps.</p>
              </div>
              <a href="tel:+919211796168" className="relative z-10 inline-flex min-h-14 w-fit items-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-extrabold !text-blue-900 shadow-sm transition hover:bg-blue-50" style={{ color: "#1e3a8a" }}>Talk to Our Team <ArrowRight size={18} /></a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
