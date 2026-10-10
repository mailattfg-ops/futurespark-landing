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
  schedule: "Every Monday and Thursday, 8:00 PM IST",
  times: "8:00 PM India · 6:30 PM UAE · 5:30 PM Saudi Arabia and Qatar",
  menuLabel: "Free Webinar · Mon and Thu",
};

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
