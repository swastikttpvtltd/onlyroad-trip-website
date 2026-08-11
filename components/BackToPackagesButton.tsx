"use client";

import { useRouter } from "next/navigation";

export default function BackToPackagesButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-1.5 rounded-lg border border-white/35 bg-black/20 px-3 py-1.5 text-xs font-semibold text-white shadow-md backdrop-blur-md transition hover:bg-white/20 sm:px-3.5 sm:py-2 sm:text-sm"
      aria-label="Back to packages"
    >
      <span aria-hidden="true">←</span>
      Back to Packages
    </button>
  );
}
