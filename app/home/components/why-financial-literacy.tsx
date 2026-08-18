"use client";

import Image from "next/image";

interface FeaturePoint {
  title: string;
  description: string;
}

const features: FeaturePoint[] = [
  {
    title: "Real rupees, real trade-offs, real decisions.",
    description: "Every session ends with a task the child completes at home.",
  },
  {
    title: "Vetted with IIM faculty.",
    description:
      "The curriculum was reviewed by professionals from the Indian Institutes of Management before a single session was taught.",
  },
  {
    title: "One mentor per child.",
    description:
      "Not a classroom of forty. Not a pre-recorded video. One person, once a week, for a year.",
  },
];

export function WhyFinancialLiteracySection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 text-center tracking-tight mb-10 sm:mb-14 font-sans">
          Why Financial Literacy
        </h2>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          {/* Left Column: Classroom Boy Photo */}
          <div className="lg:col-span-5 relative w-full min-h-[320px] sm:min-h-[400px] lg:min-h-[460px] rounded-3xl sm:rounded-[32px] overflow-hidden shadow-sm">
            <Image
              src="/classroom-boy.png"
              alt="Happy young student enthusiastically raising hand in classroom"
              fill
              priority
              quality={100}
              sizes="(min-width: 1280px) 500px, (min-width: 1024px) 450px, 100vw"
              className="object-cover object-center"
            />
          </div>

          {/* Right Column: Cream Feature Card */}
          <div className="lg:col-span-7 bg-[#FFF8EE] border border-[#F7EBD9]/70 rounded-3xl sm:rounded-[32px] p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-center">
            {/* Card Heading */}
            <h3 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-gray-900 tracking-tight mb-6 sm:mb-8 font-sans">
              A grounding, not a lecture.
            </h3>

            {/* Feature Points List */}
            <div className="space-y-6 sm:space-y-7">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4 sm:gap-4.5">
                  {/* Yellow Sparkle Star Icon */}
                  <div className="flex-shrink-0 pt-0.5">
                    <Image
                      src="/star.png"
                      alt=""
                      width={22}
                      height={24}
                      style={{ width: "auto", height: "auto" }}
                      className="w-5 h-5 sm:w-5.5 sm:h-5.5 drop-shadow-xs select-none"
                    />
                  </div>

                  {/* Feature Text */}
                  <div className="flex flex-col">
                    <h4 className="text-sm sm:text-base font-extrabold text-gray-900 leading-snug font-sans">
                      {feature.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mt-1 font-normal">
                      {feature.description}
                    </p>
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
