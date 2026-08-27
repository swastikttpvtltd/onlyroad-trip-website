import type { Metadata } from "next";
import StatePackagesLanding from "@/components/StatePackagesLanding";

export const metadata: Metadata = {
  title: "Gujarat Tour Packages | Only Road Trip",
  description: "Explore all live Gujarat tour packages by Only Road Trip.",
  alternates: { canonical: "/packages/gujarat" },
};

export default function Page() {
  return <StatePackagesLanding state="Gujarat" />;
}
