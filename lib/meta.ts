// Meta Pixel standard-event helper.
// Standard events: "Lead", "CompleteRegistration", "Purchase" ({ value, currency }), etc.
// Anything of our own goes through `trackCustom` below.
// Pass `eventId` for events the backend also sends through the Conversions API,
// so Meta deduplicates the browser and server copies instead of counting both.
export const track = (event: string, params?: Record<string, unknown>, eventId?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
  }
};

/**
 * A custom event — anything that is not one of Meta's standard names.
 *
 * Funnel steps of our own ("started booking a demo") must go through here, not
 * `track`. Borrowing a standard e-commerce name like InitiateCheckout for them
 * teaches Meta's model the wrong thing about this audience, and reusing "Lead"
 * for a step short of submission inflates the conversion the ads optimise on.
 */
export const trackCustom = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("trackCustom", event, params ?? {});
  }
};

/** One id per submission, shared by the pixel event and the request body. */
export const newEventId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
