"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const slides = [
 { eyebrow:"WEEKEND ESCAPES", title:"Your Next Weekend, Beautifully Planned.", subtitle:"Kasol • Chopta • Jibhi • Nainital", href:"/packages?theme=weekend", label:"Explore Weekend Trips", image:"/images/hero/hero.png" },
 { eyebrow:"SPIRITUAL & HERITAGE", title:"Meaningful Journeys Across Incredible India.", subtitle:"Somnath • Dwarka • Varanasi • Rajasthan", href:"/packages?theme=spiritual", label:"Explore Spiritual Tours", image:"/images/hero/hero-2.png" },
 { eyebrow:"DOOR-TO-DOOR TRAVEL MANAGEMENT", title:"From Your Doorstep, With Care.", subtitle:"Thoughtfully coordinated journeys for families, seniors and assisted travellers.", href:"/plan-your-trip", label:"Plan Your Journey", image:"/images/hero/hero-3.png" },
];
export default function InstagramHero(){
 const [active,setActive]=useState(0);
 const [paused,setPaused]=useState(false);
 useEffect(()=>{
  if(paused || (typeof window!=="undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches))return;
  const timer=window.setInterval(()=>setActive(v=>(v+1)%slides.length),6500);
  return ()=>window.clearInterval(timer);
 },[paused]);
 const slide=slides[active];
 return <section aria-label="Featured journeys" className="relative isolate overflow-hidden bg-slate-950 text-white" onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)} onFocusCapture={()=>setPaused(true)} onBlurCapture={()=>setPaused(false)}>
  {slides.map((s,i)=><div key={s.title} className={`absolute inset-0 transition-opacity duration-700 ${i===active?"opacity-100":"opacity-0"}`} aria-hidden={i!==active}>
   {/* The first slide is fetched immediately; other slides load only when selected. */}
   {i===active && <img src={s.image} alt="" fetchPriority={i===0?"high":"auto"} className="h-full w-full object-cover absolute inset-0" />}
  </div>)}
  <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-slate-950/30"/>
  <div className="relative mx-auto flex min-h-[480px] max-w-6xl flex-col justify-center px-5 pb-20 pt-32 sm:min-h-[550px] sm:px-8">
   <p className="text-xs font-bold tracking-[.2em] text-cyan-300">{slide.eyebrow}</p>
   <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight sm:text-6xl">{slide.title}</h1>
   <p className="mt-4 max-w-xl text-base text-slate-100 sm:text-lg">{slide.subtitle}</p>
   <div className="mt-7 flex flex-wrap gap-3"><Link href={slide.href} className="rounded-xl bg-blue-700 px-6 py-3 font-bold text-white hover:bg-blue-800">{slide.label}</Link><Link href="/packages" className="rounded-xl border border-white/70 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur-sm">View All Packages</Link></div>
  </div>
  <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-3">
   <button type="button" aria-label="Previous slide" onClick={()=>setActive(v=>(v+slides.length-1)%slides.length)} className="rounded-full border border-white/40 bg-slate-950/30 px-3 py-2 text-white">‹</button>
   {slides.map((s,i)=><button type="button" key={s.title} aria-label={`Show slide ${i+1}`} aria-current={i===active?"true":undefined} onClick={()=>setActive(i)} className={`h-2 rounded-full transition-all ${i===active?"w-8 bg-cyan-300":"w-2 bg-white/60"}`}/>)}
   <button type="button" aria-label="Next slide" onClick={()=>setActive(v=>(v+1)%slides.length)} className="rounded-full border border-white/40 bg-slate-950/30 px-3 py-2 text-white">›</button>
  </div>
 </section>;
}
