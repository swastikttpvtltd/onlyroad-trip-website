import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/siteSeo";
export const metadata = pageMetadata("Terms & Conditions", "Terms governing Only Road Trip travel services, bookings and website use.", "/terms-and-conditions");
export default function Layout({ children }: { children: ReactNode }) { return children; }
