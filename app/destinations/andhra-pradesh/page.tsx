import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Andhra Pradesh Tour Packages | Only Road Trip", description: "Explore customised Andhra Pradesh tour packages, Tirupati pilgrimage journeys, Vizag holidays and South India travel with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/andhra-pradesh" } };

export default function Page() { return <DestinationLandingPage title="Andhra Pradesh" eyebrow="South India Tours" description="Discover Tirupati, Vizag, Araku and other Andhra Pradesh experiences with flexible itineraries, comfortable stays and personalised travel support." state="Andhra Pradesh" matches={["tirupati", "tirupati balaji", "vizag", "visakhapatnam", "araku"]} />; }
