import { getCloudflareContext } from "@opennextjs/cloudflare";

export const runtime = "nodejs";

type PartialLeadBody = {
  partialId?: string;
  fullName?: string;
  mobile?: string;
  countryCode?: string;
  email?: string;
  destination?: string;
  travelDate?: string;
};

type D1DatabaseLike = {
  prepare: (query: string) => {
    bind: (...values: unknown[]) => {
      run: () => Promise<unknown>;
    };
  };
};

const clean = (value: unknown, maxLength: number) =>
  typeof value === "string" ? value.trim().slice(0, maxLength) : "";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as PartialLeadBody;

    const partialId = clean(body.partialId, 100);
    const fullName = clean(body.fullName, 120);
    const mobile = clean(body.mobile, 30);
    const countryCode = clean(body.countryCode, 10);
    const email = clean(body.email, 254).toLowerCase();
    const destination = clean(body.destination, 160);
    const travelDate = clean(body.travelDate, 20);

    if (!partialId || (!mobile && !email)) {
      return Response.json({ error: "A partial ID and contact detail are required." }, { status: 400 });
    }

    const { env: cloudflareEnv } = getCloudflareContext();
    const db = (cloudflareEnv as unknown as Record<string, unknown>).DB as D1DatabaseLike | undefined;

    if (!db) {
      return Response.json({ error: "Lead capture is temporarily unavailable." }, { status: 503 });
    }

    const sourcePage = request.headers.get("referer") || new URL(request.url).origin;

    await db
      .prepare(
        `INSERT INTO partial_leads (
          partial_id, full_name, mobile, country_code, email, destination, travel_date, source, source_page
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'website', ?)
        ON CONFLICT(partial_id) DO UPDATE SET
          full_name = CASE WHEN excluded.full_name <> '' THEN excluded.full_name ELSE partial_leads.full_name END,
          mobile = CASE WHEN excluded.mobile <> '' THEN excluded.mobile ELSE partial_leads.mobile END,
          country_code = CASE WHEN excluded.country_code <> '' THEN excluded.country_code ELSE partial_leads.country_code END,
          email = CASE WHEN excluded.email <> '' THEN excluded.email ELSE partial_leads.email END,
          destination = CASE WHEN excluded.destination <> '' THEN excluded.destination ELSE partial_leads.destination END,
          travel_date = CASE WHEN excluded.travel_date <> '' THEN excluded.travel_date ELSE partial_leads.travel_date END,
          source_page = excluded.source_page,
          updated_at = CURRENT_TIMESTAMP`
      )
      .bind(partialId, fullName, mobile, countryCode, email, destination, travelDate, sourcePage)
      .run();

    return Response.json({ success: true });
  } catch (error) {
    console.error("Partial lead capture failed:", error);
    return Response.json({ error: "Unable to capture lead." }, { status: 500 });
  }
}
