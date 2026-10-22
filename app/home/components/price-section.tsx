import { BookDemoButton } from "@/components/book-demo-button";
import { PRICE } from "@/lib/site";

interface Props {
  /** The curriculum page shows a shorter version of the same block. */
  compact?: boolean;
}

export function PriceSection({ compact = false }: Props) {
  return (
    <section id="price" className="w-full bg-[#4F46E5] text-white py-12 sm:py-16 lg:py-20">
      <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] font-sans text-balance">
          {compact ? `${PRICE} for the full programme.` : "One programme. One price."}
        </h2>
        {!compact && (
          <>
            <p className="mt-5 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight tabular-nums">{PRICE}</p>
            <p className="mt-5 text-sm sm:text-base text-white/90 leading-relaxed max-w-2xl mx-auto">
              Covers 20 one-hour 1-on-1 sessions, a capstone project, printed worksheets and sticker packs, your child&apos;s certificate, and five free
              bonus sessions. Full refund within 7 days of payment and before the first class.
            </p>
            <p className="mt-3 text-xs sm:text-sm text-white/75">Fees are charged in Indian rupees, with GST, for all countries.</p>
          </>
        )}
        <div className="mt-7">
          <BookDemoButton placement={compact ? "curriculum" : "price"} size="lg" className="bg-white !text-[#4F46E5] hover:bg-indigo-50 shadow-none" />
        </div>
      </div>
    </section>
  );
}
