import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MENTORS } from "@/lib/mentors";

/** "Meet the mentors" on the homepage. The parent quotes live in parent-reviews.tsx. */
export function MentorsParentsSection() {
  return (
    <section className="w-full bg-gradient-to-b from-[#EEF0FF] via-[#F7F8FF] to-white py-14 sm:py-20">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-[0.3em] text-[#5B2BE0]">Our mentors</p>
        <h2 className="mt-3 text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] text-center tracking-[-0.03em] font-sans">Meet the mentors</h2>
        <span className="block mx-auto mt-4 h-1 w-16 rounded-full bg-[#5B2BE0]" aria-hidden="true" />
        <p className="mt-5 max-w-2xl mx-auto text-center text-base sm:text-lg text-gray-500 leading-relaxed">
          Every child learns with one mentor for all 20 sessions. The team is led by a Chartered Accountant and taught by Finquo Junior master mentors.
        </p>

        <ul className="mt-10 sm:mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 list-none m-0 p-0">
          {MENTORS.map((m) => (
            <li key={m.slug}>
              <Link href="/mentors" className="group lift block h-full rounded-xl border border-[#E4E6F2] bg-white overflow-hidden hover:shadow-lg hover:shadow-indigo-900/10">
                <div className="relative w-full aspect-[4/5] bg-[#F3F4F8]">
                  <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]" />
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="text-base sm:text-xl font-extrabold text-[#0F1035] leading-tight group-hover:text-[#4F46E5] transition-colors">{m.name}</h3>
                  <p className="mt-3 pt-3 border-t border-[#E4E6F2] text-xs sm:text-sm text-gray-500 leading-snug">{m.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>

        <div className="text-center mt-8">
          <Link href="/mentors" className="inline-flex items-center gap-1.5 min-h-[44px] text-sm sm:text-base font-bold text-[#4F46E5] hover:underline">
            All mentor profiles <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
