"use client";

import Image from "next/image";
import { Video } from "lucide-react";

interface VideoItem {
  title: string;
  channel: string;
  imageSrc: string;
}

const videos: VideoItem[] = [
  {
    title: "Live Mentorship Demo: 1-on-1 Class Tour",
    channel: "FINQUO JR. CHANNEL",
    imageSrc: "/youtube-group-thumb.png",
  },
  {
    title: "Live Mentorship Demo: 1-on-1 Class Tour",
    channel: "FINQUO JR. CHANNEL",
    imageSrc: "/youtube-group-thumb.png",
  },
  {
    title: "Live Mentorship Demo: 1-on-1 Class Tour",
    channel: "FINQUO JR. CHANNEL",
    imageSrc: "/youtube-group-thumb.png",
  },
];

export function YoutubeSection() {
  return (
    <section className="w-full bg-[#FAFAF7] py-16 sm:py-20 lg:py-24 border-t border-gray-200/60">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-sans">
            YouTube
          </h2>
          <p className="text-base sm:text-lg text-gray-600 font-medium max-w-md mx-auto mt-3 leading-relaxed font-sans">
            Go behind the scenes of our 1-on-1 sessions, student success stories, and class highlights.
          </p>
        </div>

        {/* 3-Column Video Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {videos.map((vid, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[26px] p-5 sm:p-6 shadow-xs border border-gray-200/90 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 select-none flex flex-col justify-between"
            >
              {/* Header Bar Above Thumbnail */}
              <div className="flex items-center justify-between gap-3 pb-1">
                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Video Icon Badge */}
                  <div className="w-8 h-8 rounded-lg bg-gray-100 border border-gray-200/80 flex items-center justify-center text-gray-700 flex-shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-tight font-sans truncate">
                      {vid.title}
                    </h3>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-bold uppercase tracking-wider block mt-0.5 font-sans">
                      {vid.channel}
                    </span>
                  </div>
                </div>

                {/* Play Video Pill Button */}
                <button
                  type="button"
                  aria-label="Play Video"
                  className="bg-black hover:bg-gray-800 text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors flex-shrink-0 cursor-pointer shadow-xs active:scale-95"
                >
                  Play Video
                </button>
              </div>

              {/* Video Photo Thumbnail with Rounded Corners */}
              <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mt-4 bg-gray-100 shadow-inner">
                <Image
                  src={vid.imageSrc}
                  alt={vid.title}
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover object-center hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
