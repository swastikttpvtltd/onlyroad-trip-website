import BookingForm from "@/components/BookingForm";
import { packages } from "@/data/packages";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props={params:Promise<{slug:string}>};
export default async function BookPackagePage({params}:Props){
 const {slug}=await params; const pkg=packages.find(p=>p.slug===slug); if(!pkg)notFound();
 const rates=pkg.groupRates as Record<string,number>; const twin=rates["2"]??pkg.price; const single=Math.ceil((twin*1.38)/500)*500;
 return <main className="min-h-screen bg-slate-50 px-5 py-24 text-slate-800"><div className="mx-auto max-w-5xl">
  <Link href={`/packages/${pkg.slug}`} className="text-sm font-bold text-blue-700">← Back to package</Link>
  <div className="mt-5 rounded-3xl bg-[#153e75] p-6 text-white md:p-8"><p className="text-sm text-white/70">Secure Booking Request</p><h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{pkg.title}</h1><p className="mt-2 text-white/75">Package ID: {pkg.packageId} • {pkg.duration}</p></div>
  <section className="my-6 grid gap-4 md:grid-cols-2"><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">1 Traveller • Single Room</p><p className="mt-2 text-3xl font-extrabold text-[#153e75]">₹{single.toLocaleString("en-IN")}</p><p className="mt-1 text-sm text-slate-500">Per person • single occupancy estimate</p></div><div className="rounded-2xl bg-white p-5 shadow-sm"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">Twin / Double Sharing</p><p className="mt-2 text-3xl font-extrabold text-[#153e75]">₹{twin.toLocaleString("en-IN")}</p><p className="mt-1 text-sm text-slate-500">Per person • 2 travellers sharing one room</p></div></section>
  <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900">Single-room pricing includes a single occupancy supplement and is an estimated selling rate. Final hotel availability and any peak-date supplement are confirmed before payment.</div>
  <BookingForm packageTitle={pkg.title} packageId={pkg.packageId} groupRates={pkg.groupRates}/>
 </div></main>
}