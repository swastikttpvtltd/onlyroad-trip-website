"use client";
import Link from "next/link";
import {useMemo,useState} from "react";
type Rates=Record<string,number>; type Props={packageTitle?:string;packageId?:string;groupRates?:Rates};
const blocked:Record<string,string>={"2026-10-20":"Dussehra","2026-11-08":"Diwali","2026-11-24":"Dev Deepawali","2026-12-25":"Christmas","2026-12-31":"New Year's Eve","2027-01-01":"New Year","2027-01-26":"Republic Day"};
const iso=(d:Date)=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; const addDays=(n:number)=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return iso(d)};
function rateForPax(r:Rates|undefined,p:number){if(!r)return 0;if(p<=2)return r["2"]??0;if(p<=4)return r["4"]??r["2"]??0;if(p<=6)return r["6"]??r["4"]??0;if(p<=12)return r["12"]??r["6"]??0;if(p<=16)return r["16"]??r["12"]??0;if(p<=20)return r["20"]??r["16"]??0;if(p<=25)return r["25"]??r["20"]??0;if(p<=30)return r["30"]??r["25"]??0;return r["30+"]??r["30"]??0}
export default function BookingForm({packageTitle,packageId,groupRates}:Props){if(!packageTitle||!groupRates)return null;const[name,setName]=useState(""),[phone,setPhone]=useState(""),[email,setEmail]=useState(""),[travelDate,setTravelDate]=useState(""),[adults,setAdults]=useState(2),[children,setChildren]=useState(0),[nationality,setNationality]=useState("Indian"),[dob,setDob]=useState(""),[idType,setIdType]=useState("Aadhaar"),[idNumber,setIdNumber]=useState(""),[message,setMessage]=useState(""),[room,setRoom]=useState("double"),[accepted,setAccepted]=useState(false);
const totalPax=Math.max(1,adults+children);
const basePP=rateForPax(groupRates,totalPax);
const singlePP=Math.ceil(basePP*1.38/500)*500;
const roomOptions=useMemo(()=>{const rooms=Math.ceil(totalPax/2);return[{id:"double",name:`${rooms} Double Room${rooms>1?"s":""} with Double Bed`,pp:basePP},{id:"single",name:`${totalPax} Single Room${totalPax>1?"s":""}`,pp:singlePP},{id:"twin",name:`${rooms} Twin Room${rooms>1?"s":""} with Twin Bed`,pp:basePP}]},[totalPax,basePP,singlePP]);
const selected=roomOptions.find(x=>x.id===room)??roomOptions[0];

const billingPax=Math.max(2,totalPax);
const singleTravellerAdjustment=totalPax===1;
const subtotal=selected.pp*billingPax;
const gst=Math.round(subtotal*.05),grand=subtotal+gst,reserve=4000*billingPax,balance=Math.max(0,grand-reserve);
const festival=blocked[travelDate],minBookDate=addDays(7);const lead=useMemo(()=>travelDate?Math.ceil((new Date(`${travelDate}T12:00:00`).getTime()-new Date().setHours(12,0,0,0))/86400000):999,[travelDate]),enquiryOnly=lead>=0&&lead<7,reserveEligible=!!travelDate&&lead>=30;const balanceDue=travelDate&&reserveEligible?(()=>{const d=new Date(`${travelDate}T12:00:00`);d.setDate(d.getDate()-20);return d.toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})})():"";

async function submit(e:React.FormEvent){
  e.preventDefault();
  if(!accepted){
    alert("Please accept the Terms & Conditions and Cancellation Policy before continuing.");
    return;
  }
  
  if(festival || enquiryOnly){
    alert("Enquiry submitted successfully. Our team will confirm urgent/special-date availability with you shortly.");
    return;
  }

  try {
    const payableAmount = reserveEligible ? reserve : grand;

    const response = await fetch("/api/payment-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: payableAmount,
        purpose: packageTitle || "Tour Package Booking",
        customer_name: name,
        customer_email: email,
        customer_phone: phone,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`Payment API Error: ${data.error || "Failed to create payment link"}`);
      return;
    }

    const redirectUrl = data.link_url || data.url || data.paymentUrl || data.payment_link;

    if (redirectUrl) {
      window.location.href = redirectUrl;
    } else {
      alert(`Payment Error: ${JSON.stringify(data)}`);
    }
  } catch (err: any) {
    console.error("Payment error:", err);
    alert(`Network Error: ${err.message || err}`);
  }
}

