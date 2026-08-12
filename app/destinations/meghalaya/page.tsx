import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Meghalaya Tour Packages | Only Road Trip", description: "Explore Meghalaya tour packages for Shillong, Cherrapunji and Northeast India nature holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/meghalaya" } };

export default function Page() { return <DestinationLandingPage title="Meghalaya" eyebrow="Northeast India Tours" description="Explore Shillong, Cherrapunji and Meghalaya's waterfalls, caves and green landscapes with thoughtfully planned Northeast India holidays." state="Meghalaya" matches={["shillong", "cherrapunji", "sohra", "meghalaya", "northeast"]} />; }
