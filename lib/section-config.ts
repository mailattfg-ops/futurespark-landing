import bundledSections from "@/.sections-config.json";

export type PageType = "home" | "confirm-your-seat" | "claim-free-class" | "curriculum" | "about-us";

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
  {
    id: "navbar_curriculum",
    name: "Navbar Link: Curriculum",
    page: "home",
    category: "Header Navigation",
    description: "Toggle the Curriculum menu link in top navigation bar.",
    enabled: true,
  },
  {
    id: "navbar_teachers",
    name: "Navbar Link: Teachers",
    page: "home",
    category: "Header Navigation",
    description: "Toggle the Teachers menu link in top navigation bar.",
    enabled: false,
  },
  {
    id: "navbar_about",
    name: "Navbar Link: About Us",
    page: "home",
    category: "Header Navigation",
    description: "Toggle the About Us menu link in top navigation bar.",
    enabled: false,
  },
  {
    id: "navbar_cta",
    name: "Navbar CTA Button (Free Pilot Program)",
    page: "home",
    category: "Header Navigation",
    description: "Toggle the Free Pilot Program CTA button in top navbar.",
    enabled: true,
  },
  {
    id: "navbar_ribbon",
    name: "Navbar Pilot Ribbon Badge",
    page: "home",
    category: "Header Navigation",
    description: "Toggle the red top-left corner Pilot Version ribbon badge.",
    enabled: true,
  },
  {
    id: "hero",
    name: "Hero Section",
    page: "home",
    category: "Hero & Intro",
    description: "Main header banner with headline, CTA button, and hero graphic cutout.",
    enabled: true,
  },
  {
    id: "whyFinancialLiteracy",
    name: "Why Financial Literacy",
    page: "home",
    category: "Hero & Intro",
    description: "2-column section explaining why financial literacy is essential.",
    enabled: true,
  },
  {
    id: "studentSpotlight",
    name: "Student Spotlight",
    page: "home",
    category: "Hero & Intro",
    description: "Showcase cards featuring student success stories.",
    enabled: false,
  },
  {
    id: "howItWorks",
    name: "How It Works",
    page: "home",
    category: "Curriculum & Value",
    description: "Live 1-on-1 video call mockup and 4-step learning roadmap.",
    enabled: true,
  },
  {
    id: "awardsPartners",
    name: "Awards & Partners",
    page: "home",
    category: "Curriculum & Value",
    description: "Logos and badges of recognized awards and institutional partners.",
    enabled: false,
  },
  {
    id: "teamOfTeachers",
    name: "Team of Teachers",
    page: "home",
    category: "Curriculum & Value",
    description: "Mentor profile cards showcasing lead educators.",
    enabled: false,
  },
  {
    id: "bookDemoForm",
    name: "Book Free Demo Form",
    page: "home",
    category: "Curriculum & Value",
    description: "Interactive calendar slot picker and lead registration form.",
    enabled: true,
  },
  {
    id: "foundationsOfWealth",
    name: "Foundations of Wealth",
    page: "home",
    category: "Curriculum & Value",
    description: "Course details and breakdown card.",
    enabled: true,
  },
  {
    id: "boxUnboxing",
    name: "Quarterly Physical Box Unboxing",
    page: "home",
    category: "Curriculum & Value",
    description: "Highlight card for physical activity boxes delivered quarterly.",
    enabled: true,
  },
  {
    id: "courseFlow",
    name: "Course Flow Roadmap",
    page: "home",
    category: "Curriculum & Value",
    description: "Curriculum timeline and module breakdown.",
    enabled: true,
  },
  {
    id: "faq",
    name: "FAQ Section",
    page: "home",
    category: "Curriculum & Value",
    description: "Accordion of frequently asked questions and answers.",
    enabled: false,
  },
  {
    id: "instagramShowcase",
    name: "Instagram Social Proof",
    page: "home",
    category: "Social Proof & Media",
    description: "Grid of Instagram reels and photos from real sessions.",
    enabled: true,
  },
  {
    id: "usOnMedia",
    name: "US On Media",
    page: "home",
    category: "Social Proof & Media",
    description: "Press coverage, news articles, and media mentions.",
    enabled: false,
  },
  {
    id: "blogs",
    name: "Blogs & Articles",
    page: "home",
    category: "Social Proof & Media",
    description: "Featured blog posts and educational reads.",
    enabled: false,
  },
  {
    id: "youtube",
    name: "YouTube Highlights",
    page: "home",
    category: "Social Proof & Media",
    description: "Video thumbnails and sample class clips.",
    enabled: false,
  },
  {
    id: "joinThousands",
    name: "Join Thousands Community",
    page: "home",
    category: "Social Proof & Media",
    description: "Community face cloud and parent community counter.",
    enabled: false,
  },
  {
    id: "certificationsTrust",
    name: "Certifications & Trust",
    page: "home",
    category: "Social Proof & Media",
    description: "Trust badges, security icons, and certification seals.",
    enabled: false,
  },
  {
    id: "parentReviews",
    name: "Parent & Kid Reviews",
    page: "home",
    category: "Social Proof & Media",
    description: "Testimonials and quote cards from parents and students.",
    enabled: false,
  },
  {
    id: "footer",
    name: "Footer Navigation",
    page: "home",
    category: "Footer",
    description: "Bottom footer links, copyright, and brand contacts.",
    enabled: true,
  },

  // ── Confirm Your Seat Page (/confirm-your-seat) ──────────────────────────────
  {
    id: "confirm_header",
    name: "Header Navigation & Logo",
    page: "confirm-your-seat",
    category: "Form & Layout",
    description: "Top bar with Finquo Junior brand logo and back navigation link.",
    enabled: true,
  },
  {
    id: "confirm_heroBanner",
    name: "Hero Title & Badge",
    page: "confirm-your-seat",
    category: "Form & Layout",
    description: "Top headline, sub-heading, and pilot badge.",
    enabled: true,
  },
  {
    id: "confirm_slotPicker",
    name: "Slot Date & Time Picker",
    page: "confirm-your-seat",
    category: "Interactive Form",
    description: "Quick date pills and time slot availability grid.",
    enabled: true,
  },
  {
    id: "confirm_formFields",
    name: "Student & Parent Form Fields",
    page: "confirm-your-seat",
    category: "Interactive Form",
    description: "Input fields for parent name, child name, grade, phone, email.",
    enabled: true,
  },
  {
    id: "confirm_trustBadges",
    name: "Trust & Security Badges",
    page: "confirm-your-seat",
    category: "Trust & Proof",
    description: "ISO-grade certification, 1-on-1 guarantee, and security badges.",
    enabled: true,
  },
  {
    id: "confirm_footer",
    name: "Footer Navigation",
    page: "confirm-your-seat",
    category: "Footer",
    description: "Page bottom copyright and links.",
    enabled: true,
  },

  // ── Claim Free Class Page (/claim-free-class) ─────────────────────────────────
  {
    id: "claim_header",
    name: "Header Navigation & Progress Bar",
    page: "claim-free-class",
    category: "Form & Layout",
    description: "Top header with logo, back button, and 3-step progress bar.",
    enabled: true,
  },
  {
    id: "claim_step1",
    name: "Step 1: Student Information Form",
    page: "claim-free-class",
    category: "3-Step Form",
    description: "Fields for student name, grade, dial code, phone, email, laptop checkbox.",
    enabled: true,
  },
  {
    id: "claim_step2",
    name: "Step 2: Class Time Slot Picker",
    page: "claim-free-class",
    category: "3-Step Form",
    description: "Preferred slot date picker and available time slot selector.",
    enabled: true,
  },
  {
    id: "claim_step3",
    name: "Step 3: Parent & Additional Details",
    page: "claim-free-class",
    category: "3-Step Form",
    description: "Fields for parent name, who are you role, booking reason, purchase timeline.",
    enabled: true,
  },
  {
    id: "claim_trustCard",
    name: "ISO & Mentorship Guarantee Card",
    page: "claim-free-class",
    category: "Trust & Proof",
    description: "1-on-1 weekly mentorship and ISO certification trust card.",
    enabled: true,
  },
  {
    id: "claim_footer",
    name: "Footer Navigation",
    page: "claim-free-class",
    category: "Footer",
    description: "Page bottom copyright and links.",
    enabled: true,
  },

  // ── Curriculum Page (/curriculum) ──────────────────────────────────────────
  {
    id: "curriculum_hero",
    name: "Hero Banner & Course Detail Card",
    page: "curriculum",
    category: "Hero & Details",
    description: "Top hero banner and floating Foundations of Wealth course overview card.",
    enabled: true,
  },
  {
    id: "curriculum_master",
    name: "What Your Child Will Master",
    page: "curriculum",
    category: "Curriculum Content",
    description: "Grid of key financial skills and certification highlight cards.",
    enabled: true,
  },
  {
    id: "curriculum_weeklyPlan",
    name: "Weekly Course Plan Timeline",
    page: "curriculum",
    category: "Curriculum Content",
    description: "Interactive 8-week structured roadmap with animated scroll timeline.",
    enabled: true,
  },
  {
    id: "curriculum_summaryBadges",
    name: "Summary Badges Row",
    page: "curriculum",
    category: "Curriculum Content",
    description: "Pill badges showcasing module counts, ratings, and target grades.",
    enabled: true,
  },
  {
    id: "curriculum_reviews",
    name: "Parent & Student Reviews",
    page: "curriculum",
    category: "Social Proof",
    description: "Testimonials and review quotes from parents and kids.",
    enabled: true,
  },
  {
    id: "curriculum_footer",
    name: "Footer Navigation",
    page: "curriculum",
    category: "Footer",
    description: "Page bottom footer navigation and copyright.",
    enabled: true,
  },

  // ── About Us Page (/about-us) ──────────────────────────────────────────────
  {
    id: "about_hero",
    name: "About Us Hero & Mission Statement",
    page: "about-us",
    category: "Header & Intro",
    description: "Main About Us header, wavy graphic divider, and vision paragraphs.",
    enabled: true,
  },
  {
    id: "about_whyFinancialLiteracy",
    name: "Why Financial Literacy Section",
    page: "about-us",
    category: "Content & Value",
    description: "\"A grounding, not a lecture\" intro with the four financial-thinking cards.",
    enabled: true,
  },
  {
    id: "about_curriculum",
    name: "Our 40-Session Curriculum",
    page: "about-us",
    category: "Content & Value",
    description: "Eight learning-area cards with session counts and session topic lists.",
    enabled: true,
  },
  {
    id: "about_different",
    name: "What Makes Finquo Junior Different",
    page: "about-us",
    category: "Content & Value",
    description: "1 Child → 1 Mentor journey row and the five differentiator cards.",
    enabled: true,
  },
  {
    id: "about_cta",
    name: "Closing CTA Banner",
    page: "about-us",
    category: "Content & Value",
    description: "Purple \"raise a generation of global citizens\" banner with pilot CTA buttons.",
    enabled: true,
  },
  {
    id: "about_footer",
    name: "Footer Navigation",
    page: "about-us",
    category: "Footer",
    description: "Page bottom footer navigation and copyright.",
    enabled: true,
  },
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


