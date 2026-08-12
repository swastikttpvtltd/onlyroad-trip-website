import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Leh Ladakh Tour Packages | Only Road Trip", description: "Explore Leh Ladakh tour packages and road trips with Only Road Trip, including scenic mountain routes and customised travel planning.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/ladakh" } };

export default function Page() { return <DestinationLandingPage title="Leh Ladakh" eyebrow="Mountain Road Trips" description="Experience high-altitude Ladakh through Leh, scenic mountain routes and adventure-led road trips planned around your dates and travel style." state="Ladakh" matches={["ladakh", "leh", "nubra", "pangong", "khardung"]} />; }
