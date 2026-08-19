"use client";

import { useState } from "react";
import Image from "next/image";
import { Heart, MessageCircle, Send, Bookmark } from "lucide-react";

interface InstaReel {
  imageSrc: string;
  alt: string;
  offsetClass: string;
}

const reels: InstaReel[] = [
  {
    imageSrc: "/insta-photo-1.png",
    alt: "Parent and child high five moment - Finquo Junior",
    offsetClass: "lg:-translate-y-5",
  },
  {
    imageSrc: "/insta-photo-2.png",
    alt: "The toy they won't be tired of by Dec 26 - Finquo Junior",
    offsetClass: "lg:translate-y-8",
  },
  {
    imageSrc: "/insta-photo-3.png",
    alt: "Oddy cubes aren't just cubes - Finquo Junior",
    offsetClass: "lg:-translate-y-4",
  },
  {
    imageSrc: "/insta-photo-4.png",
    alt: "Exploring and creating with colors outdoors - Finquo Junior",
    offsetClass: "lg:-translate-y-10",
  },
  {
    imageSrc: "/insta-photo-5.png",
    alt: "Kids distracted by screens let's talk about it - Finquo Junior",
    offsetClass: "lg:translate-y-6",
  },
];

export function InstagramShowcaseSection() {
  const [likedCards, setLikedCards] = useState<{ [key: number]: boolean }>({});

  const toggleLike = (index: number) => {
    setLikedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="w-full bg-[#EA8A17] py-16 sm:py-20 lg:py-28 text-gray-900 relative overflow-hidden">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans text-gray-900">
            Get Exclusive Access
          </h2>
          <p className="text-base sm:text-lg text-gray-900/85 mt-3 font-medium font-sans">
            Join our community of forward-thinking parents on Instagram
          </p>
        </div>

        {/* 5 Staggered Native Instagram Reel Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4.5 items-center pt-4 pb-6">
          {reels.map((reel, idx) => (
            <div
              key={idx}
              className={`w-full rounded-[24px] sm:rounded-[28px] bg-white p-3 sm:p-3.5 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 select-none flex flex-col justify-between ${reel.offsetClass} last:col-span-2 sm:last:col-span-1 last:w-full last:max-w-[220px] sm:last:max-w-none last:mx-auto`}
            >
              {/* Instagram Top Bar */}
              <div className="flex items-center gap-2 pb-2 px-1">
                {/* Red Circular Brand Avatar */}
                <div className="w-7 h-7 rounded-full bg-[#EA3829] flex items-center justify-center text-white text-[9px] font-black shadow-xs flex-shrink-0">
                  ⚡
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-xs sm:text-[13px] font-bold text-gray-900 font-sans">
                    finquo.jr
                  </span>
                  <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
                    India
                  </span>
                </div>
              </div>

              {/* Photo Area with Rounded Corners */}
              <div className="relative w-full aspect-[3/3.9] rounded-[18px] overflow-hidden bg-gray-50 border border-gray-100">
                <Image
                  src={reel.imageSrc}
                  alt={reel.alt}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
                  className="object-cover object-center"
                />
              </div>

              {/* Instagram Bottom Action Bar */}
              <div className="flex items-center justify-between pt-3 pb-1 px-1 text-gray-800">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => toggleLike(idx)}
                    aria-label="Like post"
                    className="focus:outline-none transition-transform active:scale-125 cursor-pointer"
                  >
                    <Heart
                      className={`w-4 h-4 sm:w-4.5 sm:h-4.5 transition-colors ${
                        likedCards[idx]
                          ? "fill-[#EA3829] text-[#EA3829]"
                          : "text-gray-700 hover:text-gray-900"
                      }`}
                    />
                  </button>

                  <button type="button" aria-label="Comment" className="focus:outline-none cursor-pointer">
                    <MessageCircle className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-700 hover:text-gray-900" />
                  </button>

                  <button type="button" aria-label="Share" className="focus:outline-none cursor-pointer">
                    <Send className="w-4 h-4 text-gray-700 hover:text-gray-900 -rotate-12" />
                  </button>
                </div>

                <button type="button" aria-label="Save" className="focus:outline-none cursor-pointer">
                  <Bookmark className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-gray-700 hover:text-gray-900" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
