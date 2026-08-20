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
  // --- Left Column Group (Col 1) ---
  { id: 1, src: "/teacher-avatar.png", alt: "Community member", top: "12%", left: "0%" },
  { id: 2, src: "/teacher-avatar.png", alt: "Community member", top: "38%", left: "0%" },
  { id: 3, src: "/teacher-avatar.png", alt: "Community member", top: "64%", left: "0%" },

  // --- Left Center Group (Col 2 & Big Circle 1) ---
  { id: 4, src: "/teacher-avatar.png", alt: "Community member", top: "12%", left: "13.5%" },
  { id: 5, src: "/teacher-avatar.png", alt: "Featured parent", isLarge: true, top: "34%", left: "12.5%" },

  // --- Top-Center Group (Col 3) ---
  { id: 6, src: "/teacher-avatar.png", alt: "Community member", top: "12%", left: "26%" },
  { id: 7, src: "/teacher-avatar.png", alt: "Community member", top: "64%", left: "37.5%" },

  // --- Middle Column (Col 4 - between the 2 Big Circles) ---
  { id: 8, src: "/teacher-avatar.png", alt: "Community member", top: "12%", left: "38.5%" },
  { id: 9, src: "/teacher-avatar.png", alt: "Community member", top: "38%", left: "38.5%" },

  // --- Right-Center Group (Big Circle 2 & Bottom circles under it) ---
  { id: 10, src: "/teacher-avatar.png", alt: "Featured mentor", isLarge: true, top: "12%", left: "49.5%" },
  { id: 11, src: "/teacher-avatar.png", alt: "Community member", top: "64%", left: "51.5%" },
  { id: 12, src: "/teacher-avatar.png", alt: "Community member", top: "64%", left: "64%" },

  // --- Right Column Group (Col 6) ---
  { id: 13, src: "/teacher-avatar.png", alt: "Community member", top: "12%", left: "74.5%" },
  { id: 14, src: "/teacher-avatar.png", alt: "Community member", top: "38%", left: "74.5%" },
  { id: 15, src: "/teacher-avatar.png", alt: "Community member", top: "64%", left: "74.5%" },

  // --- Far Right Column Group (Col 7) ---
  { id: 16, src: "/teacher-avatar.png", alt: "Community member", top: "12%", left: "86.5%" },
  { id: 17, src: "/teacher-avatar.png", alt: "Community member", top: "38%", left: "86.5%" },
  { id: 18, src: "/teacher-avatar.png", alt: "Community member", top: "64%", left: "86.5%" },
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

        {/* 18-Circle Avatar Cluster matching Figma Image 2 reference layout */}
        <div className="relative w-full max-w-[860px] mx-auto h-[270px] sm:h-[330px] md:h-[380px] select-none">
          {avatars.map((item) => {
            const isLarge = item.isLarge;

            return (
              <div
                key={item.id}
                style={{
                  top: item.top,
                  left: item.left,
                }}
                className={`absolute transform transition-all duration-300 hover:scale-105 hover:z-20 cursor-pointer rounded-full overflow-hidden bg-gray-100 
                  ${isLarge
                    ? "w-[98px] h-[98px] sm:w-[145px] sm:h-[145px] md:w-[185px] md:h-[185px] z-10"
                    : "w-[44px] h-[44px] sm:w-[58px] sm:h-[58px] md:w-[70px] md:h-[70px] z-0"
                  }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={isLarge ? "185px" : "70px"}
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



