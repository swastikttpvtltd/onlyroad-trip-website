import { Utensils, Hotel, Bus, Plane } from "lucide-react";
import type { PackageCardServices } from "@/features/fixedDepartures/lib/packageCardServices";
export default function PackageServiceIcons({ services }: { services: PackageCardServices }) {
  const items = [
    { label: "Meals", included: services.meals, Icon: Utensils },
    { label: "Hotel", included: services.hotel, Icon: Hotel },
    { label: "Transport", included: services.transport, Icon: Bus },
    { label: services.flights ? "Flights" : "No Flights", included: services.flights, Icon: Plane },
  ];
  return <div aria-label="Package services" className="mt-4 grid grid-cols-4 gap-1 border-t border-slate-100 pt-3">{items.map(({label, included, Icon}) => <div key={label} title={label + (included ? " included" : " not included")} aria-label={label + (included ? " included" : " not included")} className={"flex min-w-0 flex-col items-center gap-1.5 py-1 text-center " + (included ? "text-blue-800" : "text-slate-400")}><Icon size={19} strokeWidth={1.65} aria-hidden="true"/><span className="text-[10px] font-medium leading-4">{label}</span></div>)}</div>;
}
