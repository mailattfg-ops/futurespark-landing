// Meta Pixel standard-event helper. Call ONLY after the backend confirms success.
// Standard events: "Lead", "CompleteRegistration", "Purchase" ({ value, currency }), etc.
export const track = (event: string, data?: object) => {
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", event, data);
  }
};
