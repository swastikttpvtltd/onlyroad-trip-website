import StatePackagesLanding from "@/components/StatePackagesLanding";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Himachal Pradesh Tour Packages | Only Road Trip",
  description: "Explore all live Himachal Pradesh tour packages with detailed itineraries, inclusions, pricing and booking options.",
  alternates: { canonical: "/packages/himachal-pradesh" },
};

export default function Page() {
  return <StatePackagesLanding state="Himachal Pradesh" />;
}
