import { NextRequest } from "next/server";
import { portalHandler } from "@/portal/server";
export const runtime = "nodejs";
type Context = { params: Promise<{ path: string[] }> };
export async function GET(request: NextRequest, context: Context) { return portalHandler(request, (await context.params).path); }
export async function POST(request: NextRequest, context: Context) { return portalHandler(request, (await context.params).path); }
