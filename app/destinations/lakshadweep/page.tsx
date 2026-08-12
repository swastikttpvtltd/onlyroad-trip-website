import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Lakshadweep Tour Packages | Only Road Trip", description: "Explore Lakshadweep island holidays and customised beach escapes with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/lakshadweep" } };

export default function Page() { return <DestinationLandingPage title="Lakshadweep" eyebrow="Island Holidays" description="Plan a peaceful Lakshadweep island escape with beach experiences, practical travel planning and personalised package support." matches={["lakshadweep", "island", "beach", "kavaratti", "agatti"]} />; }
