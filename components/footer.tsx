"use client";

import Link from "next/link";
import Image from "next/image";
import { Apple } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-[#371085] text-white pt-16 sm:pt-20 pb-10 sm:pb-12 relative overflow-hidden">
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

            <p className="text-xs sm:text-[13px] text-white/85 max-w-sm leading-relaxed font-normal font-sans pt-1">
              Raising a financially secure generation through curated, ISO-grade weekly 1-on-1 mentorship sessions for ages 8 to 18.
            </p>
          </div>

          {/* Column 2: EXPLORE (span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white mb-4 font-sans">
              EXPLORE
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-white/80 font-medium font-sans">
              <li>
                <Link href="#about" className="hover:text-white transition-colors">
                  Mission & Scope
                </Link>
              </li>
              <li>
                <Link href="#curriculum" className="hover:text-white transition-colors">
                  Curriculum Details
                </Link>
              </li>
              <li>
                <Link href="#teachers" className="hover:text-white transition-colors">
                  Our Teachers
                </Link>
              </li>
              <li>
                <Link href="#enterprise" className="hover:text-white transition-colors">
                  Enterprise Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: RESOURCES (span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-white mb-4 font-sans">
              RESOURCES
            </h4>
            <ul className="space-y-3 text-xs sm:text-[13px] text-white/80 font-medium font-sans">
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Parent Dashboard
                </Link>
              </li>
              <li>
                <Link href="#book-demo" className="hover:text-white transition-colors">
                  Schedule Demo
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#privacy" className="hover:text-white transition-colors">
                  Privacy & Safety Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: CTA Callout on Right (span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-start items-start">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight font-sans max-w-sm">
              Ready to change your child&apos;s outlook on money?
            </h3>
            <Link
              href="#book-demo"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("book-demo")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center justify-center bg-white text-[#371085] hover:bg-gray-100 text-xs sm:text-[13px] font-extrabold px-7 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all mt-5 cursor-pointer active:scale-95"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>

        {/* Thin Translucent White Divider */}
        <div className="border-t border-white/20 my-6 sm:my-8" />

        {/* Bottom Bar: Available on Store Badges + Socials + Copyright */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 text-xs text-white/80">
          {/* Left: Available on App Store / Play Store */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs text-white/90 font-medium font-sans mr-1">
              Available on
            </span>

            {/* App Store Button */}
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              <Apple className="w-3.5 h-3.5" />
              <span>APP STORE</span>
            </Link>

            {/* Play Store Button */}
            <Link
              href="#"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-wider transition-all"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .66.12.92.32l12.44 8.5c.67.46.85 1.37.39 2.04-.1.15-.23.28-.39.39L5.42 21.68c-.26.2-.58.32-.92.32-.83 0-1.5-.67-1.5-1.5z" />
              </svg>
              <span>PLAY STORE</span>
            </Link>
          </div>

          {/* Right: Socials Icons + Copyright */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-white/90">
              SOCIALS
            </span>

            {/* Social Icons */}
            <div className="flex items-center gap-2">
              {/* Instagram */}
              <Link
                href="#"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Link>

              {/* Facebook */}
              <Link
                href="#"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </Link>

              {/* Twitter / X */}
              <Link
                href="#"
                aria-label="Twitter"
                className="w-7 h-7 rounded-full bg-white/15 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
            </div>

            {/* Copyright */}
            <span className="text-[11px] text-white/70 font-normal ml-2">
              © 2026 Finquo Junior. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
