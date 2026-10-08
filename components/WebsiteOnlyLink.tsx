"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
export default function WebsiteOnlyLink({ children }: { children: ReactNode }) {
 return usePathname() === "/instagram" ? null : children;
}
