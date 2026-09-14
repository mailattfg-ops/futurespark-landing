/**
 * Self-check for the attribution the website proxy attaches to every lead post.
 * Run: node --experimental-strip-types lib/lead-attribution.check.ts
 */
import assert from "node:assert";
import { NextRequest } from "next/server.js";
// @ts-expect-error -- node --experimental-strip-types needs the explicit extension; tsc does not allow it
import { leadAttribution } from "./lead-attribution.ts";

const req = new NextRequest("https://junior.finquo.ai/api/pilot-leads", {
  method: "POST",
  headers: {
    "x-forwarded-for": "203.0.113.9, 10.0.0.1",
    "user-agent": "Mozilla/5.0 (iPhone) Safari",
    referer: "https://junior.finquo.ai/claim-free-class?fbclid=AbC",
    cookie: "_ga=GA1; _fbp=fb.1.1700000000000.123456; _fbc=fb.1.1700000000000.AbC",
  },
});

assert.deepStrictEqual(leadAttribution(req, " evt-1 "), {
  eventId: "evt-1",
  clientIpAddress: "203.0.113.9",
  clientUserAgent: "Mozilla/5.0 (iPhone) Safari",
  fbp: "fb.1.1700000000000.123456",
  fbc: "fb.1.1700000000000.AbC",
  eventSourceUrl: "https://junior.finquo.ai/claim-free-class?fbclid=AbC",
}, "first x-forwarded-for hop, pixel cookies, referer, trimmed event id");

const bare = new NextRequest("http://localhost:3030/api/leads", { method: "POST" });
assert.deepStrictEqual(
  Object.values(leadAttribution(bare, 42)).filter(Boolean),
  [],
  "nothing invented when the request carries nothing (and a non-string eventId is dropped)"
);

console.log("lead-attribution: 2/2 checks passed");
