"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import { addDaysISO, formatBookingDate, getHoliday, getTripHoliday, isBookingLeadEligible, toISODate } from "@/data/bookingCalendar";

type Rates = Record<string, number>;
type Props = { packageTitle?: string; packageId?: string; groupRates?: Rates; packageDuration?: string };

const countries = [
  ["IN", "+91", "India"], ["AE", "+971", "UAE"], ["GB", "+44", "UK"], ["US", "+1", "USA"], ["CA", "+1", "Canada"], ["AU", "+61", "Australia"], ["SG", "+65", "Singapore"], ["NP", "+977", "Nepal"],
] as const;

function rateForPax(r: Rates | undefined, p: number) {
  if (!r) return 0;
  if (p <= 2) return r["2"] ?? 0;
  if (p <= 4) return r["4"] ?? r["2"] ?? 0;
  if (p <= 6) return r["6"] ?? r["4"] ?? 0;
  if (p <= 12) return r["12"] ?? r["6"] ?? 0;
  if (p <= 16) return r["16"] ?? r["12"] ?? 0;
  if (p <= 20) return r["20"] ?? r["16"] ?? 0;
  if (p <= 25) return r["25"] ?? r["20"] ?? 0;
  if (p <= 30) return r["30"] ?? r["25"] ?? 0;
  return r["30+"] ?? r["30"] ?? 0;
}

