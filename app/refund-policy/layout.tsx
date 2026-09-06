import type { Metadata } from "next";
import LegalSchema from "@/components/LegalSchema";
export const metadata: Metadata = { title: "Refund Policy | Only Road Trip", description: "Read the Only Road Trip refund policy and understand refund eligibility, processing and applicable supplier conditions." };
export default function Layout({ children }: { children: React.ReactNode }) { return <><LegalSchema title="Refund Policy" path="refund-policy" />{children}</>; }
