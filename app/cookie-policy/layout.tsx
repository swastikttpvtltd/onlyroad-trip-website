import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/siteSeo";
export const metadata = pageMetadata("Cookie Policy", "Information about cookies and tracking on the Only Road Trip website.", "/cookie-policy");
export default function Layout({ children }: { children: ReactNode }) { return children; }
