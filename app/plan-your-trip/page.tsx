import type { Metadata } from "next";
import PlanYourTripClient from "./PlanYourTripClient";

export const metadata: Metadata = {
  title: "Plan Your Trip | Only Road Trip",
  description: "Plan a customised domestic holiday with Only Road Trip. Share your destination, dates, travellers, travel style and requirements with our travel experts.",
  keywords: ["plan your trip India", "customised tour packages", "custom domestic tour", "family holiday planning", "travel itinerary India"],
  alternates: { canonical: "https://www.onlyroadtrip.com/plan-your-trip" },
};

export default function PlanYourTripPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <PlanYourTripClient />
    </main>
  );
}
