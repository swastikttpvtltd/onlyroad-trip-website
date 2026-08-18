"use client";

import Link from "next/link";
import { CheckCircle2, Download, Mail, MapPin, Phone, ShieldCheck, UserRound, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useMemo, useState } from "react";

type Booking = {
  bookingNumber?: string; gateway?: string; packageTitle?: string; packageId?: string; duration?: string; departure?: string; returnDate?: string;
  sharing?: string; travellers?: number; rate?: number; total?: number; advance?: number; balance?: number;
  name?: string; phone?: string; email?: string; purpose?: string;
};

const money = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const text = (value: unknown, fallback = "—") => String(value ?? "") || fallback;
const STORAGE_KEY = "onlyroadtrip_payment_booking";
const LEGACY_KEY = "onlyroadtrip_pending_booking";

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>\"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" }[char] || char));
}

export default function PaymentSuccessPage() {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [gateway, setGateway] = useState("payu");

  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(LEGACY_KEY);
      if (saved) setBooking(JSON.parse(saved) as Booking);
    } catch { /* keep confirmation visible */ }

    const params = new URLSearchParams(window.location.search);
    setTransactionId(params.get("txnid") || params.get("mihpayid") || params.get("cf_order_id") || params.get("cf_payment_id") || "");
    setGateway((params.get("gateway") || "payu").toLowerCase());
  }, []);

  const bookingNumber = useMemo(() => {
    const fromStorage = booking?.bookingNumber;
    const fromUrl = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("booking") : "";
    if (fromStorage || fromUrl) return fromStorage || fromUrl || "";
    const suffix = (transactionId || Date.now().toString()).replace(/[^A-Za-z0-9]/g, "").slice(-8).toUpperCase();
    return `ORT-${suffix || "BOOKING"}`;
  }, [booking, transactionId]);

  function printConfirmation() {
    const existing = document.querySelector(".payment-print-sheet");
    if (existing) existing.remove();

    const b = booking || {};
    const transaction = transactionId || "—";
    const gatewayName = gateway === "cashfree" ? "Cashfree" : "PayU";
    const sheet = document.createElement("section");
    sheet.className = "payment-print-sheet";
    sheet.setAttribute("aria-hidden", "true");
    sheet.innerHTML = `
      <div class="payment-print-header">
        <div class="payment-print-brand">ONLY ROAD TRIP</div>
        <h1>Payment Confirmation</h1>
        <div class="payment-print-muted">Premium Tours &amp; Travel Company in India</div>
      </div>
      <div class="payment-print-ref-grid">
        <div class="payment-print-ref"><div class="payment-print-label">Booking Number</div><div class="payment-print-value">${escapeHtml(bookingNumber)}</div></div>
        <div class="payment-print-ref"><div class="payment-print-label">${escapeHtml(gatewayName)} Transaction ID</div><div class="payment-print-value">${escapeHtml(transaction)}</div></div>
      </div>
      <div class="payment-print-section">
        <h2>Trip Details</h2>
        <div class="payment-print-grid">
          <div class="payment-print-box"><div class="payment-print-label">Destination / Package</div><div class="payment-print-value">${escapeHtml(text(b.packageTitle))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Package ID</div><div class="payment-print-value">${escapeHtml(text(b.packageId))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Departure</div><div class="payment-print-value">${escapeHtml(text(b.departure))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Return</div><div class="payment-print-value">${escapeHtml(text(b.returnDate))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Duration</div><div class="payment-print-value">${escapeHtml(text(b.duration))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Room Sharing</div><div class="payment-print-value">${escapeHtml(text(b.sharing))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Travellers</div><div class="payment-print-value">${escapeHtml(text(b.travellers))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Amount Paid</div><div class="payment-print-value">${escapeHtml(money(Number(b.advance || 0)))}</div></div>
        </div>
      </div>
      <div class="payment-print-section">
        <h2>Traveller Details</h2>
        <div class="payment-print-grid">
          <div class="payment-print-box"><div class="payment-print-label">Client Name</div><div class="payment-print-value">${escapeHtml(text(b.name))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Mobile</div><div class="payment-print-value">${escapeHtml(text(b.phone))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Email</div><div class="payment-print-value">${escapeHtml(text(b.email))}</div></div>
          <div class="payment-print-box"><div class="payment-print-label">Payment Gateway</div><div class="payment-print-value">${escapeHtml(gatewayName)}</div></div>
        </div>
      </div>
      <div class="payment-print-success"><strong>Payment received successfully.</strong><br>Keep this Booking Number and Transaction ID for future communication with Only Road Trip.</div>
      <div class="payment-print-footer">Operated by Swastik Tour And Travels Private Limited • Only Road Trip</div>
    `;

    document.body.appendChild(sheet);

    const cleanup = () => {
      sheet.remove();
      window.removeEventListener("afterprint", cleanup);
    };
    window.addEventListener("afterprint", cleanup);

    // Give the browser one paint cycle so the print stylesheet sees the new A4 sheet.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.print());
    });
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 pt-32 pb-16 text-white sm:pt-36"><div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.42),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.18),transparent_35%)]" /><div className="relative mx-auto max-w-7xl px-6 text-center"><p className="text-sm font-semibold text-blue-200">Only Road Trip › Payment Successful</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Booking Confirmed</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75">Your payment has been received successfully. Your trip details are below.</p></div></section>
      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14"><div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-10">
        <div className="text-center"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-emerald-100 bg-emerald-50 text-emerald-600"><CheckCircle2 size={52} /></div><h2 className="mt-7 text-3xl font-black text-slate-950 sm:text-4xl">Payment Successful!</h2><p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-500">Thank you for booking with Only Road Trip. Your booking request has been successfully recorded.</p></div>
        <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2"><Reference label="Booking Number" value={bookingNumber} /><Reference label={`${gateway === "cashfree" ? "Cashfree" : "PayU"} Transaction ID`} value={transactionId || "Available in payment confirmation"} /></div>
        <div className="my-10 h-px bg-slate-200" />
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"><section><h3 className="flex items-center gap-2 text-xl font-extrabold"><MapPin className="text-blue-700" size={22} /> Trip Details</h3><div className="mt-5 grid gap-4 sm:grid-cols-2"><Info label="Destination / Package" value={text(booking?.packageTitle)} /><Info label="Package ID" value={text(booking?.packageId)} /><Info label="Departure" value={text(booking?.departure)} /><Info label="Return" value={text(booking?.returnDate)} /><Info label="Duration" value={text(booking?.duration)} /><Info label="Room Sharing" value={text(booking?.sharing)} /><Info label="Travellers" value={text(booking?.travellers)} /><Info label="Amount Paid" value={money(Number(booking?.advance || 0))} /></div></section><section><h3 className="flex items-center gap-2 text-xl font-extrabold"><UserRound className="text-blue-700" size={22} /> Traveller Details</h3><div className="mt-5 space-y-4 rounded-2xl bg-slate-50 p-5"><Info icon={<UserRound size={16} />} label="Client Name" value={text(booking?.name)} /><Info icon={<Phone size={16} />} label="Mobile" value={text(booking?.phone)} /><Info icon={<Mail size={16} />} label="Email" value={text(booking?.email)} /><Info icon={<Users size={16} />} label="Travellers" value={text(booking?.travellers)} /></div></section></div>
        <div className="mt-8 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-700" size={25} /><div><p className="font-extrabold text-emerald-900">Payment received securely via {gateway === "cashfree" ? "Cashfree" : "PayU"}</p><p className="mt-1 text-sm leading-6 text-emerald-800">Keep your Booking Number and Transaction ID for future communication.</p></div></div>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={printConfirmation} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-extrabold text-white hover:bg-blue-800"><Download size={18} /> Save / Print Confirmation</button><Link href="/" className="inline-flex items-center justify-center rounded-xl border border-blue-200 px-6 py-3 font-extrabold text-blue-700 hover:bg-blue-50">Back to Home</Link></div>
      </div></main><Footer /></div>
  );
}

function Reference({ label, value }: { label: string; value: string }) { return <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="text-xs font-bold uppercase tracking-wide text-blue-700">{label}</p><p className="mt-2 break-all text-lg font-black text-blue-950">{value}</p></div>; }
function Info({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) { return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">{icon}{label}</div><p className="mt-2 break-words font-bold text-slate-900">{value}</p></div>; }
