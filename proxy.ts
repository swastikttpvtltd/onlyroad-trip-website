import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(
      new URL("/" + routing.defaultLocale, request.url)
    );
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    "/",
    "/(en|hi|zh|es|ar|fr|bn|ja|ko|ru|pt|de)(/.*)?",
  ],
};
