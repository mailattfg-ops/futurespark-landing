/**
 * The four mentors (change brief F5). Photos and profiles are the ones already
 * published on webinar.finquo.ai. `grades` and `quote` are left empty until
 * marketing supplies them; the cards leave room and show nothing for an empty value.
 */
export interface Mentor {
  slug: string;
  name: string;
  role: string;
  profile: string;
  photo: string;
  /** e.g. "Grades 5 to 8" — to come from marketing */
  grades: string;
  /** One sentence in the mentor's own words — to come from marketing */
  quote: string;
}

export const MENTORS: Mentor[] = [
  {
    slug: "praveen",
    name: "CA Praveen P K",
    role: "Chartered Accountant (CA, CPA Aus/ASA)",
    profile:
      "Chartered Accountant and management consultant based in Kerala, helping businesses across India and the UAE with financial strategy, tax and compliance.",
    photo: "/mentors/praveen.webp",
    grades: "",
    quote: "",
  },
  {
    slug: "malavika",
    name: "Malavika P S",
    role: "Finquo Junior Master Mentor",
    profile:
      "MA in Rural Development and Governance (TISS) with 3+ years in education, learner engagement and programme coordination.",
    photo: "/mentors/malavika.webp",
    grades: "",
    quote: "",
  },
  {
    slug: "lakshmi",
    name: "Lakshmi Priya P",
    role: "Finquo Junior Master Mentor",
    profile: "BBA LL.B., Diploma in GST, 2.5+ years of experience in education, marketing, sales and operations.",
    photo: "/mentors/lakshmi.webp",
    grades: "",
    quote: "",
  },
  {
    slug: "mazina",
    name: "Mazina Thameem P",
    role: "Finquo Junior Master Mentor",
    profile:
      "Master's in Educational Psychology, specialising in play-based and alternate education and learning experience design.",
    photo: "/mentors/mazina.webp",
    grades: "",
    quote: "",
  },
];

/**
 * Two blocks under the mentor cards that marketing will write. Each renders
 * only when its body is non-empty, so nothing half-written reaches the page.
 */
export const MENTOR_PAGE_BLOCKS = [
  { heading: "How mentors are chosen and trained", body: "" },
  { heading: "How children are kept safe", body: "" },
];
