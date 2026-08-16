"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Sharing = "quad" | "triple" | "double";
type Props = { packageTitle: string; packageId?: string; packageDuration?: string };

const FRIDAYS = [
  "2026-08-21","2026-08-28","2026-09-04","2026-09-11","2026-09-18","2026-09-25",
  "2026-10-02","2026-10-09","2026-10-16","2026-10-23","2026-10-30",
  "2026-11-06","2026-11-13","2026-11-20","2026-11-27",
  "2026-12-04","2026-12-11","2026-12-18","2026-12-25",
  "2027-01-01","2027-01-08","2027-01-15","2027-01-22","2027-01-29",
  "2027-02-05","2027-02-12","2027-02-19","2027-02-26",
  "2027-03-05","2027-03-12","2027-03-19","2027-03-26",
  "2027-04-02","2027-04-09","2027-04-16","2027-04-23","2027-04-30",
  "2027-05-07","2027-05-14","2027-05-21","2027-05-28",
  "2027-06-04","2027-06-11","2027-06-18","2027-06-25",
  "2027-07-02","2027-07-09","2027-07-16","2027-07-23","2027-07-30",
  "2027-08-06","2027-08-13","2027-08-20","2027-08-27",
  "2027-09-03","2027-09-10","2027-09-17","2027-09-24",
  "2027-10-01","2027-10-08","2027-10-15","2027-10-22","2027-10-29",
  "2027-11-05","2027-11-12","2027-11-19","2027-11-26",
  "2027-12-03","2027-12-10","2027-12-17","2027-12-24","2027-12-31",
  "2028-01-07","2028-01-14","2028-01-21","2028-01-28",
];

const INVENTORY_PER_DEPARTURE = 20;

