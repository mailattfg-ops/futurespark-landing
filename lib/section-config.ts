export interface LandingSection {
  id: string;
  name: string;
  category: "Hero & Intro" | "Curriculum & Value" | "Social Proof & Media" | "Footer";
  description: string;
  enabled: boolean;
}

export type SectionState = Record<string, boolean>;

export const DEFAULT_SECTIONS: LandingSection[] = [
  {
    id: "hero",
    name: "Hero Section",
    category: "Hero & Intro",
    description: "Main header banner with headline, CTA button, and hero graphic cutout.",
    enabled: true,
  },
  {
    id: "whyFinancialLiteracy",
    name: "Why Financial Literacy",
    category: "Hero & Intro",
    description: "2-column section explaining why financial literacy is essential.",
    enabled: true,
  },
  {
    id: "studentSpotlight",
    name: "Student Spotlight",
    category: "Hero & Intro",
    description: "Showcase cards featuring student success stories.",
    enabled: false,
  },
  {
    id: "howItWorks",
    name: "How It Works",
    category: "Curriculum & Value",
    description: "Live 1 on 1 video call mockup and 4-step learning roadmap.",
    enabled: true,
  },
  {
    id: "awardsPartners",
    name: "Awards & Partners",
    category: "Curriculum & Value",
    description: "Logos and badges of recognized awards and institutional partners.",
    enabled: false,
  },
  {
    id: "teamOfTeachers",
    name: "Team of Teachers",
    category: "Curriculum & Value",
    description: "Mentor profile cards showcasing lead educators.",
    enabled: false,
  },
  {
    id: "bookDemoForm",
    name: "Book Free Demo Form",
    category: "Curriculum & Value",
    description: "Interactive calendar slot picker and lead registration form.",
    enabled: true,
  },
  {
    id: "foundationsOfWealth",
    name: "Foundations of Wealth",
    category: "Curriculum & Value",
    description: "Course details and breakdown card.",
    enabled: true,
  },
  {
    id: "boxUnboxing",
    name: "Quarterly Physical Box Unboxing",
    category: "Curriculum & Value",
    description: "Highlight card for physical activity boxes delivered quarterly.",
    enabled: true,
  },
  {
    id: "courseFlow",
    name: "Course Flow Roadmap",
    category: "Curriculum & Value",
    description: "Curriculum timeline and module breakdown.",
    enabled: true,
  },
  {
    id: "faq",
    name: "FAQ Section",
    category: "Curriculum & Value",
    description: "Accordion of frequently asked questions and answers.",
    enabled: true,
  },
  {
    id: "instagramShowcase",
    name: "Instagram Social Proof",
    category: "Social Proof & Media",
    description: "Grid of Instagram reels and photos from real sessions.",
    enabled: true,
  },
  {
    id: "usOnMedia",
    name: "US On Media",
    category: "Social Proof & Media",
    description: "Press coverage, news articles, and media mentions.",
    enabled: false,
  },
  {
    id: "blogs",
    name: "Blogs & Articles",
    category: "Social Proof & Media",
    description: "Featured blog posts and educational reads.",
    enabled: false,
  },
  {
    id: "youtube",
    name: "YouTube Highlights",
    category: "Social Proof & Media",
    description: "Video thumbnails and sample class clips.",
    enabled: false,
  },
  {
    id: "joinThousands",
    name: "Join Thousands Community",
    category: "Social Proof & Media",
    description: "Community face cloud and parent community counter.",
    enabled: false,
  },
  {
    id: "certificationsTrust",
    name: "Certifications & Trust",
    category: "Social Proof & Media",
    description: "Trust badges, security icons, and certification seals.",
    enabled: false,
  },
  {
    id: "parentReviews",
    name: "Parent & Kid Reviews",
    category: "Social Proof & Media",
    description: "Testimonials and quote cards from parents and students.",
    enabled: false,
  },
  {
    id: "footer",
    name: "Footer Navigation",
    category: "Footer",
    description: "Bottom footer links, copyright, and brand contacts.",
    enabled: true,
  },
];

export function getDefaultSectionState(): SectionState {
  const state: SectionState = {};
  DEFAULT_SECTIONS.forEach((section) => {
    state[section.id] = section.enabled;
  });
  return state;
}
