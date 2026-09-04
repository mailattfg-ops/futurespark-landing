"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookDemoModal } from "@/app/home/components/book-demo-modal";
import { WhyFinancialLiteracySection } from "@/app/home/components/why-financial-literacy";
import { AwardsPartnersSection } from "@/app/home/components/awards-partners";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { track } from "@/lib/meta";
import { getDefaultSectionState, SectionState } from "@/lib/section-config";

export default function AboutUsPage() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());

  useEffect(() => {
    async function loadSectionsConfig() {
      try {
        const cached = localStorage.getItem("landing_sections_config");
        if (cached) {
          setSections(JSON.parse(cached));
        }
        const res = await fetch("/api/sections");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setSections(json.data);
            localStorage.setItem("landing_sections_config", JSON.stringify(json.data));
          }
        }
      } catch {}
    }
    loadSectionsConfig();

    const handleUpdate = () => {
      const cached = localStorage.getItem("landing_sections_config");
      if (cached) setSections(JSON.parse(cached));
    };
    window.addEventListener("storage_sections_updated", handleUpdate);
    return () => window.removeEventListener("storage_sections_updated", handleUpdate);
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  const handleOpenDemoModal = () => {
    track("InitiateCheckout");
    setIsDemoModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      {/* 1. Shared Navigation Header */}
      <Navbar onOpenDemoModal={handleOpenDemoModal} />

      {/* 2. About Us Hero Section */}
      {isEnabled("about_hero") && (
        <section className="pt-24 sm:pt-32 pb-12 sm:pb-16 bg-white relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Main Title */}
            <ScrollReveal variant="fade-up" duration={600}>
              <div className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-[#5B45F5] tracking-tight font-sans">
                  About Us
                </h1>
              </div>
            </ScrollReveal>

            {/* Purple Wavy Divider Line */}
            <div className="w-full my-6 sm:my-8 flex justify-center overflow-hidden">
              <svg
                className="w-full max-w-5xl h-8 sm:h-12 text-[#5B45F5]"
                viewBox="0 0 1200 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 30 C 150 5, 300 55, 450 30 C 600 5, 750 55, 900 30 C 1050 5, 1150 45, 1200 30 L 1200 60 L 0 60 Z"
                  fill="currentColor"
                />
              </svg>
            </div>

            {/* Intro Description Paragraphs */}
            <ScrollReveal variant="fade-up" duration={700} delay={150}>
              <div className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-6 text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed font-sans px-2 sm:px-4">
                <p>
                  Finquo Junior was founded with a single powerful vision: to empower the next generation with real-world financial literacy before they make their first financial decisions. We believe that true financial security is built on real trade-offs, practical decision-making, and early exposure to how money works in everyday life.
                </p>
                <p>
                  Our curriculum is meticulously vetted by professionals from top institutions including the Indian Institutes of Management (IIM). Every single session pairs your child 1-on-1 with a dedicated mentor who guides them through practical, age-appropriate scenarios—transforming complex economic concepts into simple, actionable habits.
                </p>
                <p>
                  From understanding savings and budgeting to exploring entrepreneurship, investments, and ethical wealth building, Finquo Junior provides a grounding, not a lecture. Together, we are raising a generation of confident, responsible, and financially intelligent global leaders.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 3. Why Financial Literacy Section */}
      {isEnabled("about_whyFinancialLiteracy") && <WhyFinancialLiteracySection />}

      {/* 4. Team & Community Banner Section */}
      {isEnabled("about_teamCommunity") && (
        <section className="w-full py-10 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollReveal variant="zoom-in" duration={800}>
              <div className="relative w-full h-[320px] sm:h-[450px] md:h-[550px] lg:h-[620px] rounded-3xl sm:rounded-[36px] overflow-hidden shadow-2xl group border border-gray-100">
                <Image
                  src="/about-team.jpg"
                  alt="Finquo Junior Team of Mentors, Educators and Students"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover object-center transform group-hover:scale-103 transition-transform duration-700"
                />
                {/* Soft Gradient Overlay for Text Clarity */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-transparent flex flex-col justify-end p-6 sm:p-10 md:p-14">
                  <div className="max-w-3xl space-y-2 text-white">
                    <span className="inline-block px-3.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs sm:text-sm font-bold uppercase tracking-wider border border-white/30">
                      Our Community
                    </span>
                    <h2 className="text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#ffffff] font-sans">
                      Building the Future Together
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-200 font-medium">
                      A passionate community of educators, mentors, parents, and young minds dedicated to financial empowerment.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* 5. Awards & Partners Section */}
      {isEnabled("about_awardsPartners") && <AwardsPartnersSection />}

      {/* 6. Shared Navigation Footer */}
      {isEnabled("about_footer") && <Footer />}

      {/* 7. Booking Modal */}
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
