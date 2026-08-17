"use client";

import { useSearchParams } from "next/navigation";
import { CreditCard, LockKeyhole, ShieldCheck, UserRound, CalendarDays, Users, Mail, Phone, FileText } from "lucide-react";
import { useState } from "react";

const money = (value: string) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function PaymentPage() {
  const params = useSearchParams();
  const [gateway, setGateway] = useState<"cashfree" | "payu">("cashfree");

  const title = params.get("title") || "Group Tour Booking";
  const sharing = params.get("sharing") || "—";
  const date = params.get("date") || "—";
  const travellers = params.get("travellers") || "1";
  const rate = params.get("rate") || "0";
  const total = params.get("total") || "0";
  const advance = params.get("advance") || "0";
  const balance = params.get("balance") || "0";
  const name = params.get("name") || "—";
  const email = params.get("email") || "—";
  const phone = params.get("phone") || "—";

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-12 text-slate-800">
      <div className="mx-auto max-w-6xl">
        <header className="overflow-hidden rounded-3xl bg-[#153e75] p-7 text-white shadow-xl md:p-9">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-blue-200">Only Road Trip • Secure Payment</p>
          <h1 className="mt-2 text-3xl font-extrabold md:text-4xl">Complete Your Booking</h1>
          <p className="mt-2 text-sm text-white/75">Review all booking details and choose your preferred payment gateway.</p>
        </header>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
          <section className="space-y-6">
            <Card title="Client Details" icon={<UserRound size={20} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info icon={<UserRound size={15} />} label="Full Name" value={name} />
                <Info icon={<Phone size={15} />} label="Mobile Number" value={phone} />
                <Info icon={<Mail size={15} />} label="Email Address" value={email} />
                <Info icon={<Users size={15} />} label="Travellers" value={travellers} />
              </div>
            </Card>

            <Card title="Trip Details" icon={<FileText size={20} />}>
              <div className="grid gap-4 sm:grid-cols-2">
                <Info icon={<FileText size={15} />} label="Package" value={title} />
                <Info icon={<Users size={15} />} label="Room Sharing" value={sharing} />
                <Info icon={<CalendarDays size={15} />} label="Departure" value={date} />
                <Info icon={<Users size={15} />} label="Travellers" value={travellers} />
              </div>
            </Card>

            <Card title="Choose Payment Gateway" icon={<CreditCard size={20} />}>
              <p className="text-sm text-slate-500">Select how you want to pay your booking advance.</p>
              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <Gateway active={gateway === "cashfree"} title="Cashfree" subtitle="Cards • UPI • Net Banking" onClick={() => setGateway("cashfree")} />
                <Gateway active={gateway === "payu"} title="PayU" subtitle="Cards • UPI • Net Banking" onClick={() => setGateway("payu")} />
              </div>
              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4">
                <ShieldCheck className="mt-0.5 shrink-0 text-emerald-700" size={20} />
                <div>
                  <p className="font-bold text-emerald-900">Secure Payment</p>
                  <p className="mt-1 text-xs leading-5 text-emerald-800">Payment credentials are handled by the selected gateway. We do not store your card or UPI details.</p>
                </div>
              </div>
              <button type="button" className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-800 py-4 text-lg font-extrabold text-white shadow-lg transition hover:bg-blue-900">
                <CreditCard size={21} />
                Pay {money(advance)} via {gateway === "cashfree" ? "Cashfree" : "PayU"}
              </button>
              <p className="mt-3 text-center text-xs font-semibold text-slate-400">Gateway credentials will be connected after deployment.</p>
            </Card>
          </section>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
              <div className="bg-slate-950 px-6 py-5 text-xl font-extrabold text-white">Payment Summary</div>
              <div className="space-y-4 p-6">
                <div><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Package</p><p className="mt-1 font-extrabold text-slate-950">{title}</p></div>
                <div className="space-y-3 rounded-2xl bg-slate-50 p-4 text-sm">
                  <Row label="Per Person" value={money(rate)} />
                  <Row label="Travellers" value={travellers} />
                  <Row label="Package Total" value={money(total)} />
                  <div className="border-t border-slate-200 pt-3"><Row label="Advance (30%)" value={money(advance)} strong /></div>
                  <Row label="Balance Before Arrival" value={money(balance)} />
                </div>
                <div className="rounded-2xl border-2 border-blue-100 bg-blue-50 p-5"><p className="text-xs font-bold uppercase tracking-wide text-blue-700">Amount Payable Now</p><p className="mt-1 text-3xl font-extrabold text-blue-900">{money(advance)}</p><p className="mt-1 text-xs text-blue-700">30% booking advance</p></div>
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-500"><LockKeyhole size={15} /> Secure checkout • Encrypted payment</div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

function Card({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return <div className="rounded-3xl bg-white p-6 shadow-lg md:p-8"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-800">{icon}</span><h2 className="text-xl font-extrabold text-slate-950">{title}</h2></div><div className="mt-6">{children}</div></div>;
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">{icon}{label}</div><p className="mt-2 break-words font-bold text-slate-900">{value}</p></div>;
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return <div className="flex justify-between gap-4"><span className={strong ? "font-extrabold text-slate-900" : "text-slate-500"}>{label}</span><span className={strong ? "font-extrabold text-blue-800" : "font-bold text-slate-900"}>{value}</span></div>;
}

function Gateway({ active, title, subtitle, onClick }: { active: boolean; title: string; subtitle: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={`rounded-2xl border-2 p-5 text-left transition ${active ? "border-blue-700 bg-blue-50 shadow-md" : "border-slate-200 bg-white hover:border-blue-300"}`}><div className="flex items-center justify-between gap-3"><div><p className="text-lg font-extrabold text-slate-950">{title}</p><p className="mt-1 text-xs font-medium text-slate-500">{subtitle}</p></div><span className={`h-5 w-5 rounded-full border-2 ${active ? "border-blue-700 bg-blue-700 ring-4 ring-blue-100" : "border-slate-300"}`} /></div><p className="mt-4 text-xs font-bold text-blue-800">{active ? "Selected" : "Select this gateway"}</p></button>;
}
