import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Gujarat Tour Packages | Only Road Trip", description: "Explore Gujarat tour packages covering Dwarka, Somnath, Rann of Kutch, Statue of Unity and heritage experiences with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/gujarat" } };

export default function Page() { return <DestinationLandingPage title="Gujarat" eyebrow="Heritage & Pilgrimage Tours" description="Experience Gujarat through Dwarka and Somnath pilgrimages, the Rann of Kutch, Statue of Unity and vibrant heritage destinations." state="Gujarat" matches={["dwarka", "somnath", "rann of kutch", "kutch", "statue of unity", "ahmedabad"]} />; }
