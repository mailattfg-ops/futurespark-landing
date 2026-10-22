import Image from "next/image";
import { Printer } from "lucide-react";

/** Photo of the printed worksheets and sticker pack, from creative (brief F2 row 18). Empty until it arrives. */
const PHOTO = { src: "", alt: "Finquo Junior printed worksheets and a sticker pack" };

export function WorksheetsSection() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-[#EEF0FF] py-14 sm:py-20">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="float w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
            <Printer className="w-6 h-6" aria-hidden="true" />
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0F1035] tracking-[-0.03em] font-sans text-balance">
            A printed worksheet for every session.
          </h2>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto font-normal">
            Each session comes with a printed worksheet and a sticker pack, delivered free to your home in two parcels, so the learning carries on
            away from the screen.
          </p>
        </div>
        {PHOTO.src && (
          <div className="relative mt-8 w-full aspect-[16/9] rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-md">
            <Image src={PHOTO.src} alt={PHOTO.alt} fill sizes="(min-width: 896px) 896px, 100vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