function formatDate(value: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

function returnDate(value: string, duration: string) {
  const nights = Number(String(duration).match(/(\d+)\s*Nights?/i)?.[1] ?? 2);
  const d = new Date(`${value}T12:00:00`);
  d.setDate(d.getDate() + nights);
  return d.toLocaleDateString("en-IN", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
}

export default function GroupBookingForm({ packageTitle, packageId, packageDuration = "2 Nights / 3 Days" }: Props) {
  const isGoa = /goa/i.test(`${packageTitle} ${packageId ?? ""}`);
  const rates = isGoa ? { quad: 9999, triple: 11599, double: 12599 } : { quad: 7499, triple: 7999, double: 8499 };
  const [travelDate, setTravelDate] = useState(FRIDAYS[0]);
  const [sharing, setSharing] = useState<Sharing>("double");
  const [travellers, setTravellers] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const perPerson = rates[sharing];
  const total = perPerson * travellers;
  const advance = Math.ceil(total * 0.3);
  const balance = total - advance;
  const selectedMonth = useMemo(() => travelDate.slice(0, 7), [travelDate]);
  const visibleSlots = useMemo(() => FRIDAYS.filter((date) => date.startsWith(selectedMonth)), [selectedMonth]);
  const months = useMemo(() => Array.from(new Set(FRIDAYS.map((date) => date.slice(0, 7)))), []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!accepted) { alert("Please accept the Terms & Conditions and Cancellation Policy before continuing."); return; }
    setSubmitting(true);
    try {
      const response = await fetch("/api/payment-link", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ amount: advance, purpose: `${packageTitle} | ${sharing} sharing | ${travelDate} | ${travellers} travellers`, customer_name: name, customer_email: email, customer_phone: phone }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to create payment link.");
      const url = data.link_url || data.url || data.paymentUrl || data.payment_link;
      if (!url) throw new Error("Payment link was not returned by the payment service.");
      window.location.href = url;
    } catch (error) { alert(error instanceof Error ? error.message : "Unable to start payment. Please try again."); }
    finally { setSubmitting(false); }
  }

  return (
    <section id="booking" className="mt-7 scroll-mt-28">
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
          <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-700">Group Tour Booking</p><h2 className="mt-2 text-3xl font-extrabold text-slate-950">Select Your Trip</h2><p className="mt-2 text-sm font-medium text-slate-500">{packageTitle}{packageId ? ` • ${packageId}` : ""}</p></div><span className="rounded-full bg-emerald-50 px-4 py-2 text-xs font-extrabold text-emerald-700">5% GST INCLUDED</span></div>

          <div className="mt-7 overflow-hidden rounded-2xl border border-slate-200"><div className="bg-[#153e75] px-5 py-4 text-xl font-extrabold text-white">Package Cost</div><table className="w-full border-collapse"><thead><tr className="bg-amber-400 text-left"><th className="p-4 font-extrabold">Room Sharing</th><th className="p-4 text-right font-extrabold">Cost (per person)</th></tr></thead><tbody>{(["quad","triple","double"] as Sharing[]).map((type) => { const label = type === "quad" ? "Quad Sharing" : type === "triple" ? "Triple Sharing" : "Double Sharing"; return <tr key={type} className={`border-t border-slate-200 ${sharing === type ? "bg-blue-50" : "bg-white"}`}><td className="p-4 font-bold">{label}</td><td className="p-4 text-right font-extrabold">₹{rates[type].toLocaleString("en-IN")}/-</td></tr>; })}</tbody></table><div className="border-t bg-slate-50 px-5 py-3 text-xs font-semibold text-slate-600">Fixed per-person rate. The same per-person rate applies whether you book 1 traveller, 2 travellers or more. GST @ 5% is already included.</div></div>

          <div className="mt-7 rounded-2xl border border-slate-200 p-5"><div className="flex flex-wrap items-center justify-between gap-3"><div><h3 className="text-xl font-extrabold text-slate-950">Departure Calendar & Inventory</h3><p className="mt-1 text-sm text-slate-500">Every Friday departure • {packageDuration} • slots through January 2028</p></div><div className="rounded-full bg-emerald-50 px-3 py-2 text-xs font-extrabold text-emerald-700">{INVENTORY_PER_DEPARTURE} seats / trip</div></div><select value={selectedMonth} onChange={(e) => { const first = FRIDAYS.find((date) => date.startsWith(e.target.value)); if (first) setTravelDate(first); }} className="mt-4 rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm font-bold text-slate-800">{months.map((month) => <option key={month} value={month}>{new Date(`${month}-01T12:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</option>)}</select><div className="mt-4 overflow-x-auto"><table className="w-full min-w-[760px] border-collapse text-sm"><thead><tr className="bg-slate-100 text-left"><th className="border p-3">Departure</th><th className="border p-3">Return</th><th className="border p-3">Inventory</th><th className="border p-3">Status</th><th className="border p-3 text-center">Select</th></tr></thead><tbody>{visibleSlots.map((date) => <tr key={date} className={travelDate === date ? "bg-blue-50" : "bg-white"}><td className="border p-3 font-bold">{formatDate(date)}</td><td className="border p-3 font-semibold">{returnDate(date, packageDuration)}</td><td className="border p-3 font-bold text-emerald-700">{INVENTORY_PER_DEPARTURE} seats</td><td className="border p-3"><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">Available</span></td><td className="border p-3 text-center"><input type="radio" name="departure" checked={travelDate === date} onChange={() => setTravelDate(date)} className="h-5 w-5 accent-blue-700" aria-label={`Select ${formatDate(date)}`} /></td></tr>)}</tbody></table></div></div>

          <form onSubmit={submit} className="mt-7 space-y-5"><div className="grid gap-5 md:grid-cols-2"><Field label="Selected Departure"><div className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 font-extrabold text-blue-950">{formatDate(travelDate)} → {returnDate(travelDate, packageDuration)}</div></Field><Field label="Room Sharing"><select value={sharing} onChange={(e) => setSharing(e.target.value as Sharing)} className="input"><option value="quad">Quad Sharing — ₹{rates.quad.toLocaleString("en-IN")}/person</option><option value="triple">Triple Sharing — ₹{rates.triple.toLocaleString("en-IN")}/person</option><option value="double">Double Sharing — ₹{rates.double.toLocaleString("en-IN")}/person</option></select></Field><Field label="Travellers"><input required type="number" min={1} value={travellers} onChange={(e) => setTravellers(Math.max(1, Number(e.target.value) || 1))} className="input" /></Field><Field label="Full Name"><input required value={name} onChange={(e) => setName(e.target.value)} className="input" /></Field><Field label="Mobile Number"><input required type="tel" inputMode="numeric" value={phone} onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))} className="input" /></Field><Field label="Email Address"><input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></Field></div><Field label="Special Request"><textarea rows={4} value={message} onChange={(e) => setMessage(e.target.value)} className="input" placeholder="Any pickup, meal, room or travel requirement" /></Field><div className="rounded-xl border bg-slate-50 p-4"><label className="flex gap-3"><input required type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-blue-700" /><span className="text-sm">I have read and agree to the <Link href="/terms-and-conditions" target="_blank" className="font-bold text-blue-700 underline">Terms & Conditions</Link> and <Link href="/cancellation-policy" target="_blank" className="font-bold text-blue-700 underline">Cancellation Policy</Link>.</span></label></div><button disabled={submitting} type="submit" className="w-full rounded-xl bg-blue-800 py-4 text-lg font-extrabold text-white shadow-lg transition hover:bg-blue-900 disabled:opacity-60">{submitting ? "Creating Secure Payment..." : `Book Now • Pay ₹${advance.toLocaleString("en-IN")}`}</button></form>
        </div>

        <aside className="xl:sticky xl:top-28"><div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"><div className="bg-slate-950 px-5 py-4 text-xl font-extrabold text-white">Booking Summary</div><div className="space-y-4 p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{packageTitle}</p><div className="rounded-xl bg-slate-50 p-4 text-sm"><div className="flex justify-between gap-4"><span>Departure</span><b>{formatDate(travelDate)}</b></div><div className="mt-2 flex justify-between gap-4"><span>Return</span><b>{returnDate(travelDate, packageDuration)}</b></div><div className="mt-2 flex justify-between gap-4"><span>Sharing</span><b>{sharing === "quad" ? "Quad" : sharing === "triple" ? "Triple" : "Double"}</b></div><div className="mt-2 flex justify-between gap-4"><span>Travellers</span><b>{travellers}</b></div></div><Row label={`₹${perPerson.toLocaleString("en-IN")} × ${travellers} travellers`} value={total} /><div className="flex justify-between gap-4 text-xs font-semibold text-emerald-700"><span>GST @ 5%</span><span>Included</span></div><div className="border-t pt-3"><Row label="Total package cost" value={total} strong /></div><div className="rounded-xl bg-blue-50 p-4"><div className="flex justify-between gap-3 font-bold text-blue-950"><span>30% booking advance</span><span>₹{advance.toLocaleString("en-IN")}</span></div><div className="mt-2 flex justify-between gap-3 border-t border-blue-100 pt-2 text-sm"><span>Balance after advance</span><b>₹{balance.toLocaleString("en-IN")}</b></div></div><p className="text-xs leading-5 text-slate-500">Selected departure: {formatDate(travelDate)}. Inventory shown above is the configured starting inventory for each departure.</p></div></div></aside>
      </div>
      <style jsx>{`.input{width:100%;border:1px solid #cbd5e1;border-radius:.75rem;padding:.75rem;outline:none;background:#fff}.input:focus{border-color:#2563eb;box-shadow:0 0 0 2px rgba(37,99,235,.1)}`}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div><label className="mb-2 block font-semibold text-slate-800">{label}</label>{children}</div>; }
function Row({ label, value, strong = false }: { label: string; value: number; strong?: boolean }) { return <div className={`flex justify-between gap-3 ${strong ? "text-lg font-extrabold" : "text-sm text-slate-700"}`}><span>{label}</span><span className="shrink-0">₹{value.toLocaleString("en-IN")}</span></div>; }
