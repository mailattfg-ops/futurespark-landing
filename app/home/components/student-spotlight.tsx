import Image from "next/image";
import { TESTIMONIALS, testimonialMeta } from "@/lib/testimonials";

/* Card art is decorative: the photos are stock, not the families quoted, so they carry an empty alt. */
const ART = [
  { imageSrc: "/student-blue-fleece.png", archBg: "bg-[#CAD5FF]", badgeBg: "bg-[#5422E8]" },
  { imageSrc: "/student-white-top.png", archBg: "bg-[#FEF08A]", badgeBg: "bg-[#656E0D]" },
  { imageSrc: "/student-blue-fleece.png", archBg: "bg-[#BAE6FD]", badgeBg: "bg-[#0E5266]" },
];

export function StudentSpotlightSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="w-full bg-[#4E1FE7] py-10 sm:py-12 lg:py-14 relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white text-center tracking-tight mb-8 sm:mb-10 font-sans">Student Spotlight</h2>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch list-none m-0 p-0">
          {TESTIMONIALS.slice(0, 3).map((t, index) => {
            const art = ART[index % ART.length];
            return (
              <li key={t.name + t.quote.slice(0, 12)} className="bg-white rounded-3xl sm:rounded-[32px] overflow-hidden shadow-2xl flex flex-col justify-between">
                <blockquote className="p-6 sm:p-7 text-sm sm:text-base text-gray-700 font-medium leading-relaxed italic m-0">“{t.quote}”</blockquote>
                <div className={`relative ${art.archBg} mx-6 sm:mx-7 rounded-t-[120px] h-40 overflow-hidden`} aria-hidden="true">
                  <Image src={art.imageSrc} alt="" fill sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw" className="object-cover object-top" />
                </div>
                <p className={`${art.badgeBg} text-white text-sm font-extrabold px-6 py-3.5 text-center`}>{testimonialMeta(t)}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
