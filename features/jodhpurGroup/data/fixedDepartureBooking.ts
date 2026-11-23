import { departureStartingPrices } from "@/features/jodhpurGroup/data/fixedDeparturePresentation";
import { getVaranasiDepartures, getVaranasiStartingPrice, departureCities, addScheduleDays } from "@/features/jodhpurGroup/data/varanasiDepartureSchedule";
export { departureCities };
export const fixedNights: Record<string,number> = {"varanasi-prayagraj-ayodhya":4,"varanasi-ayodhya-prayagraj-gaya-bodh-gaya":5,"char-dham-yatra":10,"delhi-agra-jaipur-golden-triangle":4,"gujarat-grand-tour":8,"amarnath-yatra-kashmir":4,"kashmir-4n5d-review":4};
export function fixedRate(slug:string,city:string) { if(!departureCities.includes(city)) throw Error("Select a departure city."); return slug.startsWith("varanasi") ? getVaranasiStartingPrice(fixedNights[slug],city) : departureStartingPrices[slug]; }
export function fixedLeadDays(date:string, now=new Date()) {const today=new Intl.DateTimeFormat("en-CA",{timeZone:"Asia/Kolkata",year:"numeric",month:"2-digit",day:"2-digit"}).format(now); return Math.round((Date.parse(date+"T12:00:00Z")-Date.parse(today+"T12:00:00Z"))/86400000);}
export function fixedDates(slug:string,now=new Date()) {return slug.startsWith("varanasi") ? getVaranasiDepartures(fixedNights[slug]).filter(d=>fixedLeadDays(d.date,now)>=7) : [];}
export function fixedCheckout(id:string,date:string,travellers:number,now=new Date()) {
const [prefix,slug,city,extra]=id.split(":"); if(prefix!=="FD"||extra!==undefined||!Object.hasOwn(fixedNights,slug)||!departureCities.includes(city)) throw Error("Invalid fixed departure selection.");
if(!Number.isInteger(travellers)||travellers<1||travellers>45)throw Error("Select 1 to 45 adults.");
if(!fixedDates(slug,now).some(d=>d.date===date))throw Error("This departure is unavailable for online payment. Please select an available departure.");
const rate=fixedRate(slug,city),total=rate*travellers,advance=fixedLeadDays(date,now)>=30?Math.ceil(total*.3):total;
return {rate,total,advance,balance:total-advance,returnDate:addScheduleDays(date,fixedNights[slug]),paymentType:advance<total?"advance":"full",sharing:"Ex "+city+" • Twin Sharing",duration:fixedNights[slug]+" Nights / "+(fixedNights[slug]+1)+" Days"};
}
export function validateFixedPayment(context:Record<string,unknown>,amount:number) {const id=String(context.packageId||"");if(!id.startsWith("FD:"))return;const result=fixedCheckout(id,String(context.departure||context.date||""),Number(context.travellers));if(amount!==result.advance||Number(context.total)!==result.total||Number(context.rate)!==result.rate)throw Error("Package costing changed or is invalid. Please return to the booking page.");}

export function formatFixedDate(value:string){return value?new Date(value+"T12:00:00Z").toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric",timeZone:"Asia/Kolkata"}):"Dates awaited";}

// Planning slots only: never use these as officially announced opening dates or payable inventory.
export const yatraPlanningWindows:Record<string,{start:string;end:string;registration?:string;checked:string;authority:string;source:string}>={
"char-dham-yatra":{start:"2027-05-15",end:"2027-11-05",checked:"6 November 2026",authority:"BKTC",source:"https://badrinath-kedarnath.gov.in/",registration:"Choose your preferred date and send a booking request. Our team will check availability and guide you through registration once the official 2027 shrine dates are announced."},
"amarnath-yatra-kashmir":{start:"2027-07-03",end:"2027-08-17",checked:"6 November 2026",authority:"Shri Amarnathji Shrine Board",source:"https://jksasb.nic.in/",registration:"Choose your preferred date and send a booking request. We will check availability and guide you through the official registration and permit process once the Shrine Board announces its 2027 schedule."}
};
export function fixedDepartureOptions(slug:string,now=new Date()){
if(slug.startsWith("varanasi"))return fixedDates(slug,now);
const schedule=standardDepartureWindows[slug];
if(schedule){
const result:{date:string;returnDate:string;startingPrice:number}[]=[];
for(let date=schedule.start;addScheduleDays(date,fixedNights[slug])<=schedule.end;date=addScheduleDays(date,4)){
if(fixedLeadDays(date,now)<0)continue;
if(schedule.visitDay && new Date(addScheduleDays(date,schedule.visitDay-1)+"T12:00:00Z").getUTCDay()===schedule.closedWeekday)continue;
result.push({date,returnDate:addScheduleDays(date,fixedNights[slug]),startingPrice:departureStartingPrices[slug]});
}
return result;
}
const window=yatraPlanningWindows[slug];if(!window)return [];
const result:{date:string;returnDate:string;startingPrice:number}[]=[];
for(let date=window.start;addScheduleDays(date,fixedNights[slug])<=window.end;date=addScheduleDays(date,4)){if(fixedLeadDays(date,now)>=7)result.push({date,returnDate:addScheduleDays(date,fixedNights[slug]),startingPrice:departureStartingPrices[slug]});}
return result;
}

// Owner requested 6 November starts. Keep four-day spacing and the current season's 31 March horizon.
// Closure checks use the sightseeing day, not the departure weekday.
export const standardDepartureWindows:Record<string,{start:string;end:string;visitDay?:number;closedWeekday?:number;note:string}>={
"delhi-agra-jaipur-golden-triangle":{start:"2026-11-06",end:"2027-03-31",visitDay:3,closedWeekday:5,note:"Departures start 6 November 2026, generally four days apart. Dates placing the Day 3 Taj Mahal visit on Friday are excluded."},
"gujarat-grand-tour":{start:"2026-11-06",end:"2027-03-31",visitDay:2,closedWeekday:1,note:"Departures start 6 November 2026, generally four days apart. Dates placing the Day 2 Statue of Unity visit on Monday are excluded."},
"kashmir-4n5d-review":{start:"2026-11-06",end:"2027-03-31",note:"Departures start 6 November 2026, every four days within this season. Mountain access and optional activities depend on weather and local permissions."}
};
