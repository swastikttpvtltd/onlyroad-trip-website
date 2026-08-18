"use client";

import { FormEvent, useState } from "react";

export default function PayUTestPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function startPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData(event.currentTarget);
      const payload = {
        amount: form.get("amount"),
        firstname: form.get("firstname"),
        lastname: form.get("lastname"),
        email: form.get("email"),
        phone: form.get("phone"),
        productinfo: form.get("productinfo"),
      };

      const response = await fetch("/api/payment/payu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Unable to start PayU test payment.");

      const payuForm = document.createElement("form");
      payuForm.method = "POST";
      payuForm.action = data.paymentUrl;
      payuForm.style.display = "none";

      Object.entries(data.fields as Record<string, string>).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value;
        payuForm.appendChild(input);
      });

      document.body.appendChild(payuForm);
      payuForm.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to start PayU test payment.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-300">Only Road Trip</p>
          <h1 className="text-3xl font-bold">PayU Test Payment</h1>
          <p className="mt-3 text-sm text-slate-300">
            Sandbox-only page for testing the newly activated PayU integration. No live payment is processed here.
          </p>
        </div>

        <form onSubmit={startPayment} className="space-y-5">
          <div>
            <label htmlFor="amount" className="mb-2 block text-sm font-medium">Test amount (INR)</label>
            <input id="amount" name="amount" type="number" min="1" step="0.01" defaultValue="10" required className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none" />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="firstname" className="mb-2 block text-sm font-medium">First name</label>
              <input id="firstname" name="firstname" required defaultValue="Saurabh" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none" />
            </div>
            <div>
              <label htmlFor="lastname" className="mb-2 block text-sm font-medium">Last name</label>
              <input id="lastname" name="lastname" defaultValue="Kumar" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none" />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium">Email</label>
            <input id="email" name="email" type="email" required defaultValue="test@example.com" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none" />
          </div>

          <div>
            <label htmlFor="phone" className="mb-2 block text-sm font-medium">Mobile</label>
            <input id="phone" name="phone" type="tel" required defaultValue="9876543210" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none" />
          </div>

          <div>
            <label htmlFor="productinfo" className="mb-2 block text-sm font-medium">Payment purpose</label>
            <input id="productinfo" name="productinfo" required defaultValue="Only Road Trip PayU Test" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none" />
          </div>

          {error && <p className="rounded-xl border border-red-400/30 bg-red-400/10 p-3 text-sm text-red-200">{error}</p>}

          <button type="submit" disabled={loading} className="w-full rounded-xl bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Opening PayU Test Gateway…" : "Pay ₹10 via PayU Test"}
          </button>
        </form>
      </div>
    </main>
  );
}
