import Image from "next/image";
import { Coins, GraduationCap, UserRound } from "lucide-react";

const features = [
  {
    title: "Real rupees, real trade-offs, real decisions.",
    description: "Every session ends with a task the child completes at home.",
    icon: <Coins className="w-7 h-7" aria-hidden="true" />,
    bg: "bg-[#F5A524]",
    number: "text-[#F5A524]",
  },
  {
    // Reviewer names go here when marketing supplies them (brief F2 row 7).
    title: "Vetted by industry experts.",
    description: "The curriculum was reviewed by finance and education professionals before a single session was taught.",
    icon: <GraduationCap className="w-7 h-7" aria-hidden="true" />,
    bg: "bg-[#3B6CFF]",
    number: "text-[#3B6CFF]",
  },
  {
    title: "One mentor per child.",
    description: "Not a classroom of forty. Not a pre-recorded video. One person, once a week, for 20 weeks.",
    icon: <UserRound className="w-7 h-7" aria-hidden="true" />,
    bg: "bg-[#F26B2E]",
    number: "text-[#F26B2E]",
  },
];

/** Replace with the real 1-on-1 session image from creative (brief F2 row 9); keep the alt true to the picture. */
const IMAGE = { src: "/classroom-boy.png", alt: "A young student raising his hand in a classroom" };

export function WhyFinancialLiteracySection() {
  return (
    <section className="w-full bg-gradient-to-b from-[#EEF0FF] to-white py-14 sm:py-20">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] text-center tracking-[-0.03em] font-sans text-balance">
          Why <span className="text-[#3B6CFF]">Financial</span> Literacy
        </h2>
        <p className="mt-3 text-center text-base sm:text-lg text-gray-500 font-medium">A grounding, not a lecture.</p>

        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Photo on a purple blob */}
          <div className="lg:col-span-5 relative px-4 sm:px-6">
            <div className="absolute -left-2 -top-6 w-[62%] h-[70%] rounded-[56px] bg-[#C7BBFF]/70 rotate-[-8deg]" aria-hidden="true" />
            <div className="absolute -left-4 bottom-2 w-[70%] h-28 rounded-[100%] border border-[#5B2BE0]/40" aria-hidden="true" />
            <div className="relative aspect-[4/3] rounded-[28px] overflow-hidden shadow-lg shadow-indigo-900/10 lift">
              <Image src={IMAGE.src} alt={IMAGE.alt} fill sizes="(min-width: 1024px) 460px, 100vw" className="object-cover object-center" />
            </div>
          </div>

          {/* The three reasons */}
          <ol className="lg:col-span-7 divide-y divide-[#E4E6F2] list-none m-0 p-0">
            {features.map((f, i) => (
              <li key={f.title} className="group flex items-center gap-5 py-6 first:pt-0 last:pb-0 transition-transform duration-300 hover:translate-x-1">
                <span className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${f.bg} text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3`}>{f.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-extrabold text-[#0F1035] leading-snug font-sans">{f.title}</h3>
                  <p className="mt-1 text-sm sm:text-[15px] text-gray-500 leading-relaxed">{f.description}</p>
                </div>
                <span className={`hidden sm:block pl-6 border-l border-[#E4E6F2] text-4xl font-black tabular-nums ${f.number}`} aria-hidden="true">
                  0{i + 1}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
