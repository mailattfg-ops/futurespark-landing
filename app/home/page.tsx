import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/app/home/components/hero-section";
import { WhyFinancialLiteracySection } from "@/app/home/components/why-financial-literacy";
import { StudentSpotlightSection } from "@/app/home/components/student-spotlight";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col bg-white">
      {/* Navigation Header */}
      <Navbar />

      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Why Financial Literacy Section */}
      <WhyFinancialLiteracySection />

      {/* 3. Student Spotlight Section */}
      <StudentSpotlightSection />
    </main>
  );
}
