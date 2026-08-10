"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, Search, Users } from "lucide-react";
import { packages } from "@/data/packages";

const todayIso=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`};
const cleanPlace=(value:string)=>value.trim().replace(/\s+/g," ");

export default function HeroSearch(){
 const router=useRouter();
 const [destination,setDestination]=useState("");
 const [travelDate,setTravelDate]=useState("");
 const [travellers,setTravellers]=useState(2);
 const [showSuggestions,setShowSuggestions]=useState(false);

 const destinations=useMemo(()=>{
  const places=new Set<string>();
  packages.forEach((pkg:any)=>{
   if(pkg.destination)String(pkg.destination).split(/•|,|\||–|—|\//).map(cleanPlace).filter(Boolean).forEach((p:string)=>places.add(p));
   if(pkg.state)places.add(cleanPlace(String(pkg.state)));
  });
  return Array.from(places).sort((a,b)=>a.localeCompare(b));
 },[]);

 const suggestions=useMemo(()=>{
  const q=destination.trim().toLowerCase();
  if(!q)return destinations.slice(0,12);
  return destinations.filter(place=>place.toLowerCase().includes(q)).sort((a,b)=>{const al=a.toLowerCase(),bl=b.toLowerCase();return (al.startsWith(q)?0:1)-(bl.startsWith(q)?0:1)||a.localeCompare(b)}).slice(0,12);
 },[destination,destinations]);

 const handleSearch=()=>{
  const q=destination.trim();
  if(!q){alert("Please enter a destination.");return;}
  const params=new URLSearchParams();
  params.set("q",q);
  if(travelDate)params.set("date",travelDate);
  params.set("travellers",String(travellers));
  router.push(`/packages?${params.toString()}`);
 };

 return <div className="relative overflow-visible rounded-[32px] border border-white/30 bg-white/10 p-5 font-semibold backdrop-blur-3xl shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px] bg-gradient-to-r from-cyan-400/10 via-white/5 to-blue-500/10"/>
  <div className="relative z-10 grid grid-cols-1 gap-5 lg:grid-cols-4">
   <div className="relative rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/15 hover:shadow-lg">
    <div className="mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 font-bold text-cyan-300" strokeWidth={2.5}/><span className="text-xs font-bold uppercase tracking-widest text-white/90">Destination</span></div>
    <input type="text" value={destination} onFocus={()=>setShowSuggestions(true)} onChange={e=>{setDestination(e.target.value);setShowSuggestions(true)}} onKeyDown={e=>{if(e.key==="Enter")handleSearch();if(e.key==="Escape")setShowSuggestions(false)}} placeholder="Type Varanasi, Goa, Gujarat..." autoComplete="off" className="w-full bg-transparent text-lg font-bold text-white outline-none placeholder:text-white/75"/>
    {showSuggestions&&<div className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 max-h-72 overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 text-slate-900 shadow-2xl">{suggestions.length?suggestions.map(place=><button key={place} type="button" onMouseDown={e=>e.preventDefault()} onClick={()=>{setDestination(place);setShowSuggestions(false)}} className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left font-bold transition hover:bg-cyan-50 hover:text-cyan-800"><MapPin className="h-4 w-4 shrink-0 text-cyan-600"/>{place}</button>):<div className="px-3 py-3 text-sm font-semibold text-slate-500">No matching destination found.</div>}</div>}
   </div>
   <div className="rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/15 hover:shadow-lg">
    <div className="mb-3 flex items-center gap-2"><Calendar className="h-5 w-5 font-bold text-cyan-300" strokeWidth={2.5}/><span className="text-xs font-bold uppercase tracking-widest text-white/90">Travel Date</span></div>
    <input type="date" min={todayIso()} value={travelDate} onChange={e=>setTravelDate(e.target.value)} className="w-full bg-transparent text-lg font-bold text-slate-900 outline-none"/>
   </div>
   <div className="rounded-3xl border border-white/25 bg-white/10 p-5 backdrop-blur-xl transition-all duration-300 hover:border-cyan-400 hover:bg-white/15 hover:shadow-lg">
    <div className="mb-3 flex items-center gap-2"><Users className="h-5 w-5 font-bold text-cyan-300" strokeWidth={2.5}/><span className="text-xs font-bold uppercase tracking-widest text-white/90">Travellers</span></div>
    <div className="flex items-center justify-between"><button type="button" onClick={()=>setTravellers(p=>Math.max(1,p-1))} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 text-xl font-bold text-white shadow-sm">−</button><span className="text-2xl font-extrabold text-white drop-shadow-md">{travellers}</span><button type="button" onClick={()=>setTravellers(p=>p+1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/20 text-xl font-bold text-white shadow-sm">+</button></div>
   </div>
   <button type="button" onClick={handleSearch} className="group flex items-center justify-center gap-3 rounded-3xl border border-cyan-400/40 bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 px-6 py-5 text-lg font-extrabold text-white shadow-[0_15px_40px_rgba(6,182,212,0.35)] transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"><Search className="h-5 w-5" strokeWidth={2.5}/>Search Tours</button>
  </div>
 </div>;
}
