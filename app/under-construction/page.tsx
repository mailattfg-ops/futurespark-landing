import Link from "next/link";
import Image from "next/image";
import { HardHat, Home, CalendarCheck } from "lucide-react";

export default function UnderConstructionPage({ title }: { title?: string }) {
  const pageTitle = title || "Under Construction";

  return (
    <main className="min-h-screen w-full bg-[#FAFAF7] flex flex-col justify-between items-center px-4 py-8 sm:px-6 lg:px-8 font-sans">
      {/* Header Brand */}
      <header className="w-full max-w-7xl mx-auto flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
            <Image
              src="/finquo-logo.png"
              alt="Finquo Junior Logo"
              fill
              sizes="36px"
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-lg sm:text-xl font-black tracking-tight text-gray-900">
              FINQUO
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-gray-800 -mt-1 tracking-wide">
              Junior
            </span>
          </div>
        </Link>

        <Link
          href="/#book-demo"
          className="inline-flex items-center justify-center px-4 py-2 rounded-xl bg-[#F59E0B] hover:bg-[#D97706] text-white text-xs font-bold shadow-md transition-all"
        >
          Book Free Demo
        </Link>
      </header>

      {/* Main Under Construction Hero Container */}
      <div className="w-full max-w-lg mx-auto text-center space-y-6 my-auto py-12">
        <div className="relative inline-block select-none">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-amber-50 border border-amber-200/80 flex items-center justify-center shadow-xl shadow-amber-100/60 mx-auto transform -rotate-3">
            <HardHat className="w-10 h-10 text-[#D97706]" />
          </div>
        </div>

        <div className="space-y-3">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-100/80 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
            {pageTitle}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            We&apos;re Crafting Something Great!
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed font-normal">
            This section is currently being updated with fresh content and enhanced interactive features. Please check back soon!
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold shadow-md shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>
          <Link
            href="/#book-demo"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-gray-800 hover:bg-gray-50 text-sm font-bold shadow-sm transition-all"
          >
            <CalendarCheck className="w-4 h-4 text-amber-500" />
            Book a Free Demo
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-gray-500 py-4">
        © 2026 Finquo Junior. All rights reserved.
      </footer>
    </main>
  );
}
