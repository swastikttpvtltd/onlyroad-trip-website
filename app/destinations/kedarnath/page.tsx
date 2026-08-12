import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Kedarnath Tour Packages | Only Road Trip", description: "Plan a Kedarnath Dham Yatra with Only Road Trip, including flexible itineraries, transport, stays and pilgrimage travel assistance.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/kedarnath" } };

export default function Page() { return <DestinationLandingPage title="Kedarnath" eyebrow="Himalayan Pilgrimage" description="Plan a meaningful Kedarnath Dham Yatra with practical travel planning, suitable stays, transport coordination and support for pilgrims." matches={["kedarnath", "kedarnath dham", "chopta", "tungnath", "uttarakhand"]} />; }
