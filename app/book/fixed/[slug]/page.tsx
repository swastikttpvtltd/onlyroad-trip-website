import { connection } from "next/server";
import {notFound} from "next/navigation";
import Link from "next/link";
import {fixedDepartureReviews} from "@/features/fixedDepartures/data/fixedDepartureDetails";
import {fixedDepartureOptions,fixedRate,departureCities,fixedCheckout} from "@/features/fixedDepartures/data/fixedDepartureBooking";
import FixedDepartureBookingForm from "@/features/fixedDepartures/components/FixedDepartureBookingForm";
import FixedDepartureBookingCard from "@/features/fixedDepartures/components/package/FixedDepartureBookingCard";
export async function generateMetadata({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const tour=fixedDepartureReviews.find(item=>item.slug===slug);
  if(!tour)return {title:"Fixed Departure Booking"};
  return {
    title:`Book ${tour.title}`,
    robots:{index:false,follow:true},
    description:`Check departure cities, dates and booking options for ${tour.title} with Only Road Trip.`,
    alternates:{canonical:`https://www.onlyroadtrip.com/book/fixed/${tour.slug}`},
  };
}
export default async function Page({params,searchParams}:{params:Promise<{slug:string}>;searchParams:Promise<{city?:string;departureDate?:string;adults?:string}>}){await connection();const{slug}=await params;const q=await searchParams;const tour=fixedDepartureReviews.find(t=>t.slug===slug);if(!tour)notFound();const city=q.city||"",date=q.departureDate||"",scheduled=slug.startsWith("varanasi"),yatra=["char-dham-yatra","amarnath-yatra-kashmir"].includes(slug);const validDate=fixedDepartureOptions(slug).some(d=>d.date===date);const selected=departureCities.includes(city)&&validDate;const id="FD:"+slug+":"+city;if(selected&&scheduled)fixedCheckout(id,date,1);
return <main className="min-h-screen bg-slate-50 px-5 py-24 text-slate-800"><div className="mx-auto max-w-6xl"><Link href={"/fixed-departures/"+slug} className="font-bold text-blue-800">← View Tour</Link><div className="mt-5 rounded-3xl bg-[#153e75] p-6 text-white md:p-8"><p className="text-sm text-white/70">Group Tour Secure Booking</p><h1 className="mt-2 text-3xl font-extrabold md:text-4xl">{tour.title}</h1><p className="mt-2 text-white/75">{tour.nights} Nights / {tour.itinerary.length} Days</p></div>{selected?<FixedDepartureBookingForm packageTitle={tour.title} packageId={id} packageDuration={tour.nights+" Nights / "+tour.itinerary.length+" Days"} fixed={{city,date,rate:fixedRate(slug,city),adults:Math.min(45,Math.max(1,Number(q.adults)||1)),enquiry:!scheduled}}/>:<div className="mx-auto mt-7 max-w-lg"><p className="mb-4 text-sm text-slate-600">Select your departure city and date to continue.</p><FixedDepartureBookingCard slug={slug} title={tour.title} nights={tour.nights}/></div>}</div></main>;
}
