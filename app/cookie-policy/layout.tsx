import type { Metadata } from "next";
import LegalSchema from "@/components/LegalSchema";
export const metadata: Metadata = { title: "Cookie Policy | Only Road Trip", description: "Read the Only Road Trip cookie policy covering cookies, analytics, tracking technologies and website preferences.", alternates: { canonical: "https://www.onlyroadtrip.com/cookie-policy" } };
export default function Layout({ children }: { children: React.ReactNode }) { return <><LegalSchema title="Cookie Policy" path="cookie-policy" />{children}</>; }
