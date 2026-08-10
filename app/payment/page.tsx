"use client";

import { FormEvent, useState } from "react";
import { CreditCard, ExternalLink, LockKeyhole, ShieldCheck } from "lucide-react";

export default function PaymentPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ url?: string; error?: string } | null>(null);

  async function createPaymentLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setResult(null);

    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());

    try {
      const response = await fetch("/api/payment-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to create payment link.");
      setResult({ url: data.link_url });
    } catch (error) {
      setResult({ error: error instanceof Error ? error.message : "Something went wrong." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-slate-900">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[32px] bg-white shadow-2xl">
        <div className="bg-gradient-to-r from-slate-950 via-blue-950 to-cyan-800 px-7 py-8 text-white md:px-10">
          <div className="mb-3 flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
              <CreditCard className="h-6 w-6" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-200">Only Road Trip</p>
              <h1 className="text-2xl font-bold md:text-3xl">Payment Link</h1>
            </div>
          </div>
          <p className="max-w-2xl text-sm leading-6 text-slate-200">
            Create a Cashfree payment link for a customer booking. API credentials are used only by the server request and are never saved in the browser.
          </p>
        </div>

        <form onSubmit={createPaymentLink} className="grid gap-8 p-7 md:grid-cols-2 md:p-10">
          <section className="space-y-5">
            <div>
              <h2 className="text-lg font-bold">Cashfree Configuration</h2>
              <p className="mt-1 text-xs text-slate-500">For security, do not commit these credentials to GitHub.</p>
            </div>

            <label className="block text-sm font-semibold">
              Environment
              <select name="environment" defaultValue="sandbox" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500">
                <option value="sandbox">Sandbox / Test</option>
                <option value="production">Production</option>
              </select>
            </label>

            <label className="block text-sm font-semibold">
              Client ID
              <input name="client_id" type="password" autoComplete="off" placeholder="Cashfree Client ID" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" />
            </label>

            <label className="block text-sm font-semibold">
              Client Secret Key
              <input name="client_secret" type="password" autoComplete="off" placeholder="Cashfree Secret Key" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" />
            </label>

            <div className="flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900">
              <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0" />
              <span>For a live site, the safer setup is to keep these keys in server environment variables instead of entering them in a public page.</span>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <h2 className="text-lg font-bold">Payment Details</h2>
              <p className="mt-1 text-xs text-slate-500">Customer will receive the generated payment link.</p>
            </div>

            <label className="block text-sm font-semibold">Amount (INR)<input required name="amount" type="number" min="1" step="0.01" placeholder="25000" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" /></label>
            <label className="block text-sm font-semibold">Purpose<input required name="purpose" placeholder="Ayodhya Tour Booking" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" /></label>
            <label className="block text-sm font-semibold">Customer Name<input required name="customer_name" placeholder="Customer name" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" /></label>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="block text-sm font-semibold">Email<input required name="customer_email" type="email" placeholder="customer@email.com" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" /></label>
              <label className="block text-sm font-semibold">Mobile<input required name="customer_phone" inputMode="numeric" placeholder="9876543210" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" /></label>
            </div>
            <label className="block text-sm font-semibold">Return URL<input name="return_url" type="url" placeholder="https://www.onlyroadtrip.com/payment/success" className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-cyan-500" /></label>

            <button disabled={loading} className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-5 py-3.5 font-bold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-60">
              <ShieldCheck className="h-5 w-5" />
              {loading ? "Creating Payment Link..." : "Create Payment Link"}
            </button>

            {result?.url && (
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-sm font-semibold text-emerald-800">Payment link created successfully.</p>
                <a href={result.url} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-emerald-700 underline">
                  Open Payment Link <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            )}

            {result?.error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{result.error}</div>}
          </section>
        </form>
      </div>
    </main>
  );
}
