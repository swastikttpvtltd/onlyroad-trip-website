import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Odisha Tour Packages | Only Road Trip", description: "Explore Odisha tour packages, temple journeys, heritage experiences and coastal holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/odisha" } };

export default function Page() { return <DestinationLandingPage title="Odisha" eyebrow="Temple & Heritage Tours" description="Discover Odisha's temples, heritage, coastline and cultural experiences through flexible travel itineraries and personalised planning." state="Odisha" matches={["odisha", "puri", "jagannath", "bhubaneswar", "konark"]} />; }
