import { NextResponse } from "next/server";

/**
 * A family moving their own demo, proxied to the backend's public
 * /leads/:id/reschedule-request.
 *
 * The portal used to POST a whole new lead for this, which duplicated the
 * family in the CRM on every click, left the real booking untouched (so the new
 * date vanished on refresh) and sent another WhatsApp pointing at the duplicate.
 * This updates the one booking the id names.
 *
 * Endpoint candidates mirror ../route.ts: the deployment does not always know
 * which backend host answers, so the first that responds wins. A refusal from
 * the backend (an unavailable slot, an unknown lead) is passed straight through
 * so the parent sees the real reason rather than a generic failure.
 */
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    if (!id || id.trim().length === 0) {
      return NextResponse.json({ success: false, message: "Lead ID is required." }, { status: 400 });
    }

    const body = await req.json().catch(() => ({}));
    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
    const path = `leads/${id}/reschedule-request`;

    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/${path}` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/${path}` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/${path}` : null,
      `https://api.finquo.ai/api/${path}`,
      `https://app.finquo.ai/api/${path}`,
      `https://app.finquo.ai/api/courses/${path}`,
      !isVercel ? `http://127.0.0.1:3002/courses/${path}` : null,
      !isVercel ? `http://127.0.0.1:3000/api/${path}` : null,
      !isVercel ? `http://localhost:3002/courses/${path}` : null,
      !isVercel ? `http://localhost:3000/api/${path}` : null,
    ].filter(Boolean) as string[];

    let lastRefusal: { message: string; status: number } | null = null;

    for (const url of candidateEndpoints) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json().catch(() => ({}));
          return NextResponse.json({
            success: true,
            data: data.data ?? data,
            message: data.message ?? "Your reschedule request has been sent to our team.",
          });
        }

        /* A 4xx is the backend ANSWERING — an unavailable slot, a lead that does
         * not exist. Remember it, but keep trying the other hosts in case this
         * one simply has no such route; report it only if none succeed. */
        if (response.status >= 400 && response.status < 500) {
          const data = await response.json().catch(() => null);
          if (data?.message) lastRefusal = { message: data.message, status: response.status };
        }
      } catch {
        // Host unreachable — try the next one.
      }
    }

    if (lastRefusal) {
      return NextResponse.json({ success: false, message: lastRefusal.message }, { status: lastRefusal.status });
    }

    return NextResponse.json(
      { success: false, message: "We couldn't reach our booking system. Please try again, or message us on WhatsApp." },
      { status: 502 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error?.message || "Failed to submit the reschedule request" },
      { status: 500 }
    );
  }
}
