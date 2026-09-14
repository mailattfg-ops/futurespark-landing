// Meta Pixel standard-event helper.
// Standard events: "InitiateCheckout", "Lead", "CompleteRegistration", "Purchase" ({ value, currency }), etc.
// Pass `eventId` for events the backend also sends through the Conversions API,
// so Meta deduplicates the browser and server copies instead of counting both.
export const track = (event: string, params?: Record<string, unknown>, eventId?: string) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params ?? {}, eventId ? { eventID: eventId } : undefined);
  }
};

/** One id per submission, shared by the pixel event and the request body. */
export const newEventId = (): string =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
