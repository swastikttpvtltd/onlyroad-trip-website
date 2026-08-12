import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Assam Tour Packages | Only Road Trip", description: "Explore Assam tour packages for Guwahati, Kaziranga and Northeast India nature holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/assam" } };

export default function Page() { return <DestinationLandingPage title="Assam" eyebrow="Northeast India & Wildlife" description="Explore Guwahati, Kaziranga and Assam's wildlife, tea landscapes and culture through thoughtfully planned Northeast India holidays." state="Assam" matches={["guwahati", "kaziranga", "assam", "northeast"]} />; }
