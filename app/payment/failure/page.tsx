"use client";

import Link from "next/link";
import { AlertCircle, CalendarDays, CheckCircle2, CreditCard, Headphones, RefreshCw, ShieldCheck } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />

      <section className="relative overflow-hidden bg-gradient-to-r from-slate-950 via-blue-950 to-slate-900 pt-32 pb-16 text-white sm:pt-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(37,99,235,0.38),transparent_35%),radial-gradient(circle_at_80%_30%,rgba(14,165,233,0.18),transparent_35%)]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm font-semibold text-blue-200">Home <span className="mx-2">›</span> Payment Failed</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Payment Failed</h1>
        </div>
      </section>

      <main className="relative mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.10)] sm:p-10 lg:p-14">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border-8 border-red-100 bg-red-50 text-red-600 shadow-inner">
              <AlertCircle size={48} strokeWidth={2.2} />
            </div>
            <h2 className="mt-7 text-3xl font-black text-slate-950 sm:text-4xl">Payment Cancelled / Failed</h2>
            <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-slate-500">
              We&apos;re sorry, your payment could not be completed. You have not been charged for this transaction.
            </p>

            <div className="mt-7 flex items-start gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 text-left">
              <CalendarDays className="mt-0.5 shrink-0 text-red-600" size={25} />
              <div>
                <p className="font-extrabold text-red-800">Your booking is not confirmed.</p>
                <p className="mt-1 text-sm leading-6 text-red-700">Please try again to complete your booking. Your booking will only be confirmed after successful payment.</p>
              </div>
            </div>

            <div className="my-10 h-px bg-slate-200" />
            <h3 className="text-xl font-extrabold text-slate-950">What would you like to do next?</h3>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <ActionCard
                icon={<RefreshCw size={28} />}
                title="Try Again"
                text="Return to your saved booking and try the payment again."
                label="Try Again"
                href="/payment?restore=1"
                primary
              />
              <ActionCard
                icon={<CreditCard size={28} />}
                title="Choose Another Method"
                text="Your booking details will be restored automatically so you can select another gateway."
                label="Pay with Different Method"
                href="/payment?restore=1"
              />
              <ActionCard
                icon={<Headphones size={28} />}
                title="Need Help?"
                text="Our support team is here to assist you with your booking."
                label="Contact Support"
                href="/contact"
              />
            </div>

            <div className="mt-7 flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50 p-5 text-left">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-blue-700 shadow-sm">
                <ShieldCheck size={26} />
              </div>
              <div>
                <p className="font-extrabold text-blue-900">Safe &amp; Secure</p>
                <p className="mt-1 text-sm leading-6 text-blue-800">Your payment details are handled securely by the selected payment gateway. We use industry-standard security measures.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:grid-cols-2 lg:grid-cols-4">
          <TrustItem icon={<CheckCircle2 size={23} />} title="Trusted Travel Partner" text="Happy travellers" />
          <TrustItem icon={<CreditCard size={23} />} title="Secure Payments" text="100% protected" />
          <TrustItem icon={<ShieldCheck size={23} />} title="Best Price Guarantee" text="Great travel deals" />
          <TrustItem icon={<Headphones size={23} />} title="24×7 Support" text="We&apos;re here to help" />
        </div>
      </main>

      <Footer />
    </div>
  );
}

function ActionCard({
  icon,
  title,
  text,
  label,
  href,
  primary = false,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  label: string;
  href: string;
  primary?: boolean;
}) {
  const content = (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-700">{icon}</div>
      <h4 className="mt-4 text-base font-extrabold text-slate-950">{title}</h4>
      <p className="mt-2 min-h-[48px] text-sm leading-6 text-slate-500">{text}</p>
      <span className={`mt-5 inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold transition ${primary ? "bg-blue-700 text-white hover:bg-blue-800" : "border border-blue-200 text-blue-700 hover:bg-blue-50"}`}>
        {label}
      </span>
    </div>
  );

  return <Link href={href} className="block h-full">{content}</Link>;
}

function TrustItem({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return (
    <div className="flex items-center gap-3 px-2 py-2">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-700">{icon}</div>
      <div>
        <p className="text-sm font-extrabold text-slate-900">{title}</p>
        <p className="mt-0.5 text-xs text-slate-500">{text}</p>
      </div>
    </div>
  );
}
