"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#371085] text-white pt-16 sm:pt-20 pb-10 sm:pb-12 relative overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12">
          {/* Column 1: Brand & Mission (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="relative w-40 h-10">
                <Image
                  src="/finquo-footer-logo.png"
                  alt="Finquo Junior"
                  fill
                  priority
                  unoptimized
                  sizes="160px"
                  className="object-contain object-left"
                />
              </div>
            </Link>

            <p className="text-xs sm:text-[13px] text-white/85 max-w-sm leading-relaxed font-normal pt-1">
              Raising a financially secure generation through curated, ISO-grade weekly 1-on-1 mentorship sessions for ages 8 to 18.
            </p>

            {/* Email Contact */}
            <div className="pt-1">
              <a
                href="mailto:info@finquo.ai"
                className="inline-flex items-center gap-2.5 w-fit text-xs sm:text-[13px] text-white/85 hover:text-white font-medium transition-colors"
              >
                <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                info@finquo.ai
              </a>
            </div>
          </div>

          {/* Column 2: OFFICE ADDRESSES (span 4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white mb-4">
              OUR OFFICES
            </h4>
            
            {/* Calicut Office */}
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/85">
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
              </span>
              <div>
                <strong className="text-white block font-bold">Calicut Office (India):</strong>
                <span>Cyberpark, Kozhikode (Calicut), Kerala, India</span>
                <a href="tel:+919745001121" className="flex items-center gap-1 mt-1 text-amber-300 hover:underline font-semibold">
                  <Phone className="w-3 h-3" /> +91 97450 01121
                </a>
              </div>
            </div>

            {/* Dubai Office */}
            <div className="flex items-start gap-2.5 text-xs sm:text-[13px] text-white/85 pt-1">
              <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-amber-300" />
              </span>
              <div>
                <strong className="text-white block font-bold">Dubai Office (UAE):</strong>
                <span>Business Bay, Dubai, United Arab Emirates</span>
                <a href="tel:+97143218899" className="flex items-center gap-1 mt-1 text-amber-300 hover:underline font-semibold">
                  <Phone className="w-3 h-3" /> +971 4 321 8899
                </a>
              </div>
            </div>
          </div>

          {/* Column 3: NAVIGATION (span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white mb-4">
                EXPLORE & RESOURCES
              </h4>
              <ul className="grid grid-cols-2 gap-3 text-xs sm:text-[13px] text-white/80 font-medium">
                <li>
                  <Link href="/curriculum" className="hover:text-white transition-colors">
                    Curriculum Details
                  </Link>
                </li>
                <li>
                  <Link href="/teachers" className="hover:text-white transition-colors">
                    Our Teachers
                  </Link>
                </li>
                <li>
                  <Link href="/about-us" className="hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#book-demo" className="hover:text-white transition-colors">
                    Schedule Demo
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="hover:text-white transition-colors">
                    Help Center / FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <Link
                href="#book-demo"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center justify-center bg-white text-[#371085] hover:bg-gray-100 text-xs sm:text-[13px] font-extrabold px-6 py-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer active:scale-95"
              >
                Book a Free Demo
              </Link>
            </div>
          </div>
        </div>

        {/* Thin Translucent White Divider */}
        <div className="border-t border-white/20 my-6 sm:my-8" />

        {/* Bottom Bar: Socials + Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-white/80">
          {/* Copyright */}
          <span className="text-[11px] text-white/70 font-normal">
            © 2026 Finquo Junior. All rights reserved.
          </span>

          {/* Socials Icons */}
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">
              SOCIALS
            </span>

            <div className="flex items-center gap-2.5">
              {/* Instagram */}
              <a
                href="https://instagram.com/finquo.jr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com/finquojr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/company/finquo"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@finquojr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-8 h-8 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
