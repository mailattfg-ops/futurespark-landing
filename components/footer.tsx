import Link from "next/link";
import Image from "next/image";
import { Mail, Phone, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import { POLICY_LINKS } from "@/components/legal-page";
import { CONTACT, FOOTER_TAGLINE, LEGAL_NAME, demoUrl, webinarUrl, DEMO_LABEL } from "@/lib/site";

const SOCIAL = "w-11 h-11 rounded-full bg-[#1E1B4B] hover:bg-[#0F1035] text-white flex items-center justify-center transition-[background-color,transform] duration-200 hover:scale-110";
const LINK = "flex items-center justify-between min-h-[44px] py-2 border-b border-white/15 text-sm sm:text-[15px] text-white/90 hover:text-white";

const EXPLORE = [
  { label: "Curriculum", href: "/curriculum" },
  { label: "Mentors", href: "/mentors" },
  { label: "About Us", href: "/about-us" },
  { label: "FAQ", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="w-full bg-gradient-to-b from-[#5B45F5] to-[#6D3BD9] text-white pt-14 sm:pt-20 pb-8 relative overflow-hidden font-sans">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-10 sm:pb-14">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block">
              <div className="relative w-36 h-9 sm:w-40 sm:h-10">
                <Image src="/finquo-footer-logo.png" alt="Finquo Junior" fill unoptimized sizes="(max-width: 640px) 144px, 160px" className="object-contain object-left" />
              </div>
            </Link>
            <p className="mt-6 text-lg sm:text-xl font-bold leading-snug max-w-sm">{FOOTER_TAGLINE}</p>
            <div className="mt-7 flex items-center gap-3">
              <a href={`mailto:${CONTACT.email}`} aria-label="Email" className={SOCIAL}>
                <Mail className="w-4 h-4" />
              </a>
              <a href={CONTACT.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={SOCIAL}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={SOCIAL}>
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <span className="ml-2 pl-5 border-l border-white/25 text-sm sm:text-[15px]">
                <a href={`mailto:${CONTACT.email}`} className="hover:underline">{CONTACT.email}</a>
              </span>
            </div>
          </div>

          {/* Offices */}
          <div className="lg:col-span-5 lg:px-8 lg:border-r lg:border-white/15">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Our Offices</h3>
            <div className="mt-5 space-y-6">
              {[
                { label: "India Office", address: "Tower 2, 2nd Floor, 2/1149/I 94, 95, 96, HiLITE Business Park, Guruvayurappan College Road, Olavanna, Kozhikode, Kerala - 673014", phone: CONTACT.phone, href: CONTACT.phoneHref },
                { label: "UAE Office", address: "World Trade Centre, Latifa Tower, Office No. 201, Sheikh Zayed Rd (opposite Museum of the Future), Dubai, United Arab Emirates", phone: CONTACT.uaePhone, href: CONTACT.uaePhoneHref },
              ].map((o, i) => (
                <div key={o.label} className={`flex items-start gap-4 ${i === 1 ? "pt-6 border-t border-white/15" : ""}`}>
                  <span className="w-11 h-11 rounded-full bg-[#1E1B4B] flex items-center justify-center flex-shrink-0" aria-hidden="true">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div className="text-sm">
                    <p className="text-base font-bold m-0">{o.label}</p>
                    <p className="mt-1 text-white/80 leading-relaxed m-0">{o.address}</p>
                    <a href={o.href} className="mt-2 inline-flex items-center gap-2 min-h-[44px] font-bold text-[#FFC53D] hover:underline">
                      <Phone className="w-4 h-4" /> {o.phone}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Explore &amp; Resources</h3>
            <ul className="mt-4 list-none m-0 p-0">
              {EXPLORE.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={LINK}>
                    {l.label} <ArrowUpRight className="w-4 h-4 text-white/60" aria-hidden="true" />
                  </Link>
                </li>
              ))}
              <li>
                <a href={webinarUrl("footer")} target="_blank" rel="noopener noreferrer" className={LINK}>
                  Free Webinar <ArrowUpRight className="w-4 h-4 text-white/60" aria-hidden="true" />
                </a>
              </li>
            </ul>
            <a
              href={demoUrl("footer")}
              className="mt-7 inline-flex items-center gap-4 min-h-[44px] rounded-full bg-white pl-7 pr-2 py-2 text-base font-bold text-[#4F46E5] shadow-lg hover:bg-indigo-50 transition-colors"
            >
              {DEMO_LABEL}
              <span className="w-10 h-10 rounded-full bg-[#4F46E5] text-white flex items-center justify-center" aria-hidden="true">
                <ArrowRight className="w-4 h-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="border-t border-white/20 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/75 text-center sm:text-left">
          <span>© 2026 {LEGAL_NAME}. All rights reserved.</span>
          <nav aria-label="Policies" className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1">
            {POLICY_LINKS.map((p, i) => (
              <span key={p.href} className="flex items-center">
                {i > 0 && <span className="mx-3 text-white/30" aria-hidden="true">|</span>}
                <Link href={p.href} className="flex items-center min-h-[44px] hover:text-white hover:underline">{p.label}</Link>
              </span>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
