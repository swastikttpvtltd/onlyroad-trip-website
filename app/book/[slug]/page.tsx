import BookingForm from "@/components/BookingForm";
import { packages } from "@/data/packages";
import { notFound } from "next/navigation";
import Link from "next/link";

type Props={params:Promise<{slug:string}>};
export default async function BookPackagePage({params}:Props){
 const {slug}=await params; const pkg=packages.find(p=>p.slug===slug); if(!pkg)notFound();
 return <main className="min-h-screen bg-slate-50 px-5 py-24 text-slate-800"><div className="mx-auto max-w-5xl">
  <Link href={`/packages/${pkg.slug}`} className="text-sm font-bold text-blue-700">← Back to package</Link>
  <div className="mt-5 rounded-3xl bg-[#153e75] p-6 text-white md:p-8"><p className="text-sm text-white/70">Secure Booking Request</p><h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{pkg.title}</h1><p className="mt-2 text-white/75">Package ID: {pkg.packageId} • {pkg.duration}</p></div>
  <BookingForm packageTitle={pkg.title} packageId={pkg.packageId} groupRates={pkg.groupRates}/>
 </div></main>
}