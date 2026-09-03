"use client";

import { useEffect, useState } from "react";
import { getDefaultSectionState, SectionState } from "@/lib/section-config";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/app/home/components/hero-section";
import { WhyFinancialLiteracySection } from "@/app/home/components/why-financial-literacy";
import { StudentSpotlightSection } from "@/app/home/components/student-spotlight";
import { HowItWorksSection } from "@/app/home/components/how-it-works";
import { AwardsPartnersSection } from "@/app/home/components/awards-partners";
import { TeamOfTeachersSection } from "@/app/home/components/team-of-teachers";
import { BookDemoFormSection } from "@/app/home/components/book-demo-form";
import { BookDemoModal } from "@/app/home/components/book-demo-modal";
import { FoundationsOfWealthSection } from "@/app/home/components/foundations-of-wealth";
import { BoxUnboxingSection } from "@/app/home/components/box-unboxing";
import { CourseFlowSection } from "@/app/home/components/course-flow";
import { FAQSection } from "@/app/home/components/faq-section";
import { InstagramShowcaseSection } from "@/app/home/components/instagram-showcase";
import { UsOnMediaSection } from "@/app/home/components/us-on-media";
import { BlogsSection } from "@/app/home/components/blogs-section";
import { YoutubeSection } from "@/app/home/components/youtube-section";
import { JoinThousandsSection } from "@/app/home/components/join-thousands";
import { CertificationsTrustSection } from "@/app/home/components/certifications-trust";
import { ParentReviewsSection } from "@/app/home/components/parent-reviews";
import { Footer } from "@/components/footer";
import { track } from "@/lib/meta";

export default function HomePage() {
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const handleOpenDemoModal = () => {
    track("InitiateCheckout");
    setIsDemoModalOpen(true);
  };

  const loadConfig = async () => {
    try {
      // Check local storage first for quick client sync
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem("landing_sections_config");
        if (cached) {
          try {
            setSections({ ...getDefaultSectionState(), ...JSON.parse(cached) });
          } catch {}
        }
      }

      // Fetch latest from server
      const res = await fetch("/api/sections");
      const data = await res.json();
      if (data.success && data.data) {
        setSections(data.data);
        if (typeof window !== "undefined") {
          localStorage.setItem("landing_sections_config", JSON.stringify(data.data));
        }
      }
    } catch {
      // Default fallback
    }
  };

  useEffect(() => {
    loadConfig();

    const handleStorageUpdate = () => loadConfig();
    window.addEventListener("storage_sections_updated", handleStorageUpdate);
    window.addEventListener("storage", handleStorageUpdate);

    return () => {
      window.removeEventListener("storage_sections_updated", handleStorageUpdate);
      window.removeEventListener("storage", handleStorageUpdate);
    };
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Global Demo Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />

      {/* 1. Header / Navigation */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* 2. Hero Section */}
      {isEnabled("hero") && <HeroSection onOpenDemoModal={handleOpenDemoModal} />}

      {/* 3. Why Financial Literacy */}
      {isEnabled("whyFinancialLiteracy") && <WhyFinancialLiteracySection />}

      {/* 4. Student Spotlight */}
      {isEnabled("studentSpotlight") && <StudentSpotlightSection />}

      {/* 5. How It Works */}
      {isEnabled("howItWorks") && <HowItWorksSection />}

      {/* 6. Awards & Partners */}
      {isEnabled("awardsPartners") && <AwardsPartnersSection />}

      {/* 7. Team of Teachers */}
      {isEnabled("teamOfTeachers") && <TeamOfTeachersSection />}

      {/* 8. Book Your Free Demo */}
      {isEnabled("bookDemoForm") && <BookDemoFormSection />}

      {/* 9. Foundations of Wealth (Course Details Card) */}
      {isEnabled("foundationsOfWealth") && <FoundationsOfWealthSection />}

      {/* 10. Quarterly Physical Box Unboxing */}
      {isEnabled("boxUnboxing") && <BoxUnboxingSection />}

      {/* 11. Course Flow (Curriculum Roadmap) */}
      {isEnabled("courseFlow") && <CourseFlowSection />}

      {/* 12. Frequently Asked Questions */}
      {isEnabled("faq") && <FAQSection />}

      {/* 13. Instagram Social Proof Showcase */}
      {isEnabled("instagramShowcase") && <InstagramShowcaseSection />}

      {/* 14. US ON MEDIA */}
      {isEnabled("usOnMedia") && <UsOnMediaSection />}

      {/* 15. Blogs & Articles */}
      {isEnabled("blogs") && <BlogsSection />}

      {/* 16. YouTube Class Highlights */}
      {isEnabled("youtube") && <YoutubeSection />}

      {/* 17. Join Thousands Community Face Cloud */}
      {isEnabled("joinThousands") && <JoinThousandsSection />}

      {/* 18. Our Certifications & Trust */}
      {isEnabled("certificationsTrust") && <CertificationsTrustSection />}

      {/* 19. What Parents and Kids Say (Reviews) */}
      {isEnabled("parentReviews") && <ParentReviewsSection />}

      {/* 20. Footer */}
      {isEnabled("footer") && <Footer />}
    </main>
  );
}
