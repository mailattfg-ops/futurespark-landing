"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { getDefaultSectionState, SectionState, clearLegacyStorage } from "@/lib/section-config";
import { webinarUrl, WEBINAR, DEMO_LABEL } from "@/lib/site";
import { BookDemoButton } from "@/components/book-demo-button";

const LINK = "text-sm lg:text-[15px] font-bold text-gray-900 hover:text-[#4F46E5] transition-colors py-2";
const MOBILE_LINK =
  "flex items-center min-h-[44px] px-3 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#4F46E5] transition-colors";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());

  useEffect(() => {
    clearLegacyStorage();

    async function loadSectionsConfig() {
      try {
        const res = await fetch("/api/sections", { cache: "no-store" });
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) setSections(json.data);
        }
      } catch {}
    }
    loadSectionsConfig();

    const handleUpdate = () => loadSectionsConfig();
    window.addEventListener("storage_sections_updated", handleUpdate);
    return () => window.removeEventListener("storage_sections_updated", handleUpdate);
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { key: "navbar_curriculum", href: "/curriculum", label: "Curriculum", mobileLabel: "Curriculum", external: false },
    { key: "navbar_mentors", href: "/mentors", label: "Mentors", mobileLabel: "Mentors", external: false },
    { key: "navbar_about", href: "/about-us", label: "About Us", mobileLabel: "About Us", external: false },
    { key: "navbar_event", href: webinarUrl("header"), label: "Free Webinar", mobileLabel: WEBINAR.menuLabel, external: true },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white shadow-md border-b border-gray-100" : "bg-transparent border-b border-transparent shadow-none"
      }`}
    >
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-18">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Brand Logo & Main Nav */}
          <div className="flex items-center gap-6 lg:gap-10 md:pl-6">
            <Link href="/" className="flex items-center group">
              <div className="relative w-32 h-8 sm:w-44 sm:h-11 flex-shrink-0">
                <Image
                  src="/newlogo.png"
                  alt="Finquo Junior"
                  fill
                  sizes="(min-width: 640px) 176px, 128px"
                  className="object-contain object-left"
                  priority
                />
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-5 lg:gap-7">
              {links.map((l) =>
                !isEnabled(l.key) ? null : l.external ? (
                  <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" className={`inline-flex items-center gap-1.5 ${LINK}`}>
                    <span className="relative flex h-2 w-2" aria-hidden="true">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4F46E5] opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4F46E5]" />
                    </span>
                    {l.label}
                  </a>
                ) : (
                  <Link key={l.key} href={l.href} className={LINK}>
                    {l.label}
                  </Link>
                ),
              )}
            </nav>
          </div>

          {/* Right: demo button (desktop) */}
          {isEnabled("navbar_cta") && (
            <div className="hidden md:flex items-center">
              <BookDemoButton placement="header" size="sm" />
            </div>
          )}

          {/* Mobile: short label below 640px, menu toggle at 44px */}
          <div className="flex md:hidden items-center gap-2">
            {isEnabled("navbar_cta") && (
              <BookDemoButton placement="header" size="sm">
                <span className="sm:hidden">Free Demo</span>
                <span className="hidden sm:inline">{DEMO_LABEL}</span>
              </BookDemoButton>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-gray-700 hover:text-gray-900 hover:bg-white/80 transition-colors"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl mt-2 space-y-3">
            <nav className="flex flex-col space-y-1">
              {links.map((l) =>
                !isEnabled(l.key) ? null : l.external ? (
                  <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer" onClick={() => setMobileMenuOpen(false)} className={MOBILE_LINK}>
                    {l.mobileLabel}
                  </a>
                ) : (
                  <Link key={l.key} href={l.href} onClick={() => setMobileMenuOpen(false)} className={MOBILE_LINK}>
                    {l.mobileLabel}
                  </Link>
                ),
              )}
            </nav>
            {isEnabled("navbar_cta") && (
              <div className="pt-2 border-t border-gray-100">
                <BookDemoButton placement="header" className="w-full" />
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
