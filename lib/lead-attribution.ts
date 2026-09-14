import type { NextRequest } from "next/server";

/**
 * What Meta needs to match our server-side Lead to the browser that fired the
 * pixel. Read here, on the website's own route, because this is the only hop
 * that still sees the visitor: by the time the request reaches the backend the
 * IP is Vercel's and the User-Agent is Node's. `_fbp`/`_fbc` are the pixel's
 * first-party cookies, so they arrive on every same-origin form post.
 */
export function leadAttribution(req: NextRequest, eventId: unknown) {
  const forwardedFor = req.headers.get("x-forwarded-for")?.split(",")[0].trim();
  return {
    // Same id the pixel used for its Lead, so Meta counts the pair once.
    eventId: typeof eventId === "string" && eventId.trim() ? eventId.trim() : undefined,
    clientIpAddress: forwardedFor || req.headers.get("x-real-ip") || undefined,
    clientUserAgent: req.headers.get("user-agent") || undefined,
    fbp: req.cookies.get("_fbp")?.value || undefined,
    fbc: req.cookies.get("_fbc")?.value || undefined,
    eventSourceUrl: req.headers.get("referer") || undefined,
  };
}