export default function BookingFormV2({ packageTitle, packageId, groupRates, packageDuration = "3 Days" }: Props) {
  const today = toISODate(new Date());
  const firstDate = addDaysISO(today, 7);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("IN");
  const [nationality, setNationality] = useState("Indian");
  const [dob, setDob] = useState("");
  const [idType, setIdType] = useState("Aadhaar");
  const [idNumber, setIdNumber] = useState("");
  const [travelDate, setTravelDate] = useState(firstDate);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState("double");
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const totalPax = Math.max(1, adults + children);
  const basePP = rateForPax(groupRates, totalPax);
  const singlePP = Math.ceil((basePP * 1.38) / 500) * 500;
  const roomOptions = useMemo(() => {
    const rooms = Math.ceil(totalPax / 2);
    return [
      { id: "double", name: `${rooms} Double Room${rooms > 1 ? "s" : ""}`, pp: basePP },
      { id: "single", name: `${totalPax} Single Room${totalPax > 1 ? "s" : ""}`, pp: singlePP },
      { id: "twin", name: `${rooms} Twin Room${rooms > 1 ? "s" : ""}`, pp: basePP },
    ];
  }, [totalPax, basePP, singlePP]);
  const selected = roomOptions.find((option) => option.id === room) ?? roomOptions[0];
  const billingPax = Math.max(2, totalPax);
  const subtotal = selected.pp * billingPax;
  const gst = Math.round(subtotal * 0.05);
  const grand = subtotal + gst;
  const advance = Math.min(grand, 4000 * billingPax);
  const holiday = getHoliday(travelDate);
  const overlapHoliday = getTripHoliday(travelDate, packageDuration);
  const leadEligible = isBookingLeadEligible(travelDate, today);
  const enquiryOnly = !!overlapHoliday || !!holiday;

  const enquiryHref = useMemo(() => {
    const reason = overlapHoliday ? `${overlapHoliday.name} falls during the trip duration` : holiday ? holiday.name : "special-date availability";
    const body = encodeURIComponent(`Hi Only Road Trip,\n\nI want to enquire about ${packageTitle ?? "this tour"}.\nPackage: ${packageId ?? ""}\nTravel Date: ${formatBookingDate(travelDate)}\nReason: ${reason}\n\nPlease confirm availability.`);
    return `mailto:info@onlyroadtrip.com?subject=${encodeURIComponent(`Enquiry – ${packageTitle ?? "Tour Package"} – ${travelDate}`)}&body=${body}`;
  }, [holiday, overlapHoliday, packageId, packageTitle, travelDate]);

  const handleCalendarEnquiry = (date: string, reason: string) => {
    const body = encodeURIComponent(`Hi Only Road Trip,\n\nI want to enquire about ${packageTitle ?? "this tour"}.\nPackage: ${packageId ?? ""}\nTravel Date: ${formatBookingDate(date)}\nReason: ${reason}\n\nPlease confirm availability or suggest the nearest suitable date.`);
    window.location.href = `mailto:info@onlyroadtrip.com?subject=${encodeURIComponent(`Enquiry – ${packageTitle ?? "Tour Package"} – ${date}`)}&body=${body}`;
  };

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!accepted) { alert("Please accept the Terms & Conditions and Cancellation Policy before continuing."); return; }
    if (!leadEligible) { alert("Online booking opens only when the travel date is at least 7 days from today."); return; }
    if (enquiryOnly) { window.location.href = enquiryHref; return; }
    setSubmitting(true);
    try {
      const response = await fetch("/api/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: advance, purpose: `${packageTitle ?? "Tour Package"} | ${travelDate} | ${totalPax} travellers`, customer_name: name, customer_email: email, customer_phone: `${countries.find((item) => item[0] === country)?.[1] ?? "+91"}${phone}` }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create payment link.");
      const url = data.link_url || data.url || data.paymentUrl || data.payment_link;
      if (!url) throw new Error("Payment link was not returned by the payment service.");
      window.location.href = url;
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to start payment. Please try again.");
    } finally { setSubmitting(false); }
  }

  return <section id="booking" className="mt-7 scroll-mt-28">
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Secure Booking Request</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950">Book This Tour</h2><p className="mt-2 text-sm font-medium text-slate-500">{packageTitle}{packageId ? ` • ${packageId}` : ""}</p></div><span className="rounded-full bg-blue-50 px-3 py-2 text-xs font-extrabold text-blue-800">7-DAY ADVANCE RULE</span></div>

        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950"><b>Booking rule:</b> travel date must be at least 7 full days after today. Past dates never appear as selectable dates.</div>

        <div className="mt-6"><BookingCalendar selectedDate={travelDate} onChange={setTravelDate} onEnquiry={handleCalendarEnquiry} duration={packageDuration} title="Travel Calendar" helper="Google-style month calendar • past dates blocked • minimum 7-day lead time • holiday-overlap dates are enquiry-only." /></div>

        {(holiday || overlapHoliday) && <div className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-800"><b>{overlapHoliday ? `${overlapHoliday.name} falls during this trip.` : `${holiday?.name} is a holiday on this date.`}</b><p className="mt-1">Online booking is closed for this date. Please use <a href={enquiryHref} className="font-extrabold underline">Send Enquiry</a> and our team will confirm availability or suggest the nearest suitable date.</p></div>}

        <form onSubmit={submit} className="mt-7 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Full Name"><input required value={name} onChange={(e) => setName(e.target.value)} className="input" /></Field>
            <Field label="Mobile Number"><div className="flex overflow-hidden rounded-xl border border-slate-300 bg-white"><select aria-label="Country calling code" value={country} onChange={(e) => setCountry(e.target.value)} className="w-[105px] shrink-0 border-0 border-r border-slate-200 bg-slate-50 px-2 py-3 font-semibold outline-none">{countries.map((item) => <option key={item[0]} value={item[0]}>{item[1]} {item[2]}</option>)}</select><input required type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))} className="min-w-0 flex-1 border-0 px-3 py-3 outline-none" /></div></Field>
            <Field label="Email Address"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></Field>
            <Field label="Nationality"><input required value={nationality} onChange={(e) => setNationality(e.target.value)} className="input" /></Field>
            <Field label="Date of Birth"><input required type="date" max={today} value={dob} onChange={(e) => setDob(e.target.value)} className="input" /></Field>
            <Field label="Travel Date"><input required type="date" min={firstDate} value={travelDate} onChange={(e) => setTravelDate(e.target.value)} className="input" /><p className={`mt-2 text-xs ${!leadEligible || enquiryOnly ? "text-rose-600" : "text-emerald-700"}`}>{!leadEligible ? "Online booking is closed: minimum 7 days advance." : overlapHoliday ? `${overlapHoliday.name} occurs during this trip — enquiry only.` : holiday ? `${holiday.name} — enquiry only.` : "Date eligible for online booking."}</p></Field>
            <Field label="ID Type"><select value={idType} onChange={(e) => setIdType(e.target.value)} className="input"><option>Aadhaar</option><option>PAN</option><option>Passport</option><option>Other Government ID</option></select></Field>
            <Field label={`${idType} Number`}><input required value={idNumber} onChange={(e) => setIdNumber(e.target.value)} className="input" /></Field>
            <Field label="Adults"><input type="number" min={1} value={adults} onChange={(e) => setAdults(Math.max(1, Number(e.target.value) || 1))} className="input" /></Field>
            <Field label="Children"><input type="number" min={0} value={children} onChange={(e) => setChildren(Math.max(0, Number(e.target.value) || 0))} className="input" /></Field>
            <Field label="Room Sharing"><select value={room} onChange={(e) => setRoom(e.target.value)} className="input">{roomOptions.map((option) => <option key={option.id} value={option.id}>{option.name} — ₹{option.pp.toLocaleString("en-IN")}/person</option>)}</select></Field>
          </div>
          <Field label="Special Request"><textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="input" placeholder="Pickup, meal, room, senior citizen or other requirement" /></Field>
          <div className="rounded-xl border bg-slate-50 p-4"><label className="flex gap-3"><input required type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-blue-700" /><span className="text-sm">I agree to the <Link href="/terms-and-conditions" target="_blank" className="font-bold text-blue-700 underline">Terms & Conditions</Link> and <Link href="/cancellation-policy" target="_blank" className="font-bold text-blue-700 underline">Cancellation Policy</Link>.</span></label></div>
          <div className="grid gap-3 sm:grid-cols-2"><a href={enquiryHref} className="rounded-xl border-2 border-blue-700 bg-white py-4 text-center text-lg font-extrabold text-blue-800">Send Enquiry</a><button disabled={submitting || !leadEligible || enquiryOnly} type="submit" className="rounded-xl bg-blue-800 py-4 text-lg font-extrabold text-white shadow-lg transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-50">{enquiryOnly ? "Enquiry Only" : submitting ? "Creating Secure Payment..." : `Book Now • Pay ₹${advance.toLocaleString("en-IN")}`}</button></div>
        </form>
      </div>

      <aside className="xl:sticky xl:top-28"><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"><div className="bg-slate-950 px-5 py-4 text-xl font-extrabold text-white">Booking Summary</div><div className="space-y-4 p-5"><div className="rounded-xl bg-slate-50 p-4 text-sm"><div className="flex justify-between gap-4"><span>Travel Date</span><b>{formatBookingDate(travelDate)}</b></div><div className="mt-2 flex justify-between gap-4"><span>Duration</span><b>{packageDuration}</b></div><div className="mt-2 flex justify-between gap-4"><span>Travellers</span><b>{totalPax}</b></div></div><div className="border-t pt-4 text-sm"><div className="flex justify-between"><span>Price / person</span><b>₹{selected.pp.toLocaleString("en-IN")}</b></div><div className="mt-2 flex justify-between"><span>Subtotal</span><b>₹{subtotal.toLocaleString("en-IN")}</b></div><div className="mt-2 flex justify-between"><span>GST</span><b>₹{gst.toLocaleString("en-IN")}</b></div><div className="mt-3 flex justify-between border-t pt-3 text-base"><span className="font-extrabold">Advance</span><b className="text-blue-800">₹{advance.toLocaleString("en-IN")}</b></div></div></div></div></aside>
    </div>
  </section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>{children}</label>;
}
