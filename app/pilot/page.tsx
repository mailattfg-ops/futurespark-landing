"use client";

import { useState, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookDemoModal } from "@/app/home/components/book-demo-modal";
import { BookDemoFormSection } from "@/app/home/components/book-demo-form";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

import { PilotHero } from "./components/pilot-hero";
import { DualMarqueeSection } from "./components/dual-marquee";
import { PilotBenefitsSection } from "./components/pilot-benefits";
import { HowItWorksSection } from "./components/how-it-works";
import { AboutProgramSection } from "./components/about-program";

export default function FinquoPilotPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden selection:bg-[#4F46E5]/20 selection:text-[#4F46E5]">
      {/* Shared Navigation Header */}
      <Navbar onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Hero Banner & Stats Cards */}
      <PilotHero onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* Dual Marquee Ticker */}
      <DualMarqueeSection />

      {/* Pilot Benefits */}
      <PilotBenefitsSection />

      {/* How It Works & Process Steps */}
      <HowItWorksSection />

      {/* 2-Step Registration Form */}
      <div ref={formRef}>
        <ScrollReveal variant="fade-up">
          <BookDemoFormSection />
        </ScrollReveal>
      </div>

      {/* Program Details & Session Breakdown */}
      <AboutProgramSection />

      {/* Shared Footer */}
      <Footer />

      {/* Booking Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
