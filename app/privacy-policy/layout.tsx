import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/siteSeo";
export const metadata = pageMetadata("Privacy Policy", "How Only Road Trip handles personal information provided through its travel website.", "/privacy-policy");
export default function Layout({ children }: { children: ReactNode }) { return children; }
