import { getCloudflareContext } from "@opennextjs/cloudflare";
import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      fullName,
      mobile,
      email,
      destination,
      travelDate,
      travellers,
      travelType,
      budget,
      message,
    } = body;

    if (
      !fullName ||
      !mobile ||
      !destination ||
      !travelDate ||
      !travellers ||
      !travelType ||
      !message
    ) {
      return NextResponse.json(
        {
          error: "Please complete all required travel enquiry fields.",
        },
        { status: 400 },
      );
    }

    // Cloudflare runtime bindings are available through getCloudflareContext().
    // process.env is kept as a fallback for local development.
    const context = await getCloudflareContext({ async: true });

    const cloudflareEnv = (context?.env ?? {}) as Record<
      string,
      string | undefined
    >;

    const readEnv = (name: string) => {
      const runtimeValue = cloudflareEnv[name];

      if (runtimeValue) {
        return runtimeValue;
      }

      return process.env[name];
    };

    /*
     * ============================================================
     * SMTP CONFIGURATION
     * ============================================================
     *
     * These values come from Cloudflare Variables & Secrets:
     *
     * SMTP_HOST
     * SMTP_PORT
     * SMTP_USER
     * SMTP_PASSWORD
     * SMTP_FROM
     * SMTP_CC
     */

    const host =
      readEnv("SMTP_HOST") ||
      "smtp.zoho.in";

    const port = Number(
      readEnv("SMTP_PORT") || "465",
    );

    const secure =
      String(
        readEnv("SMTP_SECURE") ??
          (port === 465),
      ).toLowerCase() === "true";

    const user =
      readEnv("SMTP_USER") ||
      "";

    const pass =
      readEnv("SMTP_PASSWORD") ||
      "";

    const from =
      readEnv("SMTP_FROM") ||
      user;

    const cc =
      readEnv("SMTP_CC") ||
      undefined;

    /*
     * The enquiry should be delivered to the official
     * Only Road Trip email address.
     *
     * SMTP_TO is optional. If it isn't configured,
     * info@onlyroadtrip.com is used automatically.
     */
    const to =
      readEnv("SMTP_TO") ||
      "info@onlyroadtrip.com";

    /*
     * ============================================================
     * VALIDATE SMTP CONFIGURATION
     * ============================================================
     */

    const missing: string[] = [];

    if (!host) {
      missing.push("SMTP_HOST");
    }

    if (!port) {
      missing.push("SMTP_PORT");
    }

    if (!user) {
      missing.push("SMTP_USER");
    }

    if (!pass) {
      missing.push("SMTP_PASSWORD");
    }

    if (!from) {
      missing.push("SMTP_FROM");
    }

    if (missing.length > 0) {
      console.error(
        "Travel enquiry email configuration missing:",
        missing,
      );

      return NextResponse.json(
        {
          error: "Email service is not configured yet.",
          missing,
        },
        { status: 500 },
      );
    }

    /*
     * ============================================================
     * CREATE SMTP TRANSPORTER
     * ============================================================
     */

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    /*
     * ============================================================
     * SEND EMAIL
     * ============================================================
     *
     * From:
     * info@onlyroadtrip.com
     *
     * To:
     * info@onlyroadtrip.com
     *
     * CC:
     * swastikttpvtltd@gmail.com
     *
     * Reply-To:
     * Customer's email address
     */

    await transporter.sendMail({
      from,
      to,
      cc,

      replyTo: email || undefined,

      subject: `New Travel Enquiry — ${destination} — ${fullName}`,

      /*
       * Plain-text version
       */
      text: [
        "NEW TRAVEL ENQUIRY",
        "",
        `Full Name: ${fullName}`,
        `Mobile: ${mobile}`,
        `Email: ${email || "Not provided"}`,
        `Destination: ${destination}`,
        `Travel Date: ${travelDate}`,
        `Travellers: ${travellers}`,
        `Travel Type: ${travelType}`,
        `Approx. Budget: ${budget || "Not specified"}`,
        "",
        "Requirements / Message:",
        message,
        "",
        "----------------------------------------",
        "Only Road Trip",
        "Swastik Tour And Travels Private Limited",
      ].join("\n"),

      /*
       * HTML version
       */
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <title>New Travel Enquiry</title>
          </head>

          <body
            style="
              margin:0;
              padding:0;
              background:#f1f5f9;
              font-family:Arial,Helvetica,sans-serif;
              color:#0f172a;
            "
          >

            <div
              style="
                max-width:680px;
                margin:30px auto;
                background:#ffffff;
                border-radius:16px;
                overflow:hidden;
                border:1px solid #e2e8f0;
              "
            >

              <!-- Header -->

              <div
                style="
                  background:linear-gradient(135deg,#0f172a,#1e3a8a);
                  padding:28px 30px;
                  color:#ffffff;
                "
              >

                <div
                  style="
                    font-size:12px;
                    font-weight:bold;
                    letter-spacing:2px;
                    text-transform:uppercase;
                    color:#bfdbfe;
                    margin-bottom:8px;
                  "
                >
                  ONLY ROAD TRIP
                </div>

                <h1
                  style="
                    margin:0;
                    font-size:26px;
                    line-height:1.3;
                    color:#ffffff;
                  "
                >
                  New Travel Enquiry
                </h1>

                <p
                  style="
                    margin:8px 0 0;
                    color:#dbeafe;
                    font-size:14px;
                  "
                >
                  A new customer enquiry has been received from the website.
                </p>

              </div>

              <!-- Customer Details -->

              <div style="padding:28px 30px 10px;">

                <h2
                  style="
                    margin:0 0 16px;
                    font-size:18px;
                    color:#0f172a;
                  "
                >
                  Customer Details
                </h2>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="border-collapse:collapse;"
                >

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        width:38%;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Full Name
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#0f172a;
                        font-size:14px;
                        font-weight:bold;
                      "
                    >
                      ${escapeHtml(String(fullName))}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Mobile
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#0f172a;
                        font-size:14px;
                        font-weight:bold;
                      "
                    >
                      ${escapeHtml(String(mobile))}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Email
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#0f172a;
                        font-size:14px;
                      "
                    >
                      ${escapeHtml(String(email || "Not provided"))}
                    </td>
                  </tr>

                </table>

              </div>

              <!-- Trip Details -->

              <div style="padding:18px 30px 10px;">

                <h2
                  style="
                    margin:0 0 16px;
                    font-size:18px;
                    color:#0f172a;
                  "
                >
                  Trip Details
                </h2>

                <table
                  width="100%"
                  cellpadding="0"
                  cellspacing="0"
                  style="border-collapse:collapse;"
                >

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        width:38%;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Destination
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#0f172a;
                        font-size:14px;
                        font-weight:bold;
                      "
                    >
                      ${escapeHtml(String(destination))}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Travel Date
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#0f172a;
                        font-size:14px;
                      "
                    >
                      ${escapeHtml(String(travelDate))}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Travellers
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#0f172a;
                        font-size:14px;
                      "
                    >
                      ${escapeHtml(String(travellers))}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Travel Type
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        border-bottom:1px solid #e2e8f0;
                        color:#0f172a;
                        font-size:14px;
                      "
                    >
                      ${escapeHtml(String(travelType))}
                    </td>
                  </tr>

                  <tr>
                    <td
                      style="
                        padding:10px 0;
                        color:#64748b;
                        font-size:13px;
                        font-weight:bold;
                      "
                    >
                      Approx. Budget
                    </td>

                    <td
                      style="
                        padding:10px 0;
                        color:#0f172a;
                        font-size:14px;
                      "
                    >
                      ${escapeHtml(String(budget || "Not specified"))}
                    </td>
                  </tr>

                </table>

              </div>

              <!-- Requirements -->

              <div style="padding:18px 30px 30px;">

                <h2
                  style="
                    margin:0 0 12px;
                    font-size:18px;
                    color:#0f172a;
                  "
                >
                  Requirements / Message
                </h2>

                <div
                  style="
                    background:#f8fafc;
                    border:1px solid #e2e8f0;
                    border-radius:12px;
                    padding:16px;
                    color:#334155;
                    font-size:14px;
                    line-height:1.7;
                  "
                >
                  ${escapeHtml(String(message)).replace(/\n/g, "<br />")}
                </div>

              </div>

              <!-- Footer -->

              <div
                style="
                  padding:18px 30px;
                  background:#f8fafc;
                  border-top:1px solid #e2e8f0;
                  text-align:center;
                "
              >

                <div
                  style="
                    font-weight:bold;
                    color:#1e3a8a;
                    font-size:14px;
                  "
                >
                  Only Road Trip
                </div>

                <div
                  style="
                    margin-top:4px;
                    color:#64748b;
                    font-size:12px;
                  "
                >
                  Swastik Tour And Travels Private Limited
                </div>

              </div>

            </div>

          </body>
        </html>
      `,
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(
      "Travel enquiry email failed:",
      error,
    );

    return NextResponse.json(
      {
        error:
          "Unable to send the enquiry right now. Please try again or contact us directly.",
      },
      { status: 500 },
    );
  }
}

/**
 * Escape user-provided values before inserting them
 * into the HTML email.
 */
function escapeHtml(value: string) {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[character] || character,
  );
}