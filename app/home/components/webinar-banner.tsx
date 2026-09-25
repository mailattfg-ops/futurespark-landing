import Image from "next/image";
import { CalendarDays, Clock, Video, ArrowRight } from "lucide-react";

// Edit these for the next webinar; everything else on the banner derives from them.
export const WEBINAR_URL = "https://webinar.finquo.ai/"; // navbar link
const BANNER_URL = "https://webinar.finquo.ai/register"; // fixed registration page
const WEBINAR = {
  eyebrow: "Free Live Webinar · Ages 8–18",
  headline: ["What Would Your", "Child Do With"],
  amount: "₹1,000?",
  subline: "Is Your Child Ready for the Real World of Money?",
  date: "Thursday, 1 October 2026",
  times: ["9:00 PM IST", "7:30 PM GST"],
  duration: "Live · 46 min",
};

export function WebinarBannerSection() {
  return (
    <section className="w-full bg-[#F4F3FB] py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header — same voice as the sections around it */}
        <div className="text-center mb-8 sm:mb-10">
          <h2 className="whitespace-nowrap text-[clamp(1.6rem,6vw,3.75rem)] font-extrabold tracking-tight text-[#0A0F3C]">
            Upcoming Live Webinar
          </h2>
          <p className="text-base sm:text-lg text-gray-600 mt-3 font-medium">
            Free for parents &amp; kids · Hosted by our mentors · Seats are limited
          </p>
        </div>
        <a
          href={BANNER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] overflow-hidden rounded-[28px] bg-white shadow-xl shadow-indigo-900/10 ring-1 ring-indigo-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-indigo-900/15"
        >
          {/* Left: the pitch */}
          <div className="flex flex-col justify-center gap-5 p-7 sm:p-10 lg:p-12">
            <span className="inline-flex w-fit items-center rounded-lg bg-[#EEF0FF] px-3 py-1.5 text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.12em] text-[#5B45F5]">
              {WEBINAR.eyebrow}
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black leading-[1.08] tracking-tight text-[#0A0F3C]">
              {WEBINAR.headline[0]}
              <br />
              {WEBINAR.headline[1]}{" "}
              <span className="text-[#5B45F5]">{WEBINAR.amount}</span>
            </h2>

            <p className="text-base sm:text-lg text-gray-600 font-medium">{WEBINAR.subline}</p>

            <div className="flex flex-col gap-3 text-sm sm:text-base">
              <div className="flex items-center gap-2.5 font-bold text-[#0A0F3C]">
                <CalendarDays className="h-[18px] w-[18px] text-[#5B45F5]" />
                {WEBINAR.date}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <Clock className="h-[18px] w-[18px] text-[#5B45F5]" />
                {WEBINAR.times.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs sm:text-sm font-extrabold text-[#5B45F5] shadow-sm"
                  >
                    {t}
                  </span>
                ))}
                <span className="inline-flex items-center gap-1.5 rounded-full border border-indigo-100 bg-white px-3 py-1 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm">
                  <Video className="h-3.5 w-3.5 text-[#5B45F5]" />
                  {WEBINAR.duration}
                </span>
              </div>
            </div>

            <div className="mt-1 flex flex-wrap items-center gap-4">
              <span className="inline-flex items-center gap-2 rounded-full bg-[#FF8A3D] px-6 py-3.5 text-sm sm:text-base font-extrabold text-white shadow-lg shadow-orange-500/30 transition-colors group-hover:bg-[#F0782B]">
                Reserve your FREE seat
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </span>
              <span className="text-sm font-bold text-[#5B45F5]">webinar.finquo.ai</span>
            </div>
          </div>

          {/* Right: the mentors, straight from the poster */}
          <div className="flex flex-col items-center justify-center gap-4 bg-[linear-gradient(160deg,#5B4CEC_0%,#4438C4_100%)] p-6 sm:p-8">
            <p className="text-[11px] sm:text-xs font-extrabold uppercase tracking-[0.2em] text-white/80">
              Meet your mentors
            </p>
            <Image
              src="/webinar-mentors.png"
              alt="CA Praveen P K, Malavika P S, Lakshmi Priya P and Mazina Thameem P"
              width={404}
              height={525}
              sizes="(min-width: 1024px) 30vw, 80vw"
              className="h-auto w-full max-w-[320px] lg:max-w-[360px]"
            />
          </div>
        </a>
      </div>
    </section>
  );
}
