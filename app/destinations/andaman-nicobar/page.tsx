import type { Metadata } from "next";
import DestinationLandingPage from "@/components/DestinationLandingPage";

export const metadata: Metadata = { title: "Andaman Tour Packages | Only Road Trip", description: "Explore Andaman and Nicobar tour packages for Havelock, Swaraj Dweep, island beaches and relaxed holidays with Only Road Trip.", alternates: { canonical: "https://www.onlyroadtrip.com/destinations/andaman-nicobar" } };

export default function Page() { return <DestinationLandingPage title="Andaman & Nicobar" eyebrow="Island & Beach Holidays" description="Plan an Andaman escape across Havelock, Swaraj Dweep and beautiful island beaches with flexible stays and travel support." state="Andaman & Nicobar Islands" matches={["andaman", "havelock", "swaraj dweep", "shaheed dweep", "neil island"]} />; }
