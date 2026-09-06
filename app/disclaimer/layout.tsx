import type { Metadata } from "next";
import LegalSchema from "@/components/LegalSchema";
export const metadata: Metadata = { title: "Disclaimer | Only Road Trip", description: "Read the Only Road Trip disclaimer covering travel information, third-party services, pricing, availability and booking information.", alternates: { canonical: "https://www.onlyroadtrip.com/disclaimer" } };
export default function Layout({ children }: { children: React.ReactNode }) { return <><LegalSchema title="Disclaimer" path="disclaimer" />{children}</>; }
