"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function Preloader() {
  const [loading, setLoading] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Smooth timer to ensure initial assets settle before fading out
    const timer = setTimeout(() => {
      setFadeOut(true);
      const removeTimer = setTimeout(() => {
        setLoading(false);
      }, 600);
      return () => clearTimeout(removeTimer);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (!loading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-white flex flex-col items-center justify-center transition-all duration-500 ease-out select-none ${
        fadeOut ? "opacity-0 pointer-events-none scale-105" : "opacity-100 scale-100"
      }`}
    >
      <div className="relative flex flex-col items-center justify-center space-y-5">
        {/* Soft Animated Glow behind Logo */}
        <div className="absolute w-24 h-24 rounded-full bg-[#4F46E5]/10 animate-ping pointer-events-none" />

        {/* Brand Icon */}
        <div className="relative w-16 h-16 sm:w-20 sm:h-20 transition-transform duration-300">
          <Image
            src="/finquo-logo.png"
            alt="Finquo Junior Logo"
            fill
            sizes="80px"
            priority
            className="object-contain drop-shadow-md"
          />
        </div>



        {/* Animated Progress Bar */}
        <div className="w-36 h-1 bg-gray-100 rounded-full overflow-hidden relative mt-2">
          <div className="h-full bg-[#4F46E5] rounded-full animate-preloader-line w-full" />
        </div>
      </div>
    </div>
  );
}
