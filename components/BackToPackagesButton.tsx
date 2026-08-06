"use client";

import { useRouter } from "next/navigation";

export default function BackToPackagesButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/15 px-4 py-2 text-sm font-bold text-white shadow-lg backdrop-blur-md transition hover:bg-white/25"
      aria-label="Back to packages"
    >
      <span aria-hidden="true">←</span>
      Back to Packages
    </button>
  );
}
