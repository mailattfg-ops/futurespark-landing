import { NextResponse, type NextRequest } from "next/server";
import { leadAttribution } from "@/lib/lead-attribution";

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json();
    // Meta match keys: read from this request, forwarded to the backend's CAPI call.
    const body = { ...raw, ...leadAttribution(req, raw?.eventId) };

    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/partial-leads/complete` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/partial-leads/complete` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/partial-leads/complete` : null,
      "https://api.finquo.ai/api/partial-leads/complete",
      "https://app.finquo.ai/api/partial-leads/complete",
      !isVercel ? "http://127.0.0.1:3002/courses/partial-leads/complete" : null,
      !isVercel ? "http://127.0.0.1:3000/api/partial-leads/complete" : null,
      !isVercel ? "http://localhost:3002/courses/partial-leads/complete" : null,
      !isVercel ? "http://localhost:3000/api/partial-leads/complete" : null,
    ].filter(Boolean) as string[];

    let lastErrorDetails = "";

    for (const url of candidateEndpoints) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data, { status: response.status });
        } else {
          const errorText = await response.text();
          lastErrorDetails = `Endpoint ${url} responded with status ${response.status}: ${errorText}`;
        }
      } catch (err: any) {
        lastErrorDetails = `Failed to connect to ${url}: ${err?.message || err}`;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: `Failed to connect to backend service. Details: ${lastErrorDetails}`,
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Error in /api/partial-leads/complete proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to complete partial lead request" },
      { status: 500 }
    );
  }
}
