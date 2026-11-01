import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { WebinarButton } from "@/components/book-demo-button";
import { WEBINAR } from "@/lib/site";
import { NextWebinarDate } from "@/components/next-webinar-date";

/**
 * Webinar block (brief F2 row 22, F10). Shows only the next session's date,
 * worked out from the schedule in lib/site.ts; no date is typed into this page.
 * The dateless artwork from creative goes in ARTWORK when it arrives.
 */
const ARTWORK = { src: "", alt: "Finquo Junior free live webinar for parents and children" };

export function WebinarBannerSection() {
  return (
    <section id="webinar" className="w-full bg-gradient-to-b from-[#EEF0FF] to-white py-14 sm:py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${ARTWORK.src ? "lg:grid-cols-2" : ""} gap-8 lg:gap-12 items-center`}>
          <div className={ARTWORK.src ? "" : "text-center max-w-3xl mx-auto"}>
            <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#0F1035] font-sans text-balance">
              Next Free Live Webinar: <NextWebinarDate />
            </h2>
            <div className={`mt-5 flex flex-col gap-2 text-sm sm:text-base text-gray-700 ${ARTWORK.src ? "" : "items-center"}`}>
              <p className="inline-flex items-center gap-2 font-semibold">
                <CalendarDays className="w-[18px] h-[18px] text-[#4F46E5]" aria-hidden="true" />
                <span><NextWebinarDate />, 8:00 PM IST</span>
              </p>
              <p className="inline-flex items-start gap-2">
                <Clock className="w-[18px] h-[18px] text-[#4F46E5] mt-0.5 shrink-0" aria-hidden="true" />
                <span>{WEBINAR.times}. Free for parents and children.</span>
              </p>
            </div>
            <div className="mt-7">
              <WebinarButton placement="webinar_block" size="lg" arrow />
            </div>
          </div>
          {ARTWORK.src && (
            <div className="relative w-full aspect-video rounded-2xl sm:rounded-[28px] overflow-hidden shadow-xl ring-1 ring-indigo-100">
              <Image src={ARTWORK.src} alt={ARTWORK.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
