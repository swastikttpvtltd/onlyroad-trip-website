import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Karnataka Tour Packages | Only Road Trip", description: "Explore Karnataka tour packages for Coorg, Mysore, Bengaluru and South India heritage holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/karnataka" } };

export default function Page() { return <DestinationLandingPage title="Karnataka" eyebrow="South India Holidays" description="Discover Coorg, Mysore, Bengaluru and Karnataka's heritage, nature and culture through customisable travel itineraries." state="Karnataka" matches={["coorg", "kodagu", "mysore", "mysuru", "hampi", "karnataka"]} />; }
