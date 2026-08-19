"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { getGroupSharingRates, getPilgrimageGroupTourDates } from "@/data/groupTourPricing";
import { addDaysISO, buildFridays, formatBookingDate, getTripHoliday, isBookingLeadEligible, toISODate } from "@/data/bookingCalendar";

type Sharing = "quad" | "triple" | "double";
type Props = { packageTitle: string; packageId?: string; packageDuration?: string };

function returnDate(value: string, duration?: string) {
  const nights = Number(String(duration ?? "").match(/(\d+)\s*Nights?/i)?.[1] ?? 2);
  return formatBookingDate(addDaysISO(value, nights));
}

function isPilgrimage(packageTitle: string, packageId?: string) {
  return /char[- ]dham|do[- ]dham|kedarnath/i.test(`${packageTitle} ${packageId ?? ""}`);
}

export default function GroupBookingFormV2({ packageTitle, packageId, packageDuration = "2 Nights / 3 Days" }: Props) {
  const pilgrimage = isPilgrimage(packageTitle, packageId);
  const ratesRaw = getGroupSharingRates({ title: packageTitle, packageId, themes: ["Group Tour"] });
  const rates = {
    quad: ratesRaw?.find((r) => r.type === "Quad Sharing")?.price ?? 7499,
    triple: ratesRaw?.find((r) => r.type === "Triple Sharing")?.price ?? 7999,
    double: ratesRaw?.find((r) => r.type === "Double Sharing")?.price ?? 8499,
  };
  const ratesPending = !ratesRaw;
  const today = toISODate(new Date());
  const minDate = addDaysISO(today, 7);
  const sourceDates = useMemo(() => {
    const base = pilgrimage ? getPilgrimageGroupTourDates() : buildFridays(minDate, 18);
    return base.filter((date) => date >= minDate);
  }, [pilgrimage, minDate]);
  const validDates = useMemo(() => sourceDates.filter((date) => !getTripHoliday(date, packageDuration)), [sourceDates, packageDuration]);
  const [travelDate, setTravelDate] = useState(validDates[0] ?? minDate);
  const [sharing, setSharing] = useState<Sharing>("double");
  const [travellers, setTravellers] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const selectedRate = rates[sharing];
  const total = selectedRate * travellers;
  const advance = Math.ceil(total * 0.3);
  const overlapHoliday = getTripHoliday(travelDate, packageDuration);
  const eligible = isBookingLeadEligible(travelDate, today) && !overlapHoliday && validDates.includes(travelDate);

  const enquiryHref = useMemo(() => {
    const reason = overlapHoliday ? `${overlapHoliday.name} falls during the ${packageDuration} trip` : "special-date availability";
    const body = encodeURIComponent(`Hi Only Road Trip,\n\nI want to enquire about ${packageTitle}.\nPackage ID: ${packageId ?? ""}\nDeparture: ${formatBookingDate(travelDate)}\nReason: ${reason}\n\nPlease suggest an available group departure.`);
    return `mailto:info@onlyroadtrip.com?subject=${encodeURIComponent(`Group Tour Enquiry – ${packageTitle} – ${travelDate}`)}&body=${body}`;
  }, [overlapHoliday, packageDuration, packageId, packageTitle, travelDate]);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!accepted) { alert("Please accept the Terms & Conditions and Cancellation Policy before continuing."); return; }
    if (!eligible) { window.location.href = enquiryHref; return; }
    setSubmitting(true);
    try {
      const response = await fetch("/api/payment-link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: advance, purpose: `${packageTitle} | ${sharing} sharing | ${travelDate} | ${travellers} traveller${travellers > 1 ? "s" : ""}`, customer_name: name, customer_email: email, customer_phone: phone }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create payment link.");
      const url = data.link_url || data.url || data.paymentUrl || data.payment_link;
      if (!url) throw new Error("Payment link was not returned by the payment service.");
      window.location.href = url;
    } catch (error) { alert(error instanceof Error ? error.message : "Unable to start payment. Please try again."); }
    finally { setSubmitting(false); }
  }

  return <section id="booking" className="mt-7 scroll-mt-28">
    <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
      <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Group Tour Booking</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950">Select Your Trip</h2><p className="mt-2 text-sm font-medium text-slate-500">{packageTitle}{packageId ? ` • ${packageId}` : ""}</p></div><span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">5% GST INCLUDED</span></div>
        <div className="mt-6 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-blue-950"><b>Group booking rule:</b> only future departures at least 7 days ahead are bookable. Holiday-overlap departures are enquiry-only.</div>
        <div className="mt-6 grid gap-3 md:grid-cols-3">{(["quad", "triple", "double"] as Sharing[]).map((id) => <button key={id} type="button" onClick={() => setSharing(id)} className={`rounded-xl border-2 p-4 text-left ${sharing === id ? "border-blue-700 bg-blue-50" : "border-slate-200 bg-white"}`}><span className="font-extrabold text-slate-900">{id === "quad" ? "Quad Sharing" : id === "triple" ? "Triple Sharing" : "Double Sharing"}</span><p className="mt-2 text-2xl font-extrabold text-blue-800">₹{rates[id].toLocaleString("en-IN")}</p><p className="text-xs text-slate-500">Per Person • GST included</p></button>)}</div>
        <form onSubmit={submit} className="mt-7 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Selected Departure"><div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-extrabold text-blue-950">{formatBookingDate(travelDate)} → {returnDate(travelDate, packageDuration)}</div></Field>
            <Field label="Travellers"><input required type="number" min={1} max={30} value={travellers} onChange={(e) => setTravellers(Math.min(30, Math.max(1, Number(e.target.value) || 1)))} className="input" /></Field>
            <Field label="Full Name"><input required value={name} onChange={(e) => setName(e.target.value)} className="input" /></Field>
            <Field label="Mobile Number"><input required type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))} className="input" /></Field>
            <Field label="Email Address"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></Field>
          </div>
          <Field label="Special Request"><textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="input" placeholder="Pickup, meal, room, senior citizen or other group requirement" /></Field>
          <div className="rounded-xl border bg-slate-50 p-4"><label className="flex gap-3"><input required type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-blue-700" /><span className="text-sm">I agree to the <Link href="/terms-and-conditions" target="_blank" className="font-bold text-blue-700 underline">Terms & Conditions</Link> and <Link href="/cancellation-policy" target="_blank" className="font-bold text-blue-700 underline">Cancellation Policy</Link>.</span></label></div>
          <div className="grid gap-3 sm:grid-cols-2"><a href={enquiryHref} className="rounded-xl border-2 border-blue-700 bg-white py-4 text-center text-lg font-extrabold text-blue-800">Send Enquiry</a><button disabled={submitting || !eligible || ratesPending} type="submit" className="rounded-xl bg-blue-800 py-4 text-lg font-extrabold text-white shadow-lg disabled:cursor-not-allowed disabled:opacity-50">{ratesPending ? "Rate Coming Soon" : !eligible ? "Enquiry Only" : submitting ? "Creating Secure Payment..." : `Book Now • Pay ₹${advance.toLocaleString("en-IN")}`}</button></div>
        </form>
      </div>
      <aside className="xl:sticky xl:top-28"><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"><div className="bg-slate-950 px-5 py-4 text-xl font-extrabold text-white">Booking Summary</div><div className="space-y-4 p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{packageTitle}</p><div className="rounded-xl bg-slate-50 p-4 text-sm"><div className="flex justify-between gap-4"><span>Departure</span><b>{formatBookingDate(travelDate)}</b></div><div className="mt-2 flex justify-between gap-4"><span>Return</span><b>{returnDate(travelDate, packageDuration)}</b></div><div className="mt-2 flex justify-between gap-4"><span>Sharing</span><b>{sharing === "quad" ? "Quad" : sharing === "triple" ? "Triple" : "Double"}</b></div><div className="mt-2 flex justify-between gap-4"><span>Travellers</span><b>{travellers}</b></div></div><div className="border-t pt-4 text-sm"><div className="flex justify-between"><span>Package Total</span><b>₹{total.toLocaleString("en-IN")}</b></div><div className="mt-2 flex justify-between border-t pt-2"><span className="font-extrabold">30% Advance</span><b className="text-blue-800">₹{advance.toLocaleString("en-IN")}</b></div></div></div></div></aside>
    </div>
  </section>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block"><span className="mb-2 block text-sm font-bold text-slate-700">{label}</span>{children}</label>; }
