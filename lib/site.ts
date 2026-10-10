/**
 * The facts every page quotes, in one place (change brief §2).
 * Copy that repeats across sections lives here so it cannot drift.
 */

export const LEGAL_NAME = "FinQuo Versity And Edutech Private Limited";

export const PRICE = "₹29,000 + GST";
export const PROOF_LINE = "190+ families have joined a Finquo Junior class.";
export const FOOTER_TAGLINE =
  "Raising a financially secure generation through weekly 1-on-1 financial literacy mentorship for Grades 5 to 8.";

export const CONTACT = {
  phone: "+91 97450 01121",
  phoneHref: "tel:+919745001121",
  whatsappHref: "https://wa.me/919745001121",
  email: "info@finquo.ai",
  uaePhone: "+971 54 368 9895",
  uaePhoneHref: "tel:+971543689895",
  instagram: "https://www.instagram.com/finquojunior",
  facebook: "https://www.facebook.com/finquojunior",
};

export const WEBINAR = {
  times: "8:00 PM India · 6:30 PM UAE · 5:30 PM Saudi Arabia and Qatar",
  menuLabel: "Free Webinar",
};

/*
 * Webinar dates. Families see only the next session, never the weekly rule.
 * Sessions run every Monday and Thursday at 8:00 PM IST, the first on Thursday
 * 15 Oct 2026. A session counts as "next" until an hour after it starts.
 */
const WEBINAR_FIRST = Date.UTC(2026, 9, 15); // 15 Oct 2026, as a calendar date
const WEBINAR_DAYS = [1, 4]; // Monday, Thursday
const IST_OFFSET_MIN = 330;
const START_IST_MIN = 20 * 60; // 8:00 PM
const SHOWN_UNTIL_MIN = 60; // after the start

/** The start of the next webinar, as an instant. */
export function nextWebinar(now: Date = new Date()): Date {
  const istNow = now.getTime() + IST_OFFSET_MIN * 60_000;
  const today = Math.floor(istNow / 86_400_000) * 86_400_000; // today's date in India
  for (let day = Math.max(today, WEBINAR_FIRST); ; day += 86_400_000) {
    if (!WEBINAR_DAYS.includes(new Date(day).getUTCDay())) continue;
    const start = day + (START_IST_MIN - IST_OFFSET_MIN) * 60_000;
    if (now.getTime() < start + SHOWN_UNTIL_MIN * 60_000) return new Date(start);
  }
}

/** "Thursday, 15 Oct" in India time. */
export const webinarDay = (d: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Kolkata", weekday: "long", day: "numeric", month: "short" }).format(d);

export const DEMO_LABEL = "Book Free Demo Class";
export const WEBINAR_LABEL = "Reserve Free Webinar Seat";

/** Where on finquo.ai a link sits, so the demo CRM can see which placement sent the family. */
export type Placement =
  | "header"
  | "hero"
  | "course_card"
  | "price"
  | "roadmap"
  | "webinar_block"
  | "faq"
  | "footer"
  | "bonus"
  | "graduation"
  | "mentors"
  | "about"
  | "curriculum";

const utm = (placement: Placement) =>
  `utm_source=finquo.ai&utm_medium=referral&utm_campaign=${placement}`;

export const demoUrl = (placement: Placement) => `https://demo.finquo.ai/?${utm(placement)}`;
export const webinarUrl = (placement: Placement) => `https://webinar.finquo.ai/register?${utm(placement)}`;
