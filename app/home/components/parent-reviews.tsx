import { TESTIMONIALS, testimonialMeta } from "@/lib/testimonials";

export function ParentReviewsSection() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section id="reviews" className="w-full bg-white py-10 sm:py-12 lg:py-14 border-t border-gray-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight font-sans text-center mb-8 sm:mb-10">What Parents and Kids Say</h2>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 list-none m-0 p-0">
          {TESTIMONIALS.map((t) => (
            <li key={t.name + t.quote.slice(0, 12)} className="rounded-3xl border border-gray-200/90 bg-white p-6 sm:p-8 flex flex-col justify-between shadow-xs">
              <blockquote className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed font-sans italic m-0 mb-6">“{t.quote}”</blockquote>
              <div className="flex items-center gap-3.5 pt-4 border-t border-gray-100">
                <span className="w-11 h-11 rounded-full bg-indigo-50 text-[#4F46E5] font-black flex items-center justify-center flex-shrink-0" aria-hidden="true">
                  {t.name.charAt(0)}
                </span>
                <p className="text-sm sm:text-base font-extrabold text-gray-900 font-sans leading-snug">{testimonialMeta(t)}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
