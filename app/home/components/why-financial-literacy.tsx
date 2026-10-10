import Image from "next/image";

const features = [
  {
    title: "Real rupees, real trade-offs, real decisions.",
    description: "Every session ends with a task the child completes at home.",
  },
  {
    // Reviewer names go here when marketing supplies them (brief F2 row 7).
    title: "Vetted by industry experts.",
    description: "The curriculum was reviewed by finance and education professionals before a single session was taught.",
  },
  {
    title: "One mentor per child.",
    description: "Not a classroom of forty. Not a pre-recorded video. One person, once a week, for 20 weeks.",
  },
];

/** Replace with the real 1-on-1 session image from creative (brief F2 row 9); keep the alt true to the picture. */
const IMAGE = { src: "/classroom-boy.png", alt: "A young student raising his hand in a classroom" };

export function WhyFinancialLiteracySection() {
  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-14">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-10 sm:mb-14 font-sans">
          Why Financial Literacy
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-5 relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm">
            <Image src={IMAGE.src} alt={IMAGE.alt} fill sizes="(min-width: 1280px) 500px, (min-width: 1024px) 450px, 100vw" className="object-cover object-center" />
          </div>

          <div className="lg:col-span-7 bg-[#FFF8EE] border border-[#F7EBD9]/70 rounded-3xl sm:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-gray-900 tracking-tight mb-6 sm:mb-8 font-sans">A grounding, not a lecture.</h3>

            <div className="space-y-6 sm:space-y-7">
              {features.map((feature) => (
                <div key={feature.title} className="flex items-start gap-4 sm:gap-4.5">
                  <div className="flex-shrink-0 pt-0.5">
                    <Image src="/star.png" alt="" width={22} height={24} style={{ width: "auto", height: "auto" }} className="w-5 h-5 sm:w-5.5 sm:h-5.5 select-none" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug font-sans">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1 font-normal">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
