import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Sikkim Tour Packages | Only Road Trip", description: "Explore Sikkim and Gangtok tour packages, North Sikkim holidays and Himalayan escapes with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/sikkim" } };

export default function Page() { return <DestinationLandingPage title="Sikkim" eyebrow="Himalayan Holidays" description="Discover Gangtok, North Sikkim and mountain landscapes through comfortable, flexible itineraries for families, couples and groups." state="Sikkim" matches={["gangtok", "north sikkim", "sikkim"]} />; }
