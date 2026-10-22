import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { CONTACT } from "@/lib/site";

/**
 * Three posts from the finquojunior account (brief F2 row 23). Marketing will
 * supply the three post links and images; until a post has its own `url` the
 * tile opens the profile. Keep each alt a true description of the image.
 */
const POSTS = [
  { image: "/insta-photo-1.png", url: "", alt: "Instagram post by finquojunior" },
  { image: "/insta-photo-2.png", url: "", alt: "Instagram post by finquojunior" },
  { image: "/insta-photo-3.png", url: "", alt: "Instagram post by finquojunior" },
];

const TILT = ["lg:-rotate-6 lg:translate-y-4", "z-10 lg:scale-105", "lg:rotate-6 lg:translate-y-4"];

export function InstagramShowcaseSection() {
  return (
    <section className="relative w-full bg-[#F7F2EC] py-16 sm:py-24 overflow-hidden">
      {/* soft light rays, as in the design */}
      <div className="absolute -top-40 left-1/3 w-[60rem] h-[16rem] rotate-[-28deg] bg-gradient-to-r from-white/0 via-white/70 to-white/0" aria-hidden="true" />
      <div className="absolute top-1/2 -right-20 w-[40rem] h-[10rem] rotate-[-28deg] bg-gradient-to-r from-white/0 via-white/60 to-white/0" aria-hidden="true" />

      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-12 lg:gap-8 items-center">
        <div>
          <h2 className="text-5xl sm:text-6xl lg:text-[76px] font-black leading-[0.95] tracking-[-0.03em] text-[#111111] font-sans">
            Get
            <br />
            Exclusive
            <br />
            Access
          </h2>
          <p className="mt-6 text-base sm:text-lg text-gray-800 max-w-md">Join our community of forward-thinking parents on Instagram</p>
          <a
            href={CONTACT.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 min-h-[44px] rounded-full bg-white px-7 py-4 text-sm font-bold text-[#111111] shadow-sm ring-1 ring-black/5 hover:shadow-md transition-shadow"
          >
            Join on Instagram <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <ul className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:grid sm:grid-cols-3 sm:gap-4 lg:-space-x-6 list-none m-0 items-center [scrollbar-width:none]">
          {POSTS.map((post, idx) => (
            <li key={post.image} className={`snap-start shrink-0 w-[260px] sm:w-auto transition-transform duration-300 lg:hover:rotate-0 lg:hover:-translate-y-2 hover:z-20 ${TILT[idx]}`}>
              <a
                href={post.url || CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-2xl bg-white p-3 shadow-[0_24px_60px_-28px_rgba(0,0,0,0.35)] hover:shadow-[0_28px_70px_-28px_rgba(0,0,0,0.45)]"
              >
                <div className="flex items-center gap-2 pb-2.5 px-1">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-[#EA3829]">
                    <Image src="/finquo-brand-mark.png" alt="" fill sizes="28px" className="object-contain p-1" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs font-bold text-gray-900 font-sans">finquojunior</span>
                    <span className="text-[10px] text-gray-400 font-medium">India · UAE</span>
                  </div>
                </div>
                <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-gray-50 border border-gray-100">
                  <Image src={post.image} alt={post.alt} fill sizes="(min-width: 640px) 260px, 100vw" className="object-cover object-center" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
