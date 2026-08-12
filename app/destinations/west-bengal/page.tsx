import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "West Bengal Tour Packages | Only Road Trip", description: "Explore West Bengal tour packages for Kolkata, Darjeeling and cultural holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/west-bengal" } };

export default function Page() { return <DestinationLandingPage title="West Bengal" eyebrow="Culture & Himalayan Tours" description="Combine Kolkata's culture with Darjeeling and other West Bengal experiences through flexible, comfortable holiday planning." state="West Bengal" matches={["darjeeling", "kolkata", "west bengal"]} />; }
