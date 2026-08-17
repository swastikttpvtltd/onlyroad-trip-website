"use client";

import { useState } from "react";
import { CalendarDays, CreditCard, FileText, LockKeyhole, Mail, MapPin, Phone, ShieldCheck, UserRound, Users } from "lucide-react";

type Booking = {
  packageTitle: string; packageId: string; duration: string; departure: string; returnDate: string;
  sharing: string; travellers: number; rate: number; total: number; advance: number; balance: number;
  name: string; phone: string; email: string; purpose: string;
};

const money = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function PaymentSelection({ booking }: { booking: Booking }) {
  const [gateway, setGateway] = useState<"cashfree" | "payu">("cashfree");
  const [loading, setLoading] = useState(false);

  async function pay() {
    if (!booking.name || !booking.phone || !booking.email || !booking.advance) {
      alert("Booking details or payment amount is missing. Please return to the booking form and complete it.");
      return;
    }
    setLoading(true);
    try {
      if (gateway === "cashfree") {
        const res = await fetch("/api/payment-link", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: "create_cashfree",
            amount: booking.advance,
            purpose: booking.purpose || `${booking.packageTitle} | ${booking.sharing} sharing | ${booking.departure} | ${booking.travellers} traveller${booking.travellers > 1 ? "s" : ""}`,
            customer_name: booking.name, customer_email: booking.email, customer_phone: booking.phone,
          }),
        });
        const data = await res.json();
        if (!res.ok || !data.link_url) throw new Error(data.error || "Cashfree checkout could not be started.");
        window.location.href = data.link_url;
        return;
      }

      const res = await fetch("/api/payu/checkout", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: booking.advance, productinfo: booking.packageTitle, firstname: booking.name, email: booking.email, phone: booking.phone }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "PayU checkout could not be started.");
      const form = document.createElement("form");
      form.method = "POST"; form.action = data.actionUrl;
      Object.entries(data.fields || {}).forEach(([key, value]) => {
        const input = document.createElement("input"); input.type = "hidden"; input.name = key; input.value = String(value ?? ""); form.appendChild(input);
      });
      document.body.appendChild(form); form.submit();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Unable to start payment.");
    } finally { setLoading(false); }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-24 text-slate-800 md:px-6">
      <div className="mx-auto max-w-6xl">
        <header className="rounded-3xl bg-[#153e75] p-6 text-white shadow-xl md:p-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Only Road Trip • Secure Payment</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Complete Your Booking</h1>
          <p className="mt-2 text-sm text-white/75">Review every booking detail before choosing Cashfree or PayU.</p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-6">
            <Card title="Client Details" icon={<UserRound size={20} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info icon={<UserRound size={16} />} label="Full Name" value={booking.name} />
                <Info icon={<Phone size={16} />} label="Mobile Number" value={booking.phone} />
                <Info icon={<Mail size={16} />} label="Email Address" value={booking.email} />
                <Info icon={<Users size={16} />} label="Travellers" value={String(booking.travellers)} />
              </div>
            </Card>

            <Card title="Trip Details" icon={<MapPin size={20} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info icon={<FileText size={16} />} label="Package" value={booking.packageTitle || "—"} />
                <Info icon={<FileText size={16} />} label="Package ID" value={booking.packageId || "—"} />
                <Info icon={<FileText size={16} />} label="Duration" value={booking.duration || "—"} />
                <Info icon={<Users size={16} />} label="Room Sharing" value={booking.sharing || "—"} />
                <Info icon={<CalendarDays size={16} />} label="Departure" value={booking.departure || "—"} />
                <Info icon={<CalendarDays size={16} />} label="Return" value={booking.returnDate || "—"} />
              </div>
            </Card>

            <Card title="Choose Payment Gateway" icon={<CreditCard size={20} />}>
              <p className="text-sm text-slate-500">Select your preferred secure payment method.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Gateway active={gateway === "cashfree"} title="Cashfree" subtitle="Cards • UPI • Net Banking" onClick={() => setGateway("cashfree")} />
                <Gateway active={gateway === "payu"} title="PayU" subtitle="Cards • UPI • Net Banking" onClick={() => setGateway("payu")} />
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <ShieldCheck className="mt-0.5 shrink-0 text-emerald-700" size={20} />
                <div><p className="font-bold text-emerald-900">Secure Payment</p><p className="mt-0.5 text-xs leading-5 text-emerald-800">Payment details are handled by the selected gateway. Secret keys never reach the browser.</p></div>
              </div>
              <button disabled={loading} onClick={pay} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-800 py-4 text-lg font-extrabold text-white shadow-lg hover:bg-blue-900 disabled:opacity-60">
                <CreditCard size={21} />{loading ? "Starting Secure Checkout..." : `Pay ${money(booking.advance)} via ${gateway === "cashfree" ? "Cashfree" : "PayU"}`}
              </button>
            </Card>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="bg-slate-950 px-6 py-5 text-xl font-extrabold text-white">Payment Summary</div>
              <div className="space-y-4 p-6">
                <div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Package</p><p className="mt-1 font-extrabold capitalize text-slate-950">{booking.packageTitle || "—"}</p></div>
                <div className="space-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
                  <Row label="Per Person" value={money(booking.rate)} /><Row label="Travellers" value={String(booking.travellers)} />
                  <Row label="Package Total" value={money(booking.total)} />
                  <div className="border-t border-slate-200 pt-3"><Row label="Advance (30%)" value={money(booking.advance)} strong /></div>
                  <Row label="Balance Before Arrival" value={money(booking.balance)} />
                </div>
                <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-5"><p className="text-xs font-bold uppercase tracking-wide text-blue-700">Amount Payable Now</p><p className="mt-1 text-3xl font-extrabold text-blue-900">{money(booking.advance)}</p><p className="mt-1 text-xs text-blue-700">30% booking advance</p></div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><LockKeyhole size={15} />Secure checkout • Encrypted payment</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="mb-6 flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-800">{icon}</span><h2 className="text-xl font-extrabold text-slate-950">{title}</h2></div>{children}</div>;
}
function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">{icon}{label}</div><p className="mt-2 break-words font-bold text-slate-900">{value || "—"}</p></div>; }
function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) { return <div className="flex justify-between gap-4"><span className={strong ? "font-extrabold text-slate-900" : "text-slate-500"}>{label}</span><span className={strong ? "font-extrabold text-blue-800" : "font-bold text-slate-900"}>{value}</span></div>; }
function Gateway({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle: string; onClick: () => void }) { return <button type="button" onClick={onClick} className={`rounded-2xl border-2 p-5 text-left transition ${active ? "border-blue-700 bg-blue-50 shadow-md" : "border-slate-200 bg-white hover:border-blue-300"}`}><div className="flex items-center justify-between"><div><p className="text-lg font-extrabold text-slate-950">{title}</p><p className="mt-1 text-xs font-medium text-slate-500">{subtitle}</p></div><span className={`h-5 w-5 rounded-full border-2 ${active ? "border-blue-700 bg-blue-700 ring-4 ring-blue-100" : "border-slate-300"}`} /></div><p className="mt-4 text-xs font-bold text-blue-800">{active ? "Selected" : "Select this gateway"}</p></button>; }
