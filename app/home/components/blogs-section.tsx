"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface BlogPost {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  snippet: string;
  readTime: string;
  imageSrc: string;
}

const baseBlogs: BlogPost[] = [
  {
    id: 1,
    category: "CHILDRENS PSYCHOLOGY",
    categoryColor: "text-[#16A34A]",
    title: "Taking a leap into understanding kids",
    snippet:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate libero et velit interdum, ac aliquet odio mattis.",
    readTime: "5 MIN READ",
    imageSrc: "/blog-slide-1.png",
  },
  {
    id: 2,
    category: "FINANCIAL FLUENCY",
    categoryColor: "text-[#16A34A]",
    title: "Why Teaching Opportunity Cost Early Changes Everything",
    snippet:
      "When children learn trade-offs before developing spending habits, impulsive demands transform into thoughtful life decisions.",
    readTime: "4 MIN READ",
    imageSrc: "/blog-slide-1.png",
  },
  {
    id: 3,
    category: "PRACTICAL TOOLS",
    categoryColor: "text-[#16A34A]",
    title: "The 3-Jar Method: How 8-Year-Olds Master Smart Budgeting",
    snippet:
      "A simple visual system that separates saving, spending, and giving, building strong lifelong instincts at home.",
    readTime: "6 MIN READ",
    imageSrc: "/blog-slide-1.png",
  },
  {
    id: 4,
    category: "ENTREPRENEURSHIP",
    categoryColor: "text-[#16A34A]",
    title: "From Lemonade Stands to Capstone Business Pitches",
    snippet:
      "How hands-on project building teaches young thinkers unit economics, public presentation, and real-world resilience.",
    readTime: "5 MIN READ",
    imageSrc: "/blog-slide-1.png",
  },
  {
    id: 5,
    category: "LIFE SKILLS",
    categoryColor: "text-[#16A34A]",
    title: "How Negotiation Games Build Real Social Confidence",
    snippet:
      "Role-playing price negotiations at home prepares students for real-world persuasion and collaborative decision making.",
    readTime: "5 MIN READ",
    imageSrc: "/blog-slide-1.png",
  },
];

// Tripled array for seamless infinite looping
const infiniteBlogs = [...baseBlogs, ...baseBlogs, ...baseBlogs];

export function BlogsSection() {
  const N = baseBlogs.length;
  const [currentIndex, setCurrentIndex] = useState(N);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [cardStepWidth, setCardStepWidth] = useState(624);
  const trackRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  const updateStepWidth = useCallback(() => {
    if (trackRef.current && trackRef.current.children.length > 0) {
      const firstCard = trackRef.current.children[0] as HTMLElement;
      if (firstCard) {
        setCardStepWidth(firstCard.offsetWidth + 24);
      }
    }
  }, []);

  useEffect(() => {
    updateStepWidth();
    window.addEventListener("resize", updateStepWidth);
    return () => window.removeEventListener("resize", updateStepWidth);
  }, [updateStepWidth]);

  const handleTransitionEnd = () => {
    isAnimating.current = false;
    if (currentIndex >= 2 * N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - N);
    } else if (currentIndex < N) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + N);
    }
  };

  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  const slideNext = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const slidePrev = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  const activeIndicatorIndex = currentIndex % N;

  return (
    <section id="blogs" className="w-full bg-[#8DA4B1] py-16 sm:py-20 lg:py-24 text-gray-900 relative overflow-hidden">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Heading & Subtitle */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans text-gray-900">
            Blogs
          </h2>
          <p className="text-base sm:text-lg text-gray-800 mt-3 font-medium font-sans max-w-md mx-auto leading-relaxed">
            Insights and practical guides to help you raise money-smart, confident children.
          </p>
        </div>

        {/* Carousel Outer Wrapper */}
        <div className="relative w-full">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={slidePrev}
            aria-label="Previous Blog"
            className="absolute left-0 sm:left-1 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gray-50 text-gray-900 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={slideNext}
            aria-label="Next Blog"
            className="absolute right-0 sm:right-1 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-gray-50 text-gray-900 flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Viewport Clip Window */}
          <div className="overflow-hidden w-full py-2 px-2 sm:px-4">
            <div
              ref={trackRef}
              onTransitionEnd={handleTransitionEnd}
              className={`flex gap-6 select-none ${
                isTransitioning ? "transition-transform duration-500 ease-out" : ""
              }`}
              style={{
                transform: `translateX(-${currentIndex * cardStepWidth}px)`,
              }}
            >
              {infiniteBlogs.map((blog, idx) => (
                <div
                  key={`${blog.id}-${idx}`}
                  className="w-[86vw] sm:w-[500px] md:w-[560px] lg:w-[600px] shrink-0 rounded-[28px] bg-white p-5 sm:p-6 flex flex-col sm:flex-row gap-5 sm:gap-6 items-center justify-between"
                >
                  {/* Left Photo Thumbnail */}
                  <div className="relative w-full sm:w-[46%] aspect-[4/3.8] rounded-2xl overflow-hidden bg-gray-50 flex-shrink-0">
                    <Image
                      src={blog.imageSrc}
                      alt={blog.title}
                      fill
                      priority
                      unoptimized
                      sizes="(min-width: 768px) 30vw, 85vw"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Right Content Area */}
                  <div className="w-full sm:w-[54%] flex flex-col justify-between h-full py-1 text-left">
                    <div>
                      <span className={`text-xs font-extrabold uppercase tracking-wider ${blog.categoryColor} block font-sans`}>
                        {blog.category}
                      </span>

                      <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 leading-snug font-sans mt-2">
                        {blog.title}
                      </h3>

                      <p className="text-sm text-gray-600 leading-relaxed mt-2.5 font-normal line-clamp-3">
                        {blog.snippet}
                      </p>
                    </div>

                    {/* Bottom Meta Row */}
                    <div className="pt-4 mt-3 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        {blog.readTime}
                      </span>
                      <Link
                        href="#blogs"
                        className="font-bold text-gray-900 hover:text-[#4F46E5] flex items-center gap-1 transition-colors"
                      >
                        Read Article <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Active Loop Indicators */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
            {baseBlogs.map((_, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndicatorIndex === i
                    ? "w-7 bg-gray-900"
                    : "w-2 bg-gray-900/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