return <section id="booking" className="scroll-mt-28"><div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_360px]"><div className="rounded-3xl bg-white p-6 shadow-xl md:p-8"><h2 className="text-3xl font-bold">Book This Tour</h2><p className="mt-2 font-medium text-slate-600">{packageTitle}{packageId?` • ${packageId}`:""}</p><div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4 text-sm"><b>Online booking:</b> minimum 7 days advance. Travel within 1–6 days and blocked festival dates are enquiry-only.</div><div className="mt-4 flex flex-wrap gap-2 text-xs">{Object.entries(blocked).map(([d,l])=><span key={d} className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1.5 text-rose-700">● {l} • {new Date(`${d}T12:00:00`).toLocaleDateString("en-IN",{day:"2-digit",month:"short",year:"numeric"})}</span>)}</div><form id="tour-booking-form" onSubmit={submit} className="mt-7 space-y-5"><div className="grid gap-5 md:grid-cols-2"><Field label="Full Name"><input required value={name} onChange={e=>setName(e.target.value)} className="input"/></Field><Field label="Mobile Number"><input required type="tel" value={phone} onChange={e=>setPhone(e.target.value)} className="input"/></Field><Field label="Email Address"><input required type="email" value={email} onChange={e=>setEmail(e.target.value)} className="input"/></Field><Field label="Nationality"><input required value={nationality} onChange={e=>setNationality(e.target.value)} className="input"/></Field><Field label="Date of Birth"><input required type="date" max={addDays(0)} value={dob} onChange={e=>setDob(e.target.value)} className="input"/></Field><Field label="Travel Date"><input required type="date" min={addDays(1)} value={travelDate} onChange={e=>setTravelDate(e.target.value)} className="input"/><p className={`mt-2 text-xs ${festival||enquiryOnly?"text-rose-600":"text-slate-500"}`}>{festival?`● ${festival} — booking closed; enquiry only.`:enquiryOnly?"● Within 7 days — urgent enquiry only.":reserveEligible?"● Pay & Reserve available for this travel date.":`Online booking available. Pay & Reserve becomes available for travel at least 30 days ahead.`}</p></Field><Field label="ID Type"><select value={idType} onChange={e=>setIdType(e.target.value)} className="input"><option>Aadhaar</option><option>PAN</option><option>Passport</option><option>Other Government ID</option></select></Field><Field label={`${idType} Number`}><input required value={idNumber} onChange={e=>setIdNumber(e.target.value)} className="input"/></Field><Field label="Adults"><input type="number" min={1} value={adults} onChange={e=>setAdults(Number(e.target.value))} className="input"/></Field><Field label="Children"><input type="number" min={0} value={children} onChange={e=>setChildren(Number(e.target.value))} className="input"/></Field></div><div className="rounded-2xl border border-slate-200 p-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-500 text-xl font-extrabold text-white">3</span><h3 className="text-2xl font-extrabold">Select Accommodation</h3></div><p className="mt-3 text-slate-600">Select your preferred room type. Pricing updates with traveller count.</p>{singleTravellerAdjustment&&<div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900"><b>Single Traveller Pricing:</b> This package is priced on twin/double sharing. For one traveller, the minimum charge is equivalent to 2 persons.</div>}<div className="mt-5 overflow-x-auto"><table className="w-full border-collapse"><thead><tr className="bg-slate-50 text-left"><th className="border p-3">Room Type</th><th className="border p-3">Price / Person</th><th className="border p-3 text-center">Selection</th></tr></thead><tbody>{roomOptions.map(o=><tr key={o.id} className={room===o.id?"bg-blue-50":""}><td className="border p-3 font-bold">{o.name}</td><td className="border p-3 font-extrabold">₹{o.pp.toLocaleString("en-IN")}</td><td className="border p-3 text-center"><input type="radio" name="room" checked={room===o.id} onChange={()=>setRoom(o.id)} className="h-5 w-5 accent-blue-700"/></td></tr>)}</tbody></table></div></div><Field label="Special Request"><textarea rows={4} value={message} onChange={e=>setMessage(e.target.value)} className="input"/></Field><div className="rounded-xl border bg-slate-50 p-4"><label className="flex gap-3"><input required type="checkbox" checked={accepted} onChange={e=>setAccepted(e.target.checked)} className="mt-1 h-4 w-4 accent-blue-700"/><span className="text-sm">I have read and agree to the <Link href="/terms-and-conditions" target="_blank" className="font-bold text-blue-700 underline">Terms & Conditions</Link> and <Link href="/cancellation-policy" target="_blank" className="font-bold text-blue-700 underline">Cancellation Policy</Link>.</span></label></div><button type="submit" className={`w-full rounded-xl py-4 text-lg font-bold text-white xl:hidden ${festival||enquiryOnly?"bg-orange-600":"bg-cyan-600"}`}>{festival||enquiryOnly?"Send Enquiry":"Book Now"}</button></form></div><aside className="xl:sticky xl:top-28">{basePP>0&&<div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"><div className="bg-slate-950 px-5 py-4 text-xl font-extrabold text-white">Price Summary</div><div className="space-y-3 p-5"><p className="text-xs font-bold uppercase tracking-wide text-slate-400">{packageTitle}</p>{singleTravellerAdjustment&&<div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-5 text-amber-900"><b>Single traveller:</b> billed at the minimum 2-person twin/double-sharing rate.</div>}<Row label={`₹${selected.pp.toLocaleString("en-IN")} × ${billingPax} billing place${billingPax>1?"s":""}`} value={subtotal}/><Row label="GST @ 5%" value={gst}/><div className="border-t pt-3"><Row label="Total Amount" value={grand} strong/></div>{reserveEligible&&<div className="rounded-xl bg-blue-50 p-4"><p className="text-xs font-bold uppercase tracking-wide text-blue-600">Pay & Reserve</p><div className="mt-2 flex justify-between gap-3 font-bold text-blue-950"><span>₹4,000 × {billingPax} billing place${billingPax>1?"s":""}</span><span>₹{reserve.toLocaleString("en-IN")}</span></div><div className="mt-3 flex justify-between gap-3 border-t border-blue-100 pt-3 text-sm"><span>Balance Amount</span><b>₹{balance.toLocaleString("en-IN")}</b></div>{balanceDue&&<p className="mt-3 text-xs leading-5 text-blue-900">Full balance payment due by <b>{balanceDue}</b><br/>(20 days before travel date)</p>}</div>}{travelDate&&!reserveEligible&&lead>=7&&<div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs leading-5 text-amber-900"><b>Pay & Reserve is not available.</b><br/>This option is available only when the selected travel date is at least 30 days from today. Full booking payment will apply after confirmation.</div>}<p className="text-xs leading-5 text-slate-500">Reservation is subject to availability and confirmation.</p><button type="submit" form="tour-booking-form" className={`hidden w-full rounded-xl py-3.5 text-base font-bold text-white xl:block ${festival||enquiryOnly?"bg-orange-600":"bg-cyan-600"}`}>{festival||enquiryOnly?"Send Enquiry":"Book Now"}</button></div></div>}</aside></div><style jsx>{`.input{width:100%;border:1px solid #cbd5e1;border-radius:.75rem;padding:.75rem;outline:none}.input:focus{border-color:#0891b2;box-shadow:0 0 0 2px rgba(8,145,178,.1)}`}</style></section>}
function Field({label,children}:{label:string;children:React.ReactNode}){return <div><label className="mb-2 block font-semibold text-slate-800">{label}</label>{children}</div>} function Row({label,value,strong=false}:{label:string;value:number;strong?:boolean}){return <div className={`flex justify-between gap-3 ${strong?"text-lg font-extrabold":"text-sm text-slate-700"}`}><span>{label}</span><span className="shrink-0">₹{value.toLocaleString("en-IN")}</span></div>}