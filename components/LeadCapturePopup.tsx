"use client";

import { useState } from "react";
import {
  CalendarDays,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Sparkles,
  User,
  Users,
  X,
} from "lucide-react";

export default function LeadCapturePopup() {
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    destination: "",
    travelDate: "",
    travellers: "2",
    message: "",
  });

  if (!open) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-xl bg-blue-700 px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-blue-800"
        >
          Open Travel Enquiry Popup
        </button>
      </div>
    );
  }

  const updateField = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert("Demo only — form submission will be connected to your lead system later.");
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-3 backdrop-blur-sm sm:p-6">
      <div className="relative flex max-h-[94vh] w-full max-w-[980px] overflow-auto rounded-[26px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.35)] lg:overflow-hidden">
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close enquiry popup"
          className="absolute right-4 top-4 z-30 flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-md transition hover:bg-slate-50"
        >
          <X size={20} />
        </button>

        <div className="relative hidden min-h-[610px] w-[40%] shrink-0 overflow-hidden lg:block">
          <img
            src="/images/hero/hero.png"
            alt="India travel"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/35 via-blue-950/55 to-blue-950/95" />
          <div className="relative z-10 flex h-full flex-col justify-between p-9 text-white">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/15 px-4 py-2 text-xs font-semibold tracking-wide backdrop-blur-md">
                <Sparkles size={15} />
                PREMIUM TRAVEL PLANNING
              </div>
              <h2 className="mt-7 max-w-[300px] text-[38px] font-bold leading-[1.12] tracking-tight">
                Let&apos;s plan your next journey.
              </h2>
              <p className="mt-5 max-w-[305px] text-sm leading-6 text-white/80">
                Share your travel requirements and our expert will help you build the right itinerary for your trip.
              </p>
            </div>

            <div>
              <div className="mb-5 h-px bg-white/20" />
              <p className="text-sm font-bold tracking-[0.16em]">ONLY ROAD TRIP</p>
              <p className="mt-1 text-xs text-white/70">
                Pilgrimage Tours • Domestic Holidays • Road Trips • Corporate Travel
              </p>
            </div>
          </div>
        </div>

        <div className="w-full p-5 sm:p-8 lg:p-9">
          <div className="mb-6 pr-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-700">Plan Your Trip</p>
            <h3 className="mt-2 text-[28px] font-bold leading-tight tracking-tight text-slate-900 sm:text-[32px]">
              Get a personalised travel plan
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tell us a little about your trip. We&apos;ll get back to you with suitable options.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-3.5">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field icon={<User size={17} />} label="Full Name" name="name" placeholder="Enter your name" value={form.name} onChange={updateField} required />
              <Field icon={<Phone size={17} />} label="Mobile Number" name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={updateField} required />
            </div>

            <Field icon={<Mail size={17} />} label="Email Address" name="email" type="email" placeholder="yourname@email.com" value={form.email} onChange={updateField} />

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Where do you want to go?</label>
              <div className="relative">
                <MapPin size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <select name="destination" value={form.destination} onChange={updateField} required className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100">
                  <option value="">Select destination</option>
                  <option>Char Dham Yatra</option>
                  <option>Kedarnath Yatra</option>
                  <option>Varanasi &amp; Ayodhya</option>
                  <option>Kashmir</option>
                  <option>Himachal Pradesh</option>
                  <option>Rajasthan</option>
                  <option>Goa</option>
                  <option>Kerala</option>
                  <option>North East India</option>
                  <option>Leh Ladakh</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field icon={<CalendarDays size={17} />} label="Travel Date" name="travelDate" type="date" value={form.travelDate} onChange={updateField} />
              <div>
                <label className="mb-1.5 block text-xs font-bold text-slate-700">Number of Travellers</label>
                <div className="relative">
                  <Users size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                  <select name="travellers" value={form.travellers} onChange={updateField} className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100">
                    {Array.from({ length: 10 }, (_, index) => index + 1).map((number) => (
                      <option key={number} value={number}>{number} {number === 1 ? "Traveller" : "Travellers"}</option>
                    ))}
                    <option value="10+">10+ Travellers</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-xs font-bold text-slate-700">Tell us about your trip</label>
              <div className="relative">
                <MessageSquare size={17} className="absolute left-3.5 top-3.5 text-slate-400" />
                <textarea name="message" value={form.message} onChange={updateField} rows={2} placeholder="Pickup city, hotel preference, special requirement, etc." className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 pt-3 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100" />
              </div>
            </div>

            <button type="submit" className="flex h-12 w-full items-center justify-center rounded-xl bg-blue-700 px-5 text-sm font-bold text-white shadow-lg shadow-blue-700/20 transition hover:bg-blue-800">
              Get My Travel Plan
            </button>
            <p className="text-center text-[11px] leading-5 text-slate-400">Your details are safe with Only Road Trip. Our travel expert will contact you shortly.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-700">{label}</label>
      <div className="relative">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">{icon}</span>
        <input type={type} name={name} value={value} onChange={onChange} placeholder={placeholder} required={required} className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none transition focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-100" />
      </div>
    </div>
  );
}
