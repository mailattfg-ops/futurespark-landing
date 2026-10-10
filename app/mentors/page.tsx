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

      <main className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16">
        <p className="text-[11px] lg:text-[13px] font-bold uppercase tracking-[0.24em] text-[#5A6084]">Mentors</p>
        <h1 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0A0F3C] text-balance">Meet the mentors</h1>
        <p className="mt-4 max-w-2xl text-sm sm:text-base lg:text-lg text-gray-600 leading-relaxed">
          Every child learns with one mentor for all 20 sessions. The team is led by a Chartered Accountant and taught by Finquo Junior master mentors.
        </p>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 list-none m-0 p-0">
          {MENTORS.map((m) => (
            <li key={m.slug} className="rounded-3xl border border-gray-200/90 bg-white shadow-sm overflow-hidden flex flex-col">
              <div className="relative w-full aspect-[3/4] bg-gray-100">
                <Image src={m.photo} alt={m.name} fill sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="object-cover object-top" />
              </div>
              <div className="p-5 flex flex-col gap-2 flex-1">
                <h2 className="text-lg font-extrabold text-gray-900 leading-tight">{m.name}</h2>
                <p className="text-xs font-bold uppercase tracking-wide text-[#4F46E5]">{m.role}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{m.profile}</p>
                {m.grades && <p className="text-sm text-gray-800 font-semibold">Teaches {m.grades}</p>}
                {m.quote && <blockquote className="mt-auto pt-3 border-t border-gray-100 text-sm italic text-gray-700 m-0">“{m.quote}”</blockquote>}
              </div>
            </li>
          ))}
        </ul>

        {blocks.length > 0 && (
          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
            {blocks.map((b) => (
              <section key={b.heading} className="rounded-3xl bg-[#F4F3FB] p-6 sm:p-8">
                <h2 className="text-xl font-extrabold text-[#0A0F3C]">{b.heading}</h2>
                <p className="mt-3 text-sm sm:text-base text-gray-700 leading-relaxed">{b.body}</p>
              </section>
            ))}
          </div>
        )}

        <div className="mt-14 text-center">
          <BookDemoButton placement="mentors" size="lg" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
