/**
 * The 20-session programme (change brief §6, India version).
 * The homepage roadmap, the curriculum page and the money-habits section all
 * read from here, so a session is renamed in exactly one place.
 */

export const PROGRAMME_NAME = "Foundations of Wealth";
export const TOTAL_SESSIONS = 20;
export const BONUS_SESSIONS = 5;
export const BONUS_SUBJECTS = ["AI", "Public Speaking", "Cyber Awareness"] as const;

export interface Module {
  id: 1 | 2 | 3 | 4 | 5;
  name: string;
  /** First and last session numbers, inclusive. */
  range: [number, number];
  blurb: string;
}

export const MODULES: Module[] = [
  { id: 1, name: "Money Basics", range: [1, 5], blurb: "Where money comes from, and the first choices a child makes with it." },
  { id: 2, name: "Banking & Safety", range: [6, 9], blurb: "Banks, UPI, cards and how to spot a scam." },
  { id: 3, name: "Wider World", range: [10, 13], blurb: "Inflation, tax, insurance and the economy around us." },
  { id: 4, name: "Big Decisions", range: [14, 16], blurb: "Large purchases, long goals and being fair with money." },
  { id: 5, name: "Entrepreneur & Capstone", range: [17, 20], blurb: "A business plan, simple accounts, then build and present a real small business." },
];

export interface Session {
  n: number;
  title: string;
  module: Module["id"];
  /** The Money Habit sticker the child earns at the end of the session. */
  habit: string;
}

export const SESSIONS: Session[] = [
  { n: 1, title: "Why Money? From Barter to UPI", module: 1, habit: "I respect money" },
  { n: 2, title: "Earning Money: Where Money Comes From", module: 1, habit: "I value hard work" },
  { n: 3, title: "Spending Smart: Needs, Wants & Choices", module: 1, habit: "I wait 24 hours before I buy" },
  { n: 4, title: "Budgeting: Making a Money Plan", module: 1, habit: "I plan before I spend" },
  { n: 5, title: "Saving & Investing", module: 1, habit: "I pay myself first" },
  { n: 6, title: "Banking Basics: Your Money's Safe House", module: 2, habit: "I keep my money safe" },
  { n: 7, title: "Digital Money: UPI, Cards & ATMs", module: 2, habit: "I check before I pay" },
  { n: 8, title: "Banking Advanced: Interest, Loans & International Banking", module: 2, habit: "I let money grow" },
  { n: 9, title: "Scams & Frauds: Be a Money Detective", module: 2, habit: "I never share my OTP or PIN" },
  { n: 10, title: "Inflation: Why Prices Rise", module: 3, habit: "I think about future prices" },
  { n: 11, title: "Tax: Our Contribution to the Nation", module: 3, habit: "I always ask for a bill" },
  { n: 12, title: "Insurance: Protecting Against Risk", module: 3, habit: "I prepare for surprises" },
  { n: 13, title: "The Indian & World Economy", module: 3, habit: "I support local where I can" },
  { n: 14, title: "The Big Purchase: Buying a Car", module: 4, habit: "I count the hidden costs" },
  { n: 15, title: "Goal Setting, FIRE Number & Retirement", module: 4, habit: "I start early" },
  { n: 16, title: "Ethical Money: Family, Friends & Fairness", module: 4, habit: "I am fair and honest with money" },
  { n: 17, title: "Business Plan: From Idea to Enterprise", module: 5, habit: "I solve problems" },
  { n: 18, title: "Basics of Accounting: Keeping Score", module: 5, habit: "I write it down" },
  { n: 19, title: "Capstone I: Build Your Business", module: 5, habit: "I finish what I start" },
  { n: 20, title: "Capstone II: Presentation & Graduation", module: 5, habit: "I am Money Smart" },
];

export const sessionsIn = (moduleId: Module["id"]) => SESSIONS.filter((s) => s.module === moduleId);

/** The six habits the homepage shows as sticker cards (brief F9). */
export const FEATURED_HABITS = [
  "I wait 24 hours before I buy",
  "I plan before I spend",
  "I pay myself first",
  "I never share my OTP or PIN",
  "I always ask for a bill",
  "I start early",
];
