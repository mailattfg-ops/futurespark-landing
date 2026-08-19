"use client";

import Image from "next/image";

interface AvatarItem {
  id: number;
  src: string;
  alt: string;
  isLarge?: boolean;
  top: string;
  left: string;
}

const avatars: AvatarItem[] = [
  // Column 1 (Leftmost small column: 3 items)
  {
    id: 1,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "3%",
    left: "2%",
  },
  {
    id: 2,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "38%",
    left: "2%",
  },
  {
    id: 3,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "73%",
    left: "2%",
  },

  // Column 2 (Top small circle & Big Avatar 1)
  {
    id: 4,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "3%",
    left: "15%",
  },
  {
    id: 5,
    src: "/teacher-avatar.png",
    alt: "Lead academic teacher",
    isLarge: true,
    top: "32%",
    left: "14%",
  },

  // Column 3 (Top small circle)
  {
    id: 6,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "3%",
    left: "28%",
  },

  // Column 4 (Center-left small column: 3 items)
  {
    id: 7,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "3%",
    left: "40%",
  },
  {
    id: 8,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "38%",
    left: "40%",
  },
  {
    id: 9,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "73%",
    left: "40%",
  },

  // Column 5 (Big Avatar 2 & Bottom 2 small circles)
  {
    id: 10,
    src: "/teacher-avatar.png",
    alt: "Lead academic teacher",
    isLarge: true,
    top: "6%",
    left: "52%",
  },
  {
    id: 11,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "73%",
    left: "53%",
  },
  {
    id: 12,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "73%",
    left: "65%",
  },

  // Column 6 (Right-middle small column: 3 items)
  {
    id: 13,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "3%",
    left: "75%",
  },
  {
    id: 14,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "38%",
    left: "75%",
  },
  {
    id: 15,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "73%",
    left: "75%",
  },

  // Column 7 (Rightmost small column: 3 items)
  {
    id: 16,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "3%",
    left: "87%",
  },
  {
    id: 17,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "38%",
    left: "87%",
  },
  {
    id: 18,
    src: "/teacher-avatar.png",
    alt: "Teacher mentor",
    top: "73%",
    left: "87%",
  },
];

export function JoinThousandsSection() {
  return (
    <section className="w-full bg-white py-14 sm:py-18 lg:py-20 border-t border-gray-100 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
            Join Thousands
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-gray-500 font-medium max-w-lg mx-auto mt-2.5 leading-relaxed font-sans">
            A growing community of parents nurturing financial sense, critical thinking, and enterprise.
          </p>
        </div>

        {/* Cohesive, evenly-gapped 18-circle avatar cluster */}
        <div className="relative w-full max-w-[760px] mx-auto h-[230px] sm:h-[280px] md:h-[320px] select-none">
          {avatars.map((item) => {
            const isLarge = item.isLarge;

            return (
              <div
                key={item.id}
                style={{
                  top: item.top,
                  left: item.left,
                }}
                className={`absolute transform transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer rounded-full shadow-xs hover:shadow-lg overflow-hidden bg-gray-100 ${
                  isLarge
                    ? "w-[88px] h-[88px] sm:w-[130px] sm:h-[130px] md:w-[155px] md:h-[155px] z-10 ring-2 sm:ring-4 ring-white"
                    : "w-[40px] h-[40px] sm:w-[54px] sm:h-[54px] md:w-[66px] md:h-[66px] z-0 ring-1 sm:ring-2 ring-white"
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={isLarge ? "155px" : "66px"}
                  className="object-cover object-center rounded-full"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
