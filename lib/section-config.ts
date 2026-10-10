import bundledSections from "@/.sections-config.json";

export type PageType = "home" | "curriculum" | "about-us";

export interface LandingSection {
  id: string;
  name: string;
  page: PageType;
  category: string;
  description: string;
  enabled: boolean;
}

export type SectionState = Record<string, boolean>;

export const DEFAULT_SECTIONS: LandingSection[] = [
  // ── Homepage (/) ─────────────────────────────────────────────────────────────
  { id: "navbar_curriculum", name: "Navbar Link: Curriculum", page: "home", category: "Header Navigation", description: "Toggle the Curriculum menu link in the top navigation bar.", enabled: true },
  { id: "navbar_mentors", name: "Navbar Link: Mentors", page: "home", category: "Header Navigation", description: "Toggle the Mentors menu link in the top navigation bar.", enabled: true },
  { id: "navbar_about", name: "Navbar Link: About Us", page: "home", category: "Header Navigation", description: "Toggle the About Us menu link in the top navigation bar.", enabled: true },
  { id: "navbar_event", name: "Navbar Link: Free Webinar", page: "home", category: "Header Navigation", description: "Toggle the Free Webinar link that opens the webinar registration page.", enabled: true },
  { id: "navbar_cta", name: "Navbar Button (Book Free Demo Class)", page: "home", category: "Header Navigation", description: "Toggle the Book Free Demo Class button in the top navbar.", enabled: true },

  { id: "hero", name: "Hero Section", page: "home", category: "Main Content", description: "Headline, sub-head, demo button and the proof line.", enabled: true },
  { id: "hero_trustpilot", name: "Hero Trustpilot Rating", page: "home", category: "Main Content", description: "Trustpilot stars beside the hero button. Keep off until a real Trustpilot profile exists.", enabled: false },
  { id: "whyFinancialLiteracy", name: "Why Financial Literacy", page: "home", category: "Main Content", description: "Three reasons with the session image.", enabled: true },
  { id: "studentSpotlight", name: "Student Spotlight", page: "home", category: "Main Content", description: "Student profile cards.", enabled: true },
  { id: "howItWorks", name: "How It Works", page: "home", category: "Main Content", description: "The four steps: free demo, match, weekly session, capstone.", enabled: true },
  { id: "graduation", name: "Graduation", page: "home", category: "Main Content", description: "Session 20 is graduation: the business presentation, the pledge and the certificate.", enabled: true },
  { id: "awardsPartners", name: "Awards & Partners", page: "home", category: "Social Proof", description: "Awards and partner logos.", enabled: true },
  { id: "foundationsOfWealth", name: "Course Details Card", page: "home", category: "Programme", description: "Foundations of Wealth card with the programme facts.", enabled: true },
  { id: "price", name: "Price", page: "home", category: "Programme", description: "One programme, one price: ₹29,000 + GST and what it covers.", enabled: true },
  { id: "worksheets", name: "Printed Worksheets", page: "home", category: "Programme", description: "A printed worksheet and sticker pack for every session.", enabled: true },
  { id: "courseFlow", name: "Course Roadmap", page: "home", category: "Programme", description: "The five modules with their session titles, the value tiles and the closing line.", enabled: true },
  { id: "bonusSessions", name: "Bonus Sessions", page: "home", category: "Programme", description: "Five free sessions in AI, Public Speaking or Cyber Awareness after completion.", enabled: true },
  { id: "moneyHabits", name: "20 Money Habits", page: "home", category: "Programme", description: "Six sticker cards and the link to all 20 sessions.", enabled: true },
  { id: "mentorsParents", name: "Mentors & Parents", page: "home", category: "Social Proof", description: "Four mentor cards, parent quotes and the proof line.", enabled: true },
  { id: "webinar", name: "Free Live Webinar", page: "home", category: "Events", description: "Webinar block: the next session date (Mondays and Thursdays, from 15 Oct 2026), with the registration button.", enabled: true },
  { id: "instagramShowcase", name: "Instagram Posts", page: "home", category: "Social Proof", description: "Three posts from finquojunior, each linked to the post.", enabled: true },
  { id: "usOnMedia", name: "US On Media", page: "home", category: "Social Proof", description: "Media coverage logos.", enabled: true },
  { id: "blogs", name: "Blogs & Articles", page: "home", category: "Content", description: "Blog cards.", enabled: true },
  { id: "youtube", name: "YouTube Highlights", page: "home", category: "Content", description: "Video thumbnails.", enabled: true },
  { id: "joinThousands", name: "Join Thousands Community", page: "home", category: "Social Proof", description: "Community face cloud.", enabled: true },
  { id: "certificationsTrust", name: "Certifications & Trust", page: "home", category: "Social Proof", description: "Trust badges. Keep off until the ratings are real.", enabled: false },
  { id: "parentReviews", name: "Parent & Kid Reviews", page: "home", category: "Social Proof", description: "Quote cards from the shared testimonials list.", enabled: true },
  { id: "faq", name: "FAQ", page: "home", category: "Main Content", description: "Eight questions, just above the footer. The footer's FAQ link points here.", enabled: true },
  { id: "footer", name: "Footer", page: "home", category: "Footer", description: "Offices, links, policies and the demo button.", enabled: true },

  // ── Curriculum Page (/curriculum) ────────────────────────────────────────────
  { id: "curriculum_hero", name: "Hero Banner & Course Card", page: "curriculum", category: "Header & Intro", description: "Banner artwork with the floating Foundations of Wealth card.", enabled: true },
  { id: "curriculum_master", name: "What Your Child Will Master", page: "curriculum", category: "Curriculum Content", description: "Seven outcomes, ending with the completion certificate.", enabled: true },
  { id: "curriculum_syllabus", name: "20-Session Syllabus", page: "curriculum", category: "Curriculum Content", description: "All 20 sessions grouped under the five modules, with the Money Habit sticker for each.", enabled: true },
  { id: "curriculum_summaryBadges", name: "Stats Strip", page: "curriculum", category: "Curriculum Content", description: "20 live sessions · 1 hour each · 1-on-1 · Grades 5 to 8 · 5 bonus sessions.", enabled: true },
  { id: "curriculum_bonus", name: "Bonus, Graduation & Price", page: "curriculum", category: "Curriculum Content", description: "The bonus block, the graduation block and the price with the demo button.", enabled: true },
  { id: "curriculum_reviews", name: "Parent & Student Reviews", page: "curriculum", category: "Social Proof", description: "Quote cards from the shared testimonials list.", enabled: true },
  { id: "curriculum_footer", name: "Footer", page: "curriculum", category: "Footer", description: "Page bottom footer.", enabled: true },

  // ── About Us Page (/about-us) ──────────────────────────────────────────────
  { id: "about_hero", name: "About Us Hero & Mission", page: "about-us", category: "Header & Intro", description: "Headline and the founding paragraphs.", enabled: true },
  { id: "about_whyFinancialLiteracy", name: "Why Financial Literacy", page: "about-us", category: "Content & Value", description: "\"A grounding, not a lecture\" with the four cards.", enabled: true },
  { id: "about_curriculum", name: "Our 20-Session Curriculum", page: "about-us", category: "Content & Value", description: "The five module cards and the bonus line.", enabled: true },
  { id: "about_different", name: "What Makes Finquo Junior Different", page: "about-us", category: "Content & Value", description: "The six differentiator tiles.", enabled: true },
  { id: "about_people", name: "People & Company", page: "about-us", category: "Content & Value", description: "Founders (when supplied), the four mentors, both offices and the legal name.", enabled: true },
  { id: "about_cta", name: "Closing Banner", page: "about-us", category: "Content & Value", description: "\"Let's raise a financially confident generation\" with the demo button.", enabled: true },
  { id: "about_footer", name: "Footer", page: "about-us", category: "Footer", description: "Page bottom footer.", enabled: true },
];

export function getDefaultSectionState(): SectionState {
  const state: SectionState = {};
  DEFAULT_SECTIONS.forEach((section) => {
    state[section.id] = section.enabled;
  });
  return {
    ...state,
    ...(bundledSections as SectionState),
  };
}

export function clearLegacyStorage() {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem("landing_sections_config");
    document.cookie = "landing_sections_config=; max-age=0; path=/; SameSite=Lax";
  } catch {}
}
