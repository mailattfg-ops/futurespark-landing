import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Home, Sparkles } from "lucide-react";

export default function NotFoundPage() {
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
      </header>

      {/* Main 404 Hero Container */}
      <div className="w-full max-w-xl mx-auto text-center space-y-6 my-auto py-12">
        <div className="relative inline-block select-none">
          <span className="text-8xl sm:text-9xl font-black text-indigo-600/10 tracking-widest font-mono">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center shadow-lg shadow-indigo-100 transform -rotate-6">
              <Sparkles className="w-8 h-8 text-[#4F46E5]" />
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Page Not Found
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-md mx-auto leading-relaxed font-normal">
            The page you are looking for doesn&apos;t exist or may have been moved.
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
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full text-center text-xs text-gray-500 py-4">
        © 2026 Finquo Junior. All rights reserved.
      </footer>
    </main>
  );
}
