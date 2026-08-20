import BookingForm from "@/components/BookingForm";
import GroupBookingForm from "@/components/GroupBookingForm";
import { packages } from "@/data/packages";
import { notFound } from "next/navigation";

type Props={params:Promise<{slug:string}>;searchParams?:Promise<{departureDate?:string;arrivalDate?:string}>};

function isGroupTour(pkg:any){
 const text=`${pkg?.packageId??""} ${pkg?.title??""} ${pkg?.category??""} ${pkg?.duration??""} ${(pkg?.themes??[]).join(" ")}`.toLowerCase();
 return text.includes("group tour") || text.includes("group-tour") || text.includes("group") || (text.includes("weekend") && text.includes("2 nights / 3 days"));
}

export default async function BookPackagePage({params,searchParams}:Props){
 const {slug}=await params; const query=await searchParams; const pkg=packages.find(p=>p.slug===slug); if(!pkg)notFound();
 const isGroup=isGroupTour(pkg); const departureDate=query?.departureDate; const arrivalDate=query?.arrivalDate;
 return <main className="min-h-screen bg-slate-50 px-5 py-24 text-slate-800"><div className="mx-auto max-w-6xl">
  <div className="mt-5 rounded-3xl bg-[#153e75] p-6 text-white md:p-8"><p className="text-sm text-white/70">{isGroup?"Group Tour Secure Booking":"Secure Booking Request"}</p><h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{pkg.title}</h1><p className="mt-2 text-white/75">Package ID: {pkg.packageId} • {pkg.duration}</p></div>
  {isGroup ? <GroupBookingForm packageTitle={pkg.title} packageId={pkg.packageId} packageDuration={pkg.duration} initialDepartureDate={departureDate} initialArrivalDate={arrivalDate}/> : <BookingForm packageTitle={pkg.title} packageId={pkg.packageId} packageDuration={pkg.duration} initialDepartureDate={departureDate} initialArrivalDate={arrivalDate} groupRates={pkg.groupRates}/>} 
 </div></main>
}