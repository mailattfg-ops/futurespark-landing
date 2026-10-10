import Image from "next/image";
import { CalendarDays, Clock } from "lucide-react";
import { WebinarButton } from "@/components/book-demo-button";
import { WEBINAR } from "@/lib/site";

/**
 * Evergreen webinar block (brief F2 row 22, F10). No date is typed into this
 * page. When the webinar site exposes a next-session feed, read it here and
 * show the date beside the artwork; until then only the schedule line shows.
 * The dateless artwork from creative goes in ARTWORK when it arrives.
 */
const ARTWORK = { src: "", alt: "Finquo Junior free live webinar for parents and children" };

export function WebinarBannerSection() {
  return (
    <section id="webinar" className="w-full bg-[#F4F3FB] py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 ${ARTWORK.src ? "lg:grid-cols-2" : ""} gap-8 lg:gap-12 items-center`}>
          <div className={ARTWORK.src ? "" : "text-center max-w-3xl mx-auto"}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#0A0F3C] font-sans text-balance">
              Free live webinar, every Monday and Thursday.
            </h2>
            <div className={`mt-5 flex flex-col gap-2 text-sm sm:text-base text-gray-700 ${ARTWORK.src ? "" : "items-center"}`}>
              <p className="inline-flex items-center gap-2 font-semibold">
                <CalendarDays className="w-[18px] h-[18px] text-[#4F46E5]" aria-hidden="true" />
                {WEBINAR.schedule}
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
