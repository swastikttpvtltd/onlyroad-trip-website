import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Punjab Tour Packages | Only Road Trip", description: "Explore Punjab tour packages covering Amritsar, Golden Temple and cultural experiences with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/punjab" } };

export default function Page() { return <DestinationLandingPage title="Punjab" eyebrow="Spiritual & Heritage Tours" description="Experience Amritsar, the Golden Temple and Punjab's heritage, food and culture through comfortable, customisable journeys." state="Punjab" matches={["amritsar", "golden temple", "punjab", "wagah"]} />; }
