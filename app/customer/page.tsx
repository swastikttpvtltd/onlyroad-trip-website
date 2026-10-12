import type { Metadata } from "next";
import CustomerPortal from "@/components/customer/CustomerPortal";
export const metadata: Metadata = { title: "Customer Portal", robots: { index: false, follow: false }, alternates: { canonical: "/customer" } };
export default function Page() { return <CustomerPortal />; }
