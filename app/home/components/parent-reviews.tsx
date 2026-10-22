import Image from "next/image";
import { TESTIMONIALS } from "@/lib/testimonials";
import { TestimonialCarousel } from "@/components/testimonial-carousel";
import { PROOF_LINE } from "@/lib/site";

const PROOF_NUMBER = PROOF_LINE.split(" ")[0];
const PROOF_REST = PROOF_LINE.slice(PROOF_NUMBER.length + 1);
const AVATARS = ["/hero-avatar-1.png", "/hero-avatar-2.png", "/hero-avatar-3.png"];

/** "Our Success Stories": the parent and student quotes with the proof tile. */
export function ParentReviewsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="reviews" className="relative w-full bg-gradient-to-b from-white to-[#EEF0FF] py-14 sm:py-20 overflow-hidden">
      <div className="absolute -right-24 top-10 w-80 h-80 rounded-[45%] bg-[#DED6FF]/60" aria-hidden="true" />
      <div className="absolute -left-16 bottom-0 w-40 h-40 rounded-[45%] bg-[#DED6FF]/60" aria-hidden="true" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] text-center tracking-[-0.03em] font-sans">
          Our <span className="text-[#5B2BE0]">Success</span> Stories
        </h2>

        <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-[minmax(280px,0.7fr)_2.1fr] gap-10 lg:gap-12 items-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0F1035]">
              What parents
              <br />
              <span className="text-[#5B2BE0]">and kids say</span>
            </h3>
            <p className="mt-4 text-base text-gray-500 leading-relaxed max-w-sm">
              Real families. Real experiences. See how Finquo Junior is helping children build lifelong money skills.
            </p>
            <div className="mt-6 inline-flex items-center gap-4 rounded-2xl bg-[#EEF0FF] px-4 py-3">
              <div className="flex -space-x-3" aria-hidden="true">
                {AVATARS.map((src) => (
                  <span key={src} className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-white bg-white">
                    <Image src={src} alt="" fill sizes="40px" className="object-cover" />
                  </span>
                ))}
              </div>
              <p className="leading-tight m-0">
                <span className="block text-lg font-extrabold text-[#5B2BE0] tabular-nums">{PROOF_NUMBER} families</span>
                <span className="block text-xs text-gray-500">{PROOF_REST.replace(/^families /, "")}</span>
              </p>
            </div>
          </div>

          <TestimonialCarousel items={TESTIMONIALS} />
        </div>
      </div>
    </section>
  );
}
