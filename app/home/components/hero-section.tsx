import Image from "next/image";
import { GraduationCap, Sparkles } from "lucide-react";
import { BookDemoButton } from "@/components/book-demo-button";
import { PROOF_LINE } from "@/lib/site";
import { MODULES, BONUS_SUBJECTS } from "@/lib/syllabus";

interface HeroSectionProps {
  /** Show the Trustpilot rating beside the button. Controlled from /admin. */
  showTrustpilot?: boolean;
}

/* "190+" on its own line in the proof pill, the rest underneath — mirrors the "100K+ / learners" pill in the design. */
const PROOF_NUMBER = PROOF_LINE.split(" ")[0];
const PROOF_REST = PROOF_LINE.slice(PROOF_NUMBER.length + 1);

/* The three faces from the design's pill. */
const AVATARS = ["/hero-avatar-1.png", "/hero-avatar-2.png", "/hero-avatar-3.png"];

/* The strip under the hero lists what the programme covers: the five modules and the bonus subjects. */
const TOPICS = [...MODULES.map((m) => m.name), ...BONUS_SUBJECTS.map((s) => `Bonus: ${s}`)];

export function HeroSection({ showTrustpilot = false }: HeroSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-white via-white to-[#EEF0FF] pt-24 sm:pt-28 lg:pt-36">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center pb-14 lg:pb-20">
        {/* Left: words */}
        <div className="lg:col-span-6 flex flex-col text-left rise">
          <span className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#E8E4FF] px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#5B2BE0]">
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            A 20-session programme for Grades 5 to 8
          </span>

          <h1 className="mt-6 text-[38px] sm:text-5xl lg:text-[56px] xl:text-[64px] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0F1035] font-sans text-balance">
            The <span className="text-[#5B2BE0]">money lessons</span> school forgets to teach. Taught one child at a{" "}
            <span className="text-[#5B2BE0]">time.</span>
          </h1>

          <p className="mt-6 text-gray-500 text-base sm:text-lg leading-relaxed max-w-xl">
            A 20-session financial literacy programme for Grades 5 to 8. One live hour a week, 1-on-1 with the same mentor, with printed worksheets
            for every session.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5 sm:gap-7">
            <BookDemoButton placement="hero" size="lg" arrow />

            {showTrustpilot && (
              <div className="flex flex-col gap-1 select-none">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#00B67A]" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0l3.09 9.51h10l-8.09 5.88 3.09 9.51L12 19.02l-8.09 5.88 3.09-9.51L0 9.51h10z" />
                  </svg>
                  <span className="font-bold text-gray-900 text-xs sm:text-sm tracking-tight font-sans">Trustpilot</span>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-4 h-4 sm:w-5 sm:h-5 bg-[#00B67A] flex items-center justify-center rounded-[2px]">
                      <svg className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-white fill-current" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs sm:text-sm text-gray-500 font-medium">Free 1-hour demo. No payment. Parent can sit in.</p>
        </div>

        {/* Right: the picture card from the design, with our proof pill laid over its corner */}
        <div className="lg:col-span-6 rise-2">
          <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden aspect-[826/602] bg-[#EAE6FF]">
            <Image
              src="/hero-card.jpg"
              alt="A smiling girl resting her chin on her hand, looking up"
              fill
              priority
              quality={90}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 50vw, 100vw"
              className="object-cover select-none"
            />
            {/* Sits exactly over the pill painted into the picture, so only ours shows. */}
            <div className="absolute left-[52%] right-[0.8%] top-[78%] bottom-[0.8%] flex items-center gap-2 sm:gap-3 rounded-full bg-white pl-2 pr-3 sm:pl-3 sm:pr-5 shadow-lg shadow-indigo-900/10">
              <div className="flex -space-x-2.5 sm:-space-x-3 shrink-0" aria-hidden="true">
                {AVATARS.map((src) => (
                  <span key={src} className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden ring-2 ring-white bg-indigo-100">
                    <Image src={src} alt="" fill sizes="44px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="leading-tight min-w-0">
                <span className="block text-base sm:text-2xl font-black text-[#0F1035] tabular-nums">{PROOF_NUMBER}</span>
                <span className="block text-[9px] sm:text-[11px] text-gray-500 font-medium leading-tight">{PROOF_REST}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What the programme covers, on a loop — black sparkles and plain text on the hero's own ground, as in the design */}
      <div className="py-6 sm:py-8 overflow-hidden" aria-label="What your child learns">
        <div className="flex w-max animate-[marquee_40s_linear_infinite]">
          {[0, 1].map((copy) => (
            <ul key={copy} className="flex shrink-0 items-center gap-16 sm:gap-24 pr-16 sm:pr-24 list-none m-0 p-0" aria-hidden={copy === 1}>
              {TOPICS.map((topic) => (
                <li key={topic} className="inline-flex items-center gap-4 text-[15px] sm:text-base font-medium text-[#0F1035] whitespace-nowrap">
                  <Sparkles className="w-6 h-6 text-[#0F1035] fill-[#0F1035]" strokeWidth={1.5} aria-hidden="true" />
                  {topic}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
