import type { Metadata } from "next";
import Image from "next/image";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookDemoButton } from "@/components/book-demo-button";
import { MENTORS, MENTOR_PAGE_BLOCKS } from "@/lib/mentors";

export const metadata: Metadata = {
  title: "Meet the Mentors",
  description:
    "The Finquo Junior mentors: a Chartered Accountant and three master mentors who teach the 20-session financial literacy programme 1-on-1.",
};

export default function MentorsPage() {
  const blocks = MENTOR_PAGE_BLOCKS.filter((b) => b.body.trim().length > 0);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden">
      <Navbar />

      <main className="bg-gradient-to-b from-[#EEF0FF] via-white to-[#EEF0FF]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-16 sm:pb-24">
          <div className="text-center rise">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#5B2BE0]">Our mentors</p>
            <h1 className="mt-3 text-4xl sm:text-5xl lg:text-[56px] font-extrabold tracking-[-0.03em] text-[#0F1035] text-balance">
              Meet the <span className="text-[#5B2BE0]">mentors</span>
            </h1>
            <span className="block mx-auto mt-4 h-1 w-16 rounded-full bg-[#5B2BE0]" aria-hidden="true" />
            <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-gray-500 leading-relaxed">
              Every child learns with one mentor for all 20 sessions. The team is led by a Chartered Accountant and taught by Finquo Junior master
              mentors.
            </p>
          </div>

          <ul className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 list-none m-0 p-0 rise-2">
            {MENTORS.map((m) => (
              <li key={m.slug} className="group lift rounded-xl border border-[#E4E6F2] bg-white overflow-hidden flex flex-col hover:shadow-xl hover:shadow-indigo-900/10">
                <div className="relative w-full aspect-[4/5] bg-[#F3F4F8]">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h2 className="text-xl font-extrabold text-[#0F1035] leading-tight">{m.name}</h2>
                  <p className="pt-3 border-t border-[#E4E6F2] text-xs font-bold uppercase tracking-wide text-[#5B2BE0]">{m.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{m.profile}</p>
                  {m.grades && <p className="text-sm text-[#0F1035] font-semibold">Teaches {m.grades}</p>}
                  {m.quote && <blockquote className="mt-auto pt-3 border-t border-[#E4E6F2] text-sm italic text-gray-700 m-0">“{m.quote}”</blockquote>}
                </div>
              </li>
            ))}
          </ul>

          {blocks.length > 0 && (
            <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
              {blocks.map((b) => (
                <section key={b.heading} className="rounded-3xl border border-[#E4E6F2] bg-white p-6 sm:p-8">
                  <h2 className="text-xl font-extrabold text-[#0F1035]">{b.heading}</h2>
                  <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">{b.body}</p>
                </section>
              ))}
            </div>
          )}

          <div className="mt-14 text-center">
            <BookDemoButton placement="mentors" size="lg" arrow />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
