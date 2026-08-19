import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/app/home/components/hero-section";
import { WhyFinancialLiteracySection } from "@/app/home/components/why-financial-literacy";
import { StudentSpotlightSection } from "@/app/home/components/student-spotlight";
import { HowItWorksSection } from "@/app/home/components/how-it-works";
import { AwardsPartnersSection } from "@/app/home/components/awards-partners";
import { TeamOfTeachersSection } from "@/app/home/components/team-of-teachers";
import { BookDemoFormSection } from "@/app/home/components/book-demo-form";
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

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* 1. Header / Navigation */}
      <Navbar />

      {/* 2. Hero Section */}
      <HeroSection />

      {/* 3. Why Financial Literacy */}
      <WhyFinancialLiteracySection />

      {/* 4. Student Spotlight */}
      <StudentSpotlightSection />

      {/* 5. How It Works */}
      <HowItWorksSection />

      {/* 6. Awards & Partners */}
      <AwardsPartnersSection />

      {/* 7. Team of Teachers */}
      <TeamOfTeachersSection />

      {/* 8. Book Your Free Demo */}
      <BookDemoFormSection />

      {/* 9. Foundations of Wealth (Course Details Card) */}
      <FoundationsOfWealthSection />

      {/* 10. Quarterly Physical Box Unboxing */}
      <BoxUnboxingSection />

      {/* 11. Course Flow (Curriculum Roadmap) */}
      <CourseFlowSection />

      {/* 12. Frequently Asked Questions */}
      <FAQSection />

      {/* 13. Instagram Social Proof Showcase */}
      <InstagramShowcaseSection />

      {/* 14. US ON MEDIA */}
      <UsOnMediaSection />

      {/* 15. Blogs & Articles */}
      <BlogsSection />

      {/* 16. YouTube Class Highlights */}
      <YoutubeSection />

      {/* 17. Join Thousands Community Face Cloud */}
      <JoinThousandsSection />

      {/* 18. Our Certifications & Trust */}
      <CertificationsTrustSection />

      {/* 19. What Parents and Kids Say (Reviews) */}
      <ParentReviewsSection />

      {/* 20. Footer */}
      <Footer />
    </main>
  );
}
