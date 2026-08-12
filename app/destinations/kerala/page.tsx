import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Kerala Tour Packages | Only Road Trip", description: "Explore Kerala tour packages for Munnar, Alleppey, Kovalam and backwater holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/kerala" } };

export default function Page() { return <DestinationLandingPage title="Kerala" eyebrow="Backwaters & South India" description="Enjoy Kerala through Munnar hills, Alleppey backwaters, Kovalam beaches and relaxed family or couple holidays." state="Kerala" matches={["munnar", "alleppey", "alappuzha", "kovalam", "kerala backwaters"]} />; }
