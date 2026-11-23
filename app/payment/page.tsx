import Link from "next/link";
import {fixedCheckout} from "@/features/fixedDepartures/data/fixedDepartureBooking";
import {fixedDepartureReviews} from "@/features/fixedDepartures/data/fixedDepartureDetails";
import PaymentSelection from "@/components/PaymentSelection";
import { packages } from "@/data/packages";

export default async function PaymentPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = await searchParams;
  const get = (key: string) => {
    const value = query[key];
    return Array.isArray(value) ? value[0] ?? "" : value ?? "";
  };

  if(get("packageId").startsWith("FD:")){
    let result:ReturnType<typeof fixedCheckout>|null=null;
    try {result=fixedCheckout(get("packageId"),get("date"),Number(get("travellers")));}catch{}
    if(!result)return <main className="px-5 py-24 text-center"><h1 className="text-2xl font-bold">Please select an available departure</h1><Link className="mt-5 inline-block text-blue-800 underline" href="/fixed-departures">Return to fixed departures</Link></main>;
    const tour=fixedDepartureReviews.find(t=>t.slug===get("packageId").split(":")[1]);return <PaymentSelection booking={{packageTitle:tour?.title||"Fixed Departure",packageId:get("packageId"),duration:result.duration,departure:get("date"),returnDate:result.returnDate,sharing:result.sharing,travellers:Number(get("travellers")),billingPax:Number(get("travellers")),paymentType:result.paymentType,rate:result.rate,total:result.total,advance:result.advance,balance:result.balance,name:get("name"),phone:get("phone"),email:get("email"),purpose:get("purpose")}}/>;
  }
  const packageTitle = get("title");
  const pkg = packages.find(
    (item: any) => String(item.title).toLowerCase() === packageTitle.toLowerCase(),
  );
  const duration = get("duration") || String(pkg?.duration ?? "");
  const travellers = Number(get("travellers") || 1);
  const advance = Number(get("advance") || 0);
  const total = Number(get("total") || (advance ? Math.round(advance / 0.3) : 0));
  const rate = Number(get("rate") || (travellers ? Math.round(total / travellers) : 0));

  return (
    <PaymentSelection
      booking={{
        packageTitle,
        packageId: get("packageId") || String(pkg?.packageId ?? ""),
        duration,
        departure: get("date"),
        returnDate: get("returnDate"),
        sharing: get("sharing"),
        travellers,
        billingPax: Number(get("billingPax") || travellers),
        paymentType: get("paymentType") || "advance",
        rate,
        total,
        advance,
        balance: Number(get("balance") || Math.max(0, total - advance)),
        name: get("name"),
        phone: get("phone"),
        email: get("email"),
        purpose: get("purpose"),
      }}
    />
  );
}
