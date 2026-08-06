"use client";

import { useMemo, useState } from "react";

type Rates = Record<string, number>;
type Props = { packageTitle?: string; packageId?: string; groupRates?: Rates };

const blocked: Record<string,string> = {
  "2026-10-20":"Dussehra",
  "2026-11-08":"Diwali",
  "2026-11-24":"Dev Deepawali",
  "2026-12-25":"Christmas",
  "2026-12-31":"New Year's Eve",
  "2027-01-01":"New Year",
  "2027-01-26":"Republic Day",
};

const iso=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
const addDays=(n:number)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return iso(d)};

function rateForPax(rates:Rates|undefined,pax:number){
  if(!rates)return 0;
  if(pax<=2)return rates["2"]??0;
  if(pax<=4)return rates["4"]??rates["2"]??0;
  if(pax<=6)return rates["6"]??rates["4"]??0;
  if(pax<=12)return rates["12"]??rates["6"]??0;
  if(pax<=16)return rates["16"]??rates["12"]??0;
  if(pax<=20)return rates["20"]??rates["16"]??0;
  if(pax<=25)return rates["25"]??rates["20"]??0;
  if(pax<=30)return rates["30"]??rates["25"]??0;
  return rates["30+"]??rates["30"]??0;
}

export default function BookingForm({packageTitle="Tour Package",packageId="",groupRates}:Props) {
  const [name,setName]=useState(""); const [phone,setPhone]=useState(""); const [email,setEmail]=useState("");
  const [travelDate,setTravelDate]=useState(""); const [adults,setAdults]=useState(2); const [children,setChildren]=useState(0);
  const [nationality,setNationality]=useState("Indian"); const [dob,setDob]=useState(""); const [idType,setIdType]=useState("Aadhaar"); const [idNumber,setIdNumber]=useState(""); const [message,setMessage]=useState("");
  const totalPax=Math.max(1,adults+children); const pp=rateForPax(groupRates,totalPax); const total=pp*totalPax;
  const minBookDate=addDays(7); const festival=blocked[travelDate];
  const selectedLead=useMemo(()=>travelDate?Math.ceil((new Date(`${travelDate}T12:00:00`).getTime()-new Date().setHours(12,0,0,0))/86400000):999,[travelDate]);
  const enquiryOnly=selectedLead>=0&&selectedLead<7;

  function handleSubmit(e:React.FormEvent){e.preventDefault();if(festival){alert(`${festival}: Online booking is closed for this travel date. Please send an enquiry.`);return;}alert(enquiryOnly?"Enquiry submitted. Our team will confirm urgent availability.":"Booking request submitted successfully. Our team will confirm availability and payment details.");}

  return <section id="booking" className="rounded-3xl bg-white p-6 shadow-xl md:p-8">
    <h2 className="text-3xl font-bold text-slate-900">Book This Tour</h2><p className="mt-2 text-slate-600">{packageTitle}{packageId?` • ${packageId}`:""}</p>
    <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm text-slate-700"><b>Online booking:</b> travel date must be at least 7 days from today. For travel within 1–6 days, submit an urgent enquiry. Major festival/holiday dates shown below are enquiry-only.</div>
    <div className="mt-4 flex flex-wrap gap-2 text-xs">{Object.entries(blocked).map(([date,label])=><span key={date} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-rose-700"><span className="mr-1 text-rose-500">●</span>{label} • {new Date(`${date}T12:00:00`).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>)}</div>
    <form onSubmit={handleSubmit} className="mt-7 space-y-5">
      <div className="grid gap-5 md:grid-cols-2"><Field label="Full Name"><input required value={name} onChange={e=>setName(e.target.value)} className="input" placeholder="Enter full name"/></Field><Field label="Mobile Number"><input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} className="input" placeholder="9876543210"/></Field></div>
      <div className="grid gap-5 md:grid-cols-2"><Field label="Email Address"><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input" placeholder="name@email.com"/></Field><Field label="Nationality"><input required value={nationality} onChange={e=>setNationality(e.target.value)} className="input"/></Field></div>
      <div className="grid gap-5 md:grid-cols-2"><Field label="Date of Birth"><input required type="date" max={addDays(0)} value={dob} onChange={e=>setDob(e.target.value)} className="input"/></Field><Field label="Travel Date"><input required type="date" min={addDays(1)} value={travelDate} onChange={e=>setTravelDate(e.target.value)} className="input"/><p className={`mt-2 text-xs ${festival||enquiryOnly?"text-rose-600":"text-slate-500"}`}>{festival?`● ${festival} — online booking closed; enquiry only.`:enquiryOnly?`● Travel is within 7 days — urgent enquiry only.`:`Online booking opens from ${new Date(`${minBookDate}T12:00:00`).toLocaleDateString("en-IN")}.`}</p></Field></div>
      <div className="grid gap-5 md:grid-cols-2"><Field label="ID Type"><select value={idType} onChange={e=>setIdType(e.target.value)} className="input"><option>Aadhaar</option><option>PAN</option><option>Passport</option><option>Other Government ID</option></select></Field><Field label={`${idType} Number`}><input required value={idNumber} onChange={e=>setIdNumber(e.target.value)} className="input" placeholder="Enter ID number"/></Field></div>
      <div className="grid gap-5 md:grid-cols-2"><Field label="Adults"><input type="number" min={1} value={adults} onChange={e=>setAdults(Number(e.target.value))} className="input"/></Field><Field label="Children"><input type="number" min={0} value={children} onChange={e=>setChildren(Number(e.target.value))} className="input"/></Field></div>
      {pp>0&&<div className="rounded-2xl bg-slate-950 p-5 text-white"><div className="flex justify-between text-sm"><span>Applicable group slab</span><b>{totalPax} Traveller{totalPax!==1?"s":""}</b></div><div className="mt-2 flex justify-between"><span>Rate per person</span><b className="text-xl">₹{pp.toLocaleString("en-IN")}</b></div><div className="mt-2 flex justify-between border-t border-white/20 pt-3"><span>Estimated package total</span><b className="text-xl text-cyan-300">₹{total.toLocaleString("en-IN")}</b></div><p className="mt-2 text-xs text-white/60">Final availability, child policy and applicable supplements are confirmed before payment.</p></div>}
      <Field label="Special Request"><textarea rows={4} value={message} onChange={e=>setMessage(e.target.value)} className="input" placeholder="Room preference, accessibility, pickup or other requirements..."/></Field>
      <button type="submit" className={`w-full rounded-xl py-4 text-lg font-bold text-white transition ${festival||enquiryOnly?"bg-orange-600 hover:bg-orange-700":"bg-cyan-600 hover:bg-cyan-700"}`}>{festival||enquiryOnly?"Send Enquiry":"Book Now"}</button>
    </form>
    <style jsx>{`.input{width:100%;border:1px solid #cbd5e1;border-radius:.75rem;padding:.75rem;outline:none}.input:focus{border-color:#0891b2;box-shadow:0 0 0 2px rgba(8,145,178,.1)}`}</style>
  </section>;
}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div><label className="mb-2 block font-semibold text-slate-800">{label}</label>{children}</div>}
