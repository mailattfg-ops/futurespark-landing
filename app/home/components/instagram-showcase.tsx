import Image from "next/image";
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

const OFFSETS = ["lg:-translate-y-2", "lg:translate-y-4", "lg:-translate-y-2"];

export function InstagramShowcaseSection() {
  return (
    <section className="w-full bg-[#EA8A17] py-16 sm:py-20 lg:py-24 text-gray-900 relative overflow-hidden">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-sans text-gray-900">Get Exclusive Access</h2>
          <p className="text-base sm:text-lg text-gray-900/85 mt-3 font-medium font-sans">Join our community of forward-thinking parents on Instagram</p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 items-center max-w-4xl mx-auto pt-2 pb-6 list-none m-0 p-0">
          {POSTS.map((post, idx) => (
            <li key={post.image} className={OFFSETS[idx]}>
              <a
                href={post.url || CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full rounded-[24px] sm:rounded-[28px] bg-white p-3.5 sm:p-4 shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex items-center gap-2 pb-2.5 px-1">
                  <div className="relative w-7 h-7 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image src="/finquo-brand-mark.png" alt="" fill sizes="28px" className="object-contain" />
                  </div>
                  <div className="flex flex-col leading-tight">
                    <span className="text-xs sm:text-[13px] font-bold text-gray-900 font-sans">finquojunior</span>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-medium">India · UAE</span>
                  </div>
                </div>
                <div className="relative w-full aspect-[3/3.9] rounded-[18px] overflow-hidden bg-gray-50 border border-gray-100">
                  <Image src={post.image} alt={post.alt} fill sizes="(min-width: 640px) 300px, 100vw" className="object-cover object-center" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
