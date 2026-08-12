import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Goa Tour Packages | Only Road Trip", description: "Explore Goa tour packages, beach holidays and customised Goa escapes with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/goa" } };

export default function Page() { return <DestinationLandingPage title="Goa" eyebrow="Beach Holidays" description="Plan a Goa holiday with beach time, sightseeing, leisure and flexible stays suited to couples, families and groups." state="Goa" matches={["goa", "beach", "north goa", "south goa"]} />; }
