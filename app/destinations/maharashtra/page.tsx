import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Maharashtra Tour Packages | Only Road Trip", description: "Explore Maharashtra tour packages for Mumbai, Lonavala, Shirdi, Nashik and heritage experiences with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/maharashtra" } };

export default function Page() { return <DestinationLandingPage title="Maharashtra" eyebrow="Heritage & Pilgrimage" description="Discover Mumbai, Lonavala, Shirdi, Nashik and other Maharashtra experiences through flexible holiday and pilgrimage itineraries." state="Maharashtra" matches={["mumbai", "lonavala", "shirdi", "nashik", "maharashtra"]} />; }
