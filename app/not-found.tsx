import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E0B73] via-[#3B128E] to-[#250860] flex flex-col items-center justify-center p-6 text-white text-center font-sans">
      <div className="space-y-6 max-w-md mx-auto">
        <Link href="/" className="inline-block">
          <Image
            src="/finquo-logo-1.png"
            alt="Finquo Junior Logo"
            width={180}
            height={44}
            className="h-10 w-auto object-contain mx-auto"
            priority
          />
        </Link>

        <div className="space-y-2">
          <h1 className="text-6xl font-black text-amber-400">404</h1>
          <h2 className="text-2xl font-bold">Page Not Found</h2>
          <p className="text-sm text-purple-200 leading-relaxed">
            Oops! The page you are looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-gray-900 font-extrabold text-sm shadow-lg shadow-orange-500/25 transition-all transform hover:-translate-y-0.5"
        >
          Return to Homepage →
        </Link>
      </div>
    </div>
  );
}
