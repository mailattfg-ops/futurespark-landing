import Image from "next/image";
import { GraduationCap } from "lucide-react";

/** Sample certificate from creative (brief F9). Empty until it arrives; the block renders without it. */
const CERTIFICATE_IMAGE = "";

interface Props {
  /** The curriculum page embeds the same block inside its own section. */
  embedded?: boolean;
}

export function GraduationSection({ embedded = false }: Props) {
  const body = (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
      <div className={CERTIFICATE_IMAGE ? "md:col-span-7" : "md:col-span-12 text-center"}>
        <div className={`float inline-flex w-12 h-12 rounded-2xl bg-indigo-50 text-[#4F46E5] items-center justify-center mb-4 ${CERTIFICATE_IMAGE ? "" : "mx-auto"}`}>
          <GraduationCap className="w-6 h-6" aria-hidden="true" />
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] tracking-[-0.03em] font-sans text-balance">Session 20 is <span className="text-[#3B6CFF]">graduation.</span></h2>
        <p className={`mt-4 text-sm sm:text-base text-gray-600 leading-relaxed ${CERTIFICATE_IMAGE ? "max-w-xl" : "max-w-2xl mx-auto"}`}>
          Your child presents the business they built, takes the “I am Money Smart” pledge and receives the Finquo Junior certificate. Parents are
          invited to watch.
        </p>
      </div>
      {CERTIFICATE_IMAGE && (
        <div className="md:col-span-5 relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-gray-200 bg-white shadow-md">
          <Image src={CERTIFICATE_IMAGE} alt="A sample Finquo Junior completion certificate" fill sizes="(min-width: 768px) 40vw, 100vw" className="object-contain" />
        </div>
      )}
    </div>
  );

  if (embedded) return body;

  return (
    <section className="w-full bg-[#FAFAFA] py-10 sm:py-12 lg:py-14 border-t border-gray-100">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{body}</div>
    </section>
  );
}
