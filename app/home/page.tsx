"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/app/home/components/hero-section";
import { WhyFinancialLiteracySection } from "@/app/home/components/why-financial-literacy";
import { StudentSpotlightSection } from "@/app/home/components/student-spotlight";
import { HowItWorksSection } from "@/app/home/components/how-it-works";
import { GraduationSection } from "@/app/home/components/graduation";
import { AwardsPartnersSection } from "@/app/home/components/awards-partners";
import { FoundationsOfWealthSection } from "@/app/home/components/foundations-of-wealth";
import { PriceSection } from "@/app/home/components/price-section";
import { WorksheetsSection } from "@/app/home/components/worksheets";
import { CourseFlowSection } from "@/app/home/components/course-flow";
import { BonusSessionsSection } from "@/app/home/components/bonus-sessions";
import { MoneyHabitsSection } from "@/app/home/components/money-habits";
import { MentorsParentsSection } from "@/app/home/components/mentors-parents";
import { WebinarBannerSection } from "@/app/home/components/webinar-banner";
import { InstagramShowcaseSection } from "@/app/home/components/instagram-showcase";
import { UsOnMediaSection } from "@/app/home/components/us-on-media";
import { BlogsSection } from "@/app/home/components/blogs-section";
import { YoutubeSection } from "@/app/home/components/youtube-section";
import { JoinThousandsSection } from "@/app/home/components/join-thousands";
import { CertificationsTrustSection } from "@/app/home/components/certifications-trust";
import { ParentReviewsSection } from "@/app/home/components/parent-reviews";
import { FAQSection } from "@/app/home/components/faq-section";
import { getDefaultSectionState, SectionState, clearLegacyStorage } from "@/lib/section-config";

export default function HomePage() {
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());

  useEffect(() => {
    clearLegacyStorage();
    const loadConfig = async () => {
      try {
        const res = await fetch("/api/sections", { cache: "no-store" });
        const data = await res.json();
        if (data.success && data.data) setSections(data.data);
      } catch {
        // defaults stay in place
      }
    };
    loadConfig();
    window.addEventListener("storage_sections_updated", loadConfig);
    return () => window.removeEventListener("storage_sections_updated", loadConfig);
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  // Order follows the "Home web final" design; sections the design does not
  // show keep their place from the change brief.
  return (
    <main className="min-h-screen flex flex-col bg-white">
      <Navbar />
      {isEnabled("hero") && <HeroSection showTrustpilot={isEnabled("hero_trustpilot")} />}
      {isEnabled("whyFinancialLiteracy") && <WhyFinancialLiteracySection />}
      {isEnabled("howItWorks") && <HowItWorksSection />}
      {isEnabled("graduation") && <GraduationSection />}
      {isEnabled("awardsPartners") && <AwardsPartnersSection />}
      {isEnabled("foundationsOfWealth") && <FoundationsOfWealthSection />}
      {isEnabled("courseFlow") && <CourseFlowSection />}
      {isEnabled("worksheets") && <WorksheetsSection />}
      {isEnabled("bonusSessions") && <BonusSessionsSection />}
      {isEnabled("mentorsParents") && <MentorsParentsSection />}
      {isEnabled("moneyHabits") && <MoneyHabitsSection />}
      {isEnabled("parentReviews") && <ParentReviewsSection />}
      {isEnabled("studentSpotlight") && <StudentSpotlightSection />}
      {isEnabled("joinThousands") && <JoinThousandsSection />}
      {isEnabled("webinar") && <WebinarBannerSection />}
      {isEnabled("instagramShowcase") && <InstagramShowcaseSection />}
      {isEnabled("price") && <PriceSection />}
      {isEnabled("usOnMedia") && <UsOnMediaSection />}
      {isEnabled("blogs") && <BlogsSection />}
      {isEnabled("youtube") && <YoutubeSection />}
      {isEnabled("certificationsTrust") && <CertificationsTrustSection />}
      {isEnabled("faq") && <FAQSection />}
      {isEnabled("footer") && <Footer />}
    </main>
  );
}
