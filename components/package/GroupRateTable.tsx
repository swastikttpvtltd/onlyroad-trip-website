"use client";
import { groupRateRows } from "@/data/groupRateMatrix";

export default function GroupRateTable({ rates, fixedSharing = false }: {
  rates?: { [pax: number]: number }; fixedSharing?: boolean;
}) {
  const rows = groupRateRows(rates);
  if (!rows.length) return null;
  return <section className="border-t border-slate-200 bg-white px-5 py-5">
    <h3 className="text-lg font-extrabold text-slate-900">Group-wise Package Pricing</h3>
    <p className="mt-1 text-xs text-slate-500">Per person • Double / twin sharing • 5% GST included</p>
    {fixedSharing && <p className="mt-2 text-xs text-slate-500">This package has fixed room-sharing rates for every group size.</p>}
    <div className="mt-3 max-h-80 overflow-auto rounded-xl border border-slate-200 print:max-h-none print:overflow-visible">
      <table className="w-full text-sm">
        <thead className="sticky top-0 bg-slate-50 print:static"><tr><th className="px-3 py-3 text-left font-bold text-slate-600">Group Size</th><th className="px-3 py-3 text-right font-bold text-slate-600">Per Person</th></tr></thead>
        <tbody>{rows.map(({ pax, price }) => <tr key={pax} className="border-t border-slate-200"><td className="px-3 py-3 font-bold text-slate-800">{pax} Travellers</td><td className="px-3 py-3 text-right font-extrabold text-[#153e75]">₹{price.toLocaleString("en-IN")}/-</td></tr>)}</tbody>
      </table>
    </div>
  </section>;
}
