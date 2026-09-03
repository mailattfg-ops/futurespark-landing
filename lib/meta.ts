// Meta Pixel standard-event helper.
// Standard events: "InitiateCheckout", "Lead", "CompleteRegistration", "Purchase" ({ value, currency }), etc.
export const track = (event: string, params?: Record<string, unknown>) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, params);
  }
};

