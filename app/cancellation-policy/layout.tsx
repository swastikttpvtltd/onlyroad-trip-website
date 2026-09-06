import type { Metadata } from "next";
import LegalSchema from "@/components/LegalSchema";
export const metadata: Metadata = { title: "Cancellation Policy | Only Road Trip", description: "Read the Only Road Trip cancellation policy, applicable cancellation charges, supplier terms and booking cancellation conditions." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><LegalSchema title="Cancellation Policy" path="cancellation-policy" />{children}</>; }
