"use client";

import Link from "next/link";
import { AlertCircle, CreditCard, Headphones, Mail, MapPin, Phone, RefreshCw, ShieldCheck, UserRound, Users, CalendarDays } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type Booking = { bookingNumber?: string; gateway?: string; packageTitle?: string; packageId?: string; duration?: string; departure?: string; returnDate?: string; sharing?: string; travellers?: number; advance?: number; name?: string; phone?: string; email?: string };
const STORAGE_KEY = "onlyroadtrip_payment_booking";
const text = (v: unknown) => String(v ?? "") || "—";
const money = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN")}`;

export default function PaymentFailurePage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [gateway, setGateway] = useState("payu");
  const [transactionId, setTransactionId] = useState("");
  const [status, setStatus] = useState("failed");

  useEffect(() => {
    try { const raw = sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem("onlyroadtrip_pending_booking"); if (raw) setBooking(JSON.parse(raw) as Booking); } catch { /* ignore */ }
    const params = new URLSearchParams(window.location.search);
    setGateway((params.get("gateway") || "payu").toLowerCase());
    setTransactionId(params.get("txnid") || params.get("mihpayid") || params.get("cf_order_id") || "");
    setStatus(params.get("status") || "failed");
  }, []);

  const currentGateway = gateway === "cashfree" ? "Cashfree" : "PayU";
  const bookingNumber = booking?.bookingNumber || new URLSearchParams(typeof window !== "undefined" ? window.location.search : "").get("booking") || "—";
  const alternateGateway = gateway === "cashfree" ? "payu" : "cashfree";
  const message = status === "cancelled" || status === "user_dropped" ? "The payment was cancelled before completion." : "We’re sorry, your payment could not be completed.";

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900"><Header />
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 pt-32 pb-16 text-white sm:pt-36"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.38),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.18),transparent_35%)]" /><div className="relative mx-auto max-w-7xl px-6 text-center"><p className="text-sm font-semibold text-blue-200">Only Road Trip › Payment {status === "cancelled" ? "Cancelled" : "Failed"}</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Payment {status === "cancelled" ? "Cancelled" : "Failed"}</h1></div></section>
      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14"><div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-10 lg:p-14">
        <div className="mx-auto max-w-4xl text-center"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-red-100 bg-red-50 text-red-600"><AlertCircle size={48} /></div><h2 className="mt-7 text-3xl font-black text-slate-950 sm:text-4xl">Payment Cancelled / Failed</h2><p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-500">{message} No successful payment has been recorded for this attempt.</p>
          <div className="mt-7 grid gap-3 text-left sm:grid-cols-3"><Reference label="Booking Number" value={bookingNumber} /><Reference label="Gateway" value={currentGateway} /><Reference label="Transaction ID" value={transactionId || "—"} /></div>
          {booking && <div className="mt-6 grid gap-6 text-left lg:grid-cols-[1.2fr_0.8fr]"><section className="rounded-2xl border border-slate-200 bg-white p-5"><h3 className="flex items-center gap-2 text-lg font-extrabold"><MapPin className="text-blue-700" size={20} /> Trip Details</h3><div className="mt-4 grid gap-3 sm:grid-cols-2"><Info label="Package" value={text(booking.packageTitle)} /><Info label="Package ID" value={text(booking.packageId)} /><Info label="Departure" value={text(booking.departure)} /><Info label="Return" value={text(booking.returnDate)} /><Info label="Duration" value={text(booking.duration)} /><Info label="Room Sharing" value={text(booking.sharing)} /><Info label="Travellers" value={text(booking.travellers)} /><Info label="Amount" value={money(Number(booking.advance || 0))} /></div></section><section className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><h3 className="flex items-center gap-2 text-lg font-extrabold"><UserRound className="text-blue-700" size={20} /> Customer Details</h3><div className="mt-4 space-y-3"><Info icon={<UserRound size={15} />} label="Client Name" value={text(booking.name)} /><Info icon={<Phone size={15} />} label="Mobile" value={text(booking.phone)} /><Info icon={<Mail size={15} />} label="Email" value={text(booking.email)} /><Info icon={<Users size={15} />} label="Travellers" value={text(booking.travellers)} /></div></section></div>}
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 text-left"><CalendarDays className="mt-0.5 shrink-0 text-red-600" size={25} /><div><p className="font-extrabold text-red-800">Your booking is not confirmed.</p><p className="mt-1 text-sm leading-6 text-red-700">Complete a successful payment before the booking is confirmed. Your saved booking details will be restored on the next payment screen.</p></div></div>
          <h3 className="mt-10 text-xl font-extrabold text-slate-950">What would you like to do next?</h3><div className="mt-6 grid gap-4 md:grid-cols-3"><ActionCard icon={<RefreshCw size={28} />} title="Try Again" text={`Retry with ${currentGateway}. Your booking details stay saved.`} label="Try Again" href={`/payment?restore=1&gateway=${gateway}`} primary /><ActionCard icon={<CreditCard size={28} />} title="Different Method" text={`Switch from ${currentGateway} to ${alternateGateway === "cashfree" ? "Cashfree" : "PayU"}.`} label="Pay with Different Method" href={`/payment?restore=1&gateway=${alternateGateway}`} /><ActionCard icon={<Headphones size={28} />} title="Need Help?" text="Our support team can assist you with your payment or booking." label="Contact Support" href="/contact" /></div>
          <div className="mt-7 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-left"><div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-blue-700"><ShieldCheck size={26} /></div><div><p className="font-extrabold text-blue-900">Safe &amp; Secure</p><p className="mt-1 text-sm leading-6 text-blue-800">Your card, UPI and banking details are handled by {currentGateway}. Secret payment credentials are never stored on this page.</p></div></div>
        </div>
      </div></main><Footer /></div>
  );
}

function Reference({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4 text-left"><p className="text-xs font-bold uppercase tracking-wide text-blue-700">{label}</p><p className="mt-2 break-all text-base font-black text-blue-950">{value}</p></div>; }
function Info({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) { return <div className="rounded-xl border border-slate-200 bg-white p-3"><div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wide text-slate-400">{icon}{label}</div><p className="mt-1 break-words text-sm font-bold text-slate-900">{value}</p></div>; }
function ActionCard({ icon, title, text, label, href, primary = false }: { icon: React.ReactNode; title: string; text: string; label: string; href: string; primary?: boolean }) { return <Link href={href} className="block h-full"><div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">{icon}</div><h4 className="mt-4 text-base font-extrabold text-slate-950">{title}</h4><p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">{text}</p><span className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold ${primary ? "bg-blue-700 text-white" : "border border-blue-200 text-blue-700"}`}>{label}</span></div></Link>; }
