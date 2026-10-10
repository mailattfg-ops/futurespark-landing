import Image from "next/image";
import { Video } from "lucide-react";

const steps = [
  { title: "Free demo", description: "A free one-hour class so you can see how your child responds." },
  { title: "Match", description: "We pair your child with a mentor who fits their age, pace and personality. Same mentor for all 20 sessions." },
  { title: "Weekly session", description: "One live, 1-on-1 hour each week, with a printed worksheet and sticker pack for every session." },
  {
    title: "Capstone, certificate and bonus",
    description:
      "A two-session capstone where your child builds and presents a small business, a Finquo Junior certificate at graduation, then five free bonus sessions in AI, Public Speaking and Cyber Awareness.",
  },
];

/** Replace both with a real session capture from creative (brief F2 row 13). No invented names on the badges. */
const CALL = {
  mentor: { src: "/call-mentor.jpg", alt: "A mentor on a video call" },
  student: { src: "/call-student.png", alt: "A student on a video call" },
};

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="w-full bg-white py-10 sm:py-12 lg:py-14 border-t border-gray-100">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-8 sm:mb-10 font-sans">How It Works</h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Live 1-on-1 call mock-up */}
          <div className="lg:col-span-7 bg-white border border-gray-200/90 rounded-[32px] sm:rounded-[40px] p-6 sm:p-7 md:p-8 shadow-2xl shadow-gray-200/70">
            <div className="flex items-center justify-between gap-4 mb-6 pb-1">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0 text-gray-700 bg-gray-50">
                  <Video className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 truncate font-sans">Financial Literacy Session 2</h4>
                  <p className="text-xs sm:text-sm text-gray-500 font-normal truncate mt-0.5 font-sans">This session is being recorded and transcribed</p>
                </div>
              </div>
              <span className="px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold flex-shrink-0 select-none" aria-hidden="true">
                End call
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              <div className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
                <div className="absolute top-3.5 left-3.5 z-20 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs text-white font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" aria-hidden="true" />
                  <span>Recording</span>
                </div>
                <Image src={CALL.mentor.src} alt={CALL.mentor.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover object-top select-none" />
              </div>
              <div className="relative w-full h-[220px] sm:h-[260px] md:h-[290px] lg:h-[310px] rounded-2xl sm:rounded-3xl overflow-hidden bg-gray-100 shadow-inner">
                <Image src={CALL.student.src} alt={CALL.student.alt} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="object-cover object-top select-none" />
              </div>
            </div>
          </div>

          {/* The four steps */}
          <ol className="lg:col-span-5 space-y-6 sm:space-y-8 list-none m-0 p-0">
            {steps.map((step, index) => (
              <li key={step.title} className="flex items-start gap-4 sm:gap-4.5">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-50 text-[#4F46E5] text-sm font-black flex items-center justify-center" aria-hidden="true">
                  {index + 1}
                </span>
                <div className="flex flex-col">
                  <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug font-sans">{step.title}</h3>
                  <p className="text-[14px] sm:text-[15px] leading-5 text-gray-600 mt-1 font-normal font-sans">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
