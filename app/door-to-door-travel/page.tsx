import type { Metadata } from "next";
import DoorToDoorClient from "./DoorToDoorClient";

export const metadata: Metadata = {
  title: "Door-to-Door Travel | Only Road Trip",
  description: "Personally coordinated journeys from your first pickup to your final drop. Explore senior-friendly, women’s, international visitor, NRI and family travel.",
  alternates: { canonical: "https://www.onlyroadtrip.com/door-to-door-travel" },
};

export default function DoorToDoorPage() {
  return <DoorToDoorClient />;
}
