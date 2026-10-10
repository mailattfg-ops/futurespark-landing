import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MENTORS } from "@/lib/mentors";
import { TESTIMONIALS, testimonialMeta } from "@/lib/testimonials";
import { PROOF_LINE } from "@/lib/site";

export function MentorsParentsSection() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-14 border-t border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight font-sans">Meet the mentors</h2>

        <ul className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 list-none m-0 p-0">
          {MENTORS.map((m) => (
            <li key={m.slug}>
              <Link href="/mentors" className="group block rounded-2xl sm:rounded-[22px] overflow-hidden border border-gray-200/90 bg-white shadow-sm hover:shadow-lg transition-shadow">
                <div className="relative w-full aspect-[3/4] bg-gray-100">
                  <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover object-top" />
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="text-sm sm:text-base font-extrabold text-gray-900 leading-tight group-hover:text-[#4F46E5] transition-colors">{m.name}</h3>
                  <p className="text-[11px] sm:text-xs text-gray-500 font-medium mt-1 leading-snug">{m.role}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <div className="text-center mt-5">
          <Link href="/mentors" className="inline-flex items-center gap-1.5 min-h-[44px] text-sm font-bold text-[#4F46E5] hover:underline">
            All mentor profiles <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        {TESTIMONIALS.length > 0 && (
          <>
            <h2 className="mt-14 sm:mt-16 text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight font-sans">What parents and kids say</h2>
            <ul className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 list-none m-0 p-0">
              {TESTIMONIALS.map((t) => (
                <li key={t.name + t.quote.slice(0, 12)} className="rounded-3xl border border-gray-200/90 bg-[#FAF9FF] p-6 sm:p-7 flex flex-col justify-between">
                  <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed italic m-0">“{t.quote}”</blockquote>
                  <p className="mt-5 pt-4 border-t border-gray-100 text-sm font-bold text-gray-900">{testimonialMeta(t)}</p>
                </li>
              ))}
            </ul>
          </>
        )}

        <p className="mt-10 text-center text-base sm:text-lg font-extrabold text-gray-900">{PROOF_LINE}</p>
      </div>
    </section>
  );
}
