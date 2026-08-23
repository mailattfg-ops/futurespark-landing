"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onOpenDemoModal?: () => void;
}

export function Navbar({ onOpenDemoModal }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isPilotPage = pathname === "/pilot";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-white shadow-md border-b border-gray-100"
        : "bg-transparent border-b border-transparent shadow-none"
        }`}
    >
      <div className="w-full max-w-8xl mx-auto px-4 sm:px-6 lg:px-18">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left: Brand Logo & Main Nav */}
          <div className={`flex items-center gap-6 lg:gap-10 ${!isPilotPage ? "pl-12 sm:pl-16 md:pl-6" : ""}`}>
            <Link href="/" className="flex items-center gap-2.5 group">
              {/* Finquo Spark Icon & Wordmark */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
                <Image
                  src="/finquo-logo.png"
                  alt="Finquo Junior Logo"
                  fill
                  sizes="36px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-lg sm:text-xl font-black tracking-tight text-gray-900 font-sans">
                  FINQUO
                </span>
                <span className="text-[11px] sm:text-xs font-bold text-gray-800 -mt-1 tracking-wide font-sans">
                  Junior
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-5 lg:gap-7">
              <Link
                href="/curriculum"
                className="text-sm lg:text-[15px] font-bold text-gray-900 hover:text-[#4F46E5] transition-colors"
              >
                Curriculum
              </Link>
              <Link
                href="/teachers"
                className="text-sm lg:text-[15px] font-bold text-gray-900 hover:text-[#4F46E5] transition-colors"
              >
                Teachers
              </Link>
              <Link
                href="/about-us"
                className="text-sm lg:text-[15px] font-bold text-gray-900 hover:text-[#4F46E5] transition-colors"
              >
                About Us
              </Link>
            </nav>
          </div>

          {/* Right: Actions (Reserve Your Seat) */}
          {!isPilotPage && (
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              <Link
                href="/pilot"
                className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                Free Pilot Program
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle Button */}
          <div className="flex md:hidden items-center gap-2.5">
            {!isPilotPage && (
              <Link
                href="/pilot"
                className="px-3 py-1.5 rounded-lg bg-[#F59E0B] text-white text-xs font-bold shadow-sm cursor-pointer"
              >
                Free Pilot Program
              </Link>
            )}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg text-gray-700 hover:text-gray-900 hover:bg-white/80 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 px-4 bg-white/95 backdrop-blur-md border border-gray-100 rounded-2xl shadow-xl mt-2 space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <nav className="flex flex-col space-y-2">
              <Link
                href="/curriculum"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#4F46E5] transition-colors"
              >
                Curriculum
              </Link>
              <Link
                href="/teachers"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#4F46E5] transition-colors"
              >
                Teachers
              </Link>
              <Link
                href="/about-us"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg text-base font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#4F46E5] transition-colors"
              >
                About Us
              </Link>
            </nav>
            {!isPilotPage && (
              <div className="pt-2 border-t border-gray-100">
                <Link
                  href="/pilot"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center px-4 py-2.5 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-sm font-bold shadow-md transition-all text-center cursor-pointer"
                >
                  Free Pilot Program
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Top Left Corner Red Ribbon - Pilot Version (Hidden on /pilot page) */}
      {!isPilotPage && (
        <div className="fixed top-0 left-0 z-[60] w-24 h-24 sm:w-32 sm:h-32 overflow-hidden pointer-events-none">
          <div className="absolute top-3.5 sm:top-5 -left-8 sm:-left-10 w-32 sm:w-40 py-0.5 sm:py-1 bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white text-[8px] sm:text-[10px] font-black uppercase tracking-wider text-center -rotate-45 shadow-md border-y border-white/30 select-none">
            Pilot Version
          </div>
        </div>
      )}
    </header>
  );
}
