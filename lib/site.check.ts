/**
 * Self-check for the next-webinar date. Run: npx tsx lib/site.check.ts
 */
import assert from "assert";
import { nextWebinar, webinarDay } from "./site";

const at = (iso: string) => webinarDay(nextWebinar(new Date(iso)));

assert.strictEqual(at("2026-10-10T06:00:00Z"), "Thursday 15 Oct", "before the first session: the first session");
assert.strictEqual(at("2026-10-12T15:00:00Z"), "Thursday 15 Oct", "no Monday 12 Oct session; the series starts on the 15th");
assert.strictEqual(at("2026-10-15T14:00:00Z"), "Thursday 15 Oct", "7:30 PM IST on the day: still that evening");
assert.strictEqual(at("2026-10-15T15:20:00Z"), "Thursday 15 Oct", "during the session");
assert.strictEqual(at("2026-10-15T15:31:00Z"), "Monday 19 Oct", "an hour after the start: the next one");
assert.strictEqual(at("2026-10-19T20:00:00Z"), "Thursday 22 Oct", "late Monday night in India: Thursday");
assert.strictEqual(at("2026-10-21T19:00:00Z"), "Thursday 22 Oct", "00:30 Thursday in India is already Thursday");
assert.strictEqual(nextWebinar(new Date("2026-10-10T00:00:00Z")).toISOString(), "2026-10-15T14:30:00.000Z", "8:00 PM IST");
console.log("next-webinar: all checks passed");
