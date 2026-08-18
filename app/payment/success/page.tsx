"use client";

import Link from "next/link";
import { CheckCircle2, Download, Mail, MapPin, Phone, ShieldCheck, UserRound, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";

type Booking = {
  bookingNumber?: string;
  gateway?: string;
  packageTitle?: string;
  packageId?: string;
  duration?: string;
  departure?: string;
  returnDate?: string;
  sharing?: string;
  travellers?: number;
  rate?: number;
  total?: number;
  advance?: number;
  balance?: number;
  name?: string;
  phone?: string;
  email?: string;
  purpose?: string;
};

const STORAGE_KEY = "onlyroadtrip_payment_booking";
const LEGACY_KEY = "onlyroadtrip_pending_booking";
const money = (n: number) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
const text = (value: unknown, fallback = "—") => String(value ?? "") || fallback;

function escapeHtml(value: unknown) {
  return String(value ?? "").replace(/[&<>\"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;",
  }[char] || char));
}

export default function PaymentSuccessPage() {
  const [mounted, setMounted] = useState(false);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [transactionId, setTransactionId] = useState("");
  const [gateway, setGateway] = useState("payu");
  const [bookingNumber, setBookingNumber] = useState("");

  useEffect(() => {
    setMounted(true);

    const params = new URLSearchParams(window.location.search);
    const transaction = params.get("txnid") || params.get("mihpayid") || params.get("cf_payment_id") || params.get("cf_order_id") || "";
    const urlBooking = params.get("booking") || "";
    const urlGateway = (params.get("gateway") || "payu").toLowerCase();

    let parsed: Booking | null = null;
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY) || sessionStorage.getItem(LEGACY_KEY);
      if (saved) parsed = JSON.parse(saved) as Booking;
    } catch {
      parsed = null;
    }

    setBooking(parsed);
    setTransactionId(transaction);
    setGateway(urlGateway);

    const storedBookingNumber = parsed?.bookingNumber || "";
    if (storedBookingNumber) {
      setBookingNumber(storedBookingNumber);
    } else if (urlBooking) {
      setBookingNumber(urlBooking);
    } else {
      // Generate only after mount. Never generate a booking number during SSR.
      const source = transaction || crypto.randomUUID().replace(/-/g, "");
      setBookingNumber(`ORT-${source.replace(/[^A-Za-z0-9]/g, "").slice(-8).toUpperCase()}`);
    }
  }, []);

  function printConfirmation() {
    const b = booking || {};
    const gatewayName = gateway === "cashfree" ? "Cashfree" : "PayU";
    const transaction = transactionId || "—";
    const printableBookingNumber = bookingNumber || "—";

    const printWindow = window.open("", "_blank", "width=900,height=1200");
    if (!printWindow) {
      alert("Please allow pop-ups for Only Road Trip to save the confirmation PDF.");
      return;
    }

    const rows = [
      ["Destination / Package", text(b.packageTitle)],
      ["Package ID", text(b.packageId)],
      ["Departure", text(b.departure)],
      ["Return", text(b.returnDate)],
      ["Duration", text(b.duration)],
      ["Room Sharing", text(b.sharing)],
      ["Travellers", text(b.travellers)],
      ["Amount Paid", money(Number(b.advance || 0))],
    ];
    const customerRows = [
      ["Client Name", text(b.name)],
      ["Mobile", text(b.phone)],
      ["Email", text(b.email)],
      ["Travellers", text(b.travellers)],
      ["Payment Gateway", gatewayName],
    ];
    const makeRows = (items: string[][]) => items.map(([label, value]) => `<div class="box"><div class="label">${escapeHtml(label)}</div><div class="value">${escapeHtml(value)}</div></div>`).join("");

    printWindow.document.open();
    printWindow.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>Payment Confirmation - ${escapeHtml(printableBookingNumber)}</title><style>
@page{size:A4;margin:12mm}*{box-sizing:border-box}html,body{margin:0;padding:0;background:#fff;color:#111827;font-family:Arial,Helvetica,sans-serif}body{font-size:10.5pt;line-height:1.45}.sheet{width:100%;max-width:190mm;margin:0 auto}.header{border-bottom:2px solid #153e75;padding-bottom:12px;margin-bottom:16px}.brand{color:#153e75;font-size:9pt;font-weight:800;letter-spacing:.18em}h1{margin:5px 0 2px;font-size:23pt;line-height:1.15;color:#111827}.muted{color:#64748b;font-size:9.5pt}.refgrid,.grid{display:grid;grid-template-columns:1fr 1fr;gap:8px}.ref{border:1px solid #bfdbfe;border-radius:8px;background:#eff6ff;padding:10px}.box{border:1px solid #cbd5e1;border-radius:8px;padding:9px;break-inside:avoid;min-height:45px}.label{font-size:7.5pt;font-weight:800;letter-spacing:.05em;text-transform:uppercase;color:#64748b}.ref .label{color:#2563eb}.value{margin-top:3px;font-size:10.5pt;font-weight:800;color:#111827;word-break:break-word}.ref .value{font-size:12pt;color:#172554}.section{margin-top:17px}h2{margin:0 0 8px;padding-left:8px;border-left:4px solid #153e75;color:#153e75;font-size:13.5pt}.success{margin-top:16px;padding:11px;border:1px solid #a7f3d0;border-radius:8px;background:#ecfdf5;color:#065f46}.footer{margin-top:20px;padding-top:9px;border-top:1px solid #cbd5e1;text-align:center;color:#64748b;font-size:8pt}@media print{body{-webkit-print-color-adjust:exact;print-color-adjust:exact}.sheet{max-width:none}}
</style></head><body><div class="sheet"><div class="header"><div class="brand">ONLY ROAD TRIP</div><h1>Payment Confirmation</h1><div class="muted">Premium Tours &amp; Travel Company in India</div></div><div class="refgrid"><div class="ref"><div class="label">Booking Number</div><div class="value">${escapeHtml(printableBookingNumber)}</div></div><div class="ref"><div class="label">${escapeHtml(gatewayName)} Transaction ID</div><div class="value">${escapeHtml(transaction)}</div></div></div><div class="section"><h2>Trip Details</h2><div class="grid">${makeRows(rows)}</div></div><div class="section"><h2>Traveller Details</h2><div class="grid">${makeRows(customerRows)}</div></div><div class="success"><strong>Payment received successfully.</strong><br>Keep this Booking Number and Transaction ID for future communication with Only Road Trip.</div><div class="footer">Operated by Swastik Tour And Travels Private Limited • Only Road Trip</div></div><script>setTimeout(function(){window.focus();window.print()},700);window.onafterprint=function(){setTimeout(function(){window.close()},500)};<\/script></body></html>`);
    printWindow.document.close();
  }

  const gatewayName = gateway === "cashfree" ? "Cashfree" : "PayU";

  // Do not render dynamic browser-only values until the client has mounted.
  // This makes the first server/client HTML identical and removes hydration errors.
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900">
        <Header />
        <main className="mx-auto flex min-h-[70vh] max-w-4xl items-center justify-center px-6 py-20">
          <div className="rounded-3xl border border-slate-200 bg-white px-8 py-10 text-center shadow-xl">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-blue-100 border-t-blue-700" />
            <p className="mt-4 font-bold text-slate-700">Loading payment confirmation…</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 pt-32 pb-16 text-white sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.42),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(16,185,129,0.18),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center"><p className="text-sm font-semibold text-blue-200">Only Road Trip › Payment Successful</p><h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Booking Confirmed</h1><p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-white/75">Your payment has been received successfully. Your trip details are below.</p></div>
      </section>
      <main className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-10">
          <div className="text-center"><div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-emerald-100 bg-emerald-50 text-emerald-600"><CheckCircle2 size={52}/></div><h2 className="mt-7 text-3xl font-black text-slate-950 sm:text-4xl">Payment Successful!</h2><p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-500">Thank you for booking with Only Road Trip. Your booking request has been successfully recorded.</p></div>
          <div className="mx-auto mt-8 grid max-w-4xl gap-4 md:grid-cols-2"><Reference label="Booking Number" value={bookingNumber || "—"}/><Reference label={`${gatewayName} Transaction ID`} value={transactionId || "—"}/></div>
          <div className="my-10 h-px bg-slate-200" />
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <section><h3 className="flex items-center gap-2 text-xl font-extrabold"><MapPin className="text-blue-700" size={22}/> Trip Details</h3><div className="mt-5 grid gap-4 sm:grid-cols-2"><Info label="Destination / Package" value={text(booking?.packageTitle)}/><Info label="Package ID" value={text(booking?.packageId)}/><Info label="Departure" value={text(booking?.departure)}/><Info label="Return" value={text(booking?.returnDate)}/><Info label="Duration" value={text(booking?.duration)}/><Info label="Room Sharing" value={text(booking?.sharing)}/><Info label="Travellers" value={text(booking?.travellers)}/><Info label="Amount Paid" value={money(Number(booking?.advance || 0))}/></div></section>
            <section><h3 className="flex items-center gap-2 text-xl font-extrabold"><UserRound className="text-blue-700" size={22}/> Traveller Details</h3><div className="mt-5 space-y-4 rounded-2xl bg-slate-50 p-5"><Info icon={<UserRound size={16}/>} label="Client Name" value={text(booking?.name)}/><Info icon={<Phone size={16}/>} label="Mobile" value={text(booking?.phone)}/><Info icon={<Mail size={16}/>} label="Email" value={text(booking?.email)}/><Info icon={<Users size={16}/>} label="Travellers" value={text(booking?.travellers)}/></div></section>
          </div>
          <div className="mt-8 flex items-start gap-4 rounded-2xl border border-emerald-100 bg-emerald-50 p-5"><ShieldCheck className="mt-0.5 shrink-0 text-emerald-700" size={25}/><div><p className="font-extrabold text-emerald-900">Payment received securely via {gatewayName}</p><p className="mt-1 text-sm leading-6 text-emerald-800">Keep your Booking Number and Transaction ID for future communication.</p></div></div>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"><button type="button" onClick={printConfirmation} className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-6 py-3 font-extrabold text-white hover:bg-blue-800"><Download size={18}/> Save / Print Confirmation</button><Link href="/" className="inline-flex items-center justify-center rounded-xl border border-blue-200 px-6 py-3 font-extrabold text-blue-700 hover:bg-blue-50">Back to Home</Link></div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Reference({label,value}:{label:string;value:string}){return <div className="rounded-2xl border border-blue-100 bg-blue-50 p-5"><p className="text-xs font-bold uppercase tracking-wide text-blue-700">{label}</p><p className="mt-2 break-all text-lg font-black text-blue-950">{value}</p></div>}
function Info({label,value,icon}:{label:string;value:string;icon?:React.ReactNode}){return <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4"><div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-400">{icon}{label}</div><p className="mt-2 break-words font-bold text-slate-900">{value}</p></div>}
