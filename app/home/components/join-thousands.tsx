"use client";

import Image from "next/image";

interface AvatarItem {
  id: number;
  src: string;
  alt: string;
  className: string;
}

const avatars: AvatarItem[] = [
  // Column 1 (Leftmost 3 gray man circles)
  {
    id: 1,
    src: "/avatar-man-gray.png",
    alt: "Community mentor in black t-shirt",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[0%] top-[4%]",
  },
  {
    id: 2,
    src: "/avatar-man-gray.png",
    alt: "Community mentor in black t-shirt",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[0%] top-[38%]",
  },
  {
    id: 3,
    src: "/avatar-man-gray.png",
    alt: "Community mentor in black t-shirt",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[0%] top-[72%]",
  },

  // Column 2 Top
  {
    id: 4,
    src: "/avatar-blonde-blue.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[12%] top-[4%]",
  },

  // Column 3 Top
  {
    id: 5,
    src: "/avatar-woman-pink.png",
    alt: "Community mentor",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[24%] top-[4%]",
  },

  // BIG HIGHLIGHT 1 (Pink Background - Left Center)
  {
    id: 6,
    src: "/avatar-woman-pink.png",
    alt: "Lead student success mentor",
    className:
      "w-36 h-36 sm:w-52 sm:h-52 md:w-60 md:h-60 left-[11%] top-[34%] z-10 hover:z-20",
  },

  // Column 4 (Plants Woman 3 circles)
  {
    id: 7,
    src: "/avatar-woman-plants.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[36%] top-[4%]",
  },
  {
    id: 8,
    src: "/avatar-woman-plants.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[36%] top-[38%]",
  },
  {
    id: 9,
    src: "/avatar-woman-plants.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[36%] top-[72%]",
  },

  // BIG HIGHLIGHT 2 (Blue Background - Center Right)
  {
    id: 10,
    src: "/avatar-blonde-blue.png",
    alt: "Lead financial literacy mentor",
    className:
      "w-36 h-36 sm:w-52 sm:h-52 md:w-56 md:h-56 left-[48%] top-[10%] z-10 hover:z-20",
  },

  // Bottom Center (Gray Man & Blue Woman)
  {
    id: 11,
    src: "/avatar-man-gray.png",
    alt: "Community mentor",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[49%] top-[72%]",
  },
  {
    id: 12,
    src: "/avatar-blonde-blue.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[61%] top-[72%]",
  },

  // Right Column A (Pink Woman 3 circles)
  {
    id: 13,
    src: "/avatar-woman-pink.png",
    alt: "Community mentor",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[73%] top-[4%]",
  },
  {
    id: 14,
    src: "/avatar-woman-pink.png",
    alt: "Community mentor",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[73%] top-[38%]",
  },
  {
    id: 15,
    src: "/avatar-woman-pink.png",
    alt: "Community mentor",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[73%] top-[72%]",
  },

  // Right Column B (Plants Woman 3 circles)
  {
    id: 16,
    src: "/avatar-woman-plants.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[85%] top-[4%]",
  },
  {
    id: 17,
    src: "/avatar-woman-plants.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[85%] top-[38%]",
  },
  {
    id: 18,
    src: "/avatar-woman-plants.png",
    alt: "Community parent member",
    className: "w-14 h-14 sm:w-20 sm:h-20 md:w-24 md:h-24 left-[85%] top-[72%]",
  },
];

export function JoinThousandsSection() {
  return (
    <section className="w-full bg-white py-16 sm:py-20 lg:py-24 border-t border-gray-100 overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight font-sans">
            Join Thousands
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 font-medium max-w-lg mx-auto mt-2.5 leading-relaxed font-sans">
            A growing community of parents nurturing financial sense, critical thinking, and enterprise.
          </p>
        </div>

        {/* Individual Separate Circular Avatars Cloud */}
        <div className="relative w-full max-w-4xl mx-auto h-[300px] sm:h-[380px] md:h-[430px] select-none">
          {avatars.map((avatar) => (
            <div
              key={avatar.id}
              className={`absolute rounded-full overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:scale-110 cursor-pointer ${avatar.className}`}
            >
              <Image
                src={avatar.src}
                alt={avatar.alt}
                fill
                priority
                unoptimized
                sizes="(min-width: 768px) 250px, 100px"
                className="object-cover object-center"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
