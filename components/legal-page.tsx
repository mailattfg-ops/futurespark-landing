import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";

// Same markup and tokens as the policy pages on webinar.finquo.ai, so the two
// sites read as one: white page, logo, 48rem column, Plus Jakarta Sans (the
// landing already loads it as font-sans), ink #111827 / ink-soft #4b5563 /
// muted #6b7280 / brand #4f46e5. Content is plain data; a section only needs
// paragraphs, bullet lists, **bold** and [text](/path) links.

export type LegalBlock = string | { bullets: string[] };
export interface LegalSection {
  heading: string;
  blocks: LegalBlock[];
}
interface LegalPageProps {
  title: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export const POLICY_LINKS = [
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Refund & Cancellation", href: "/refund-policy" },
  { label: "Shipping & Delivery", href: "/shipping-policy" },
];

const LINK = "font-semibold text-[#4f46e5] hover:underline";

/** "[Refund Policy](/refund-policy)" and "**bold**" inside a string become markup. */
function inline(text: string): ReactNode[] {
  return text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g).map((part, i) => {
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return (
        <Link key={i} href={link[2]} className={LINK}>
          {link[1]}
        </Link>
      );
    }
    const bold = part.match(/^\*\*([^*]+)\*\*$/);
    return bold ? <strong key={i}>{bold[1]}</strong> : part;
  });
}

export function LegalPage({ title, intro, lastUpdated, sections }: LegalPageProps) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-[#111827]">
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-12 sm:px-6 sm:py-16">
        <Link href="/" aria-label="Finquo Junior home">
          <Image src="/newlogo.png" alt="Finquo Junior" width={140} height={36} className="h-8 w-auto sm:h-9" />
        </Link>

        <h1 className="mt-8 text-3xl font-extrabold leading-tight tracking-[-0.03em] text-[#111827] sm:text-4xl">{title}</h1>
        <p className="mt-2 text-sm text-[#6b7280]">Last updated: {lastUpdated}</p>

        <div className="mt-6 text-[15px] leading-relaxed text-[#4b5563]">
          <p>{inline(intro)}</p>
        </div>

        {sections.map((section, i) => (
          <section key={section.heading} className="mt-8">
            <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#111827]">
              {i + 1}. {section.heading}
            </h2>
            <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#4b5563]">
              {section.blocks.map((block, j) =>
                typeof block === "string" ? (
                  <p key={j}>{inline(block)}</p>
                ) : (
                  <ul key={j} className="list-disc space-y-1 pl-5">
                    {block.bullets.map((b) => (
                      <li key={b}>{inline(b)}</li>
                    ))}
                  </ul>
                ),
              )}
            </div>
          </section>
        ))}

        <section className="mt-8">
          <h2 className="text-xl font-extrabold tracking-[-0.03em] text-[#111827]">{sections.length + 1}. Contact</h2>
          <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-[#4b5563]">
            <p>
              <strong>FinQuo Versity And Edutech Private Limited</strong> (Finquo Junior)
              <br />
              Tower 2, 2nd Floor, 2/1149/I 94, 95, 96, HiLITE Business Park, Guruvayurappan College Road, Olavanna,
              Kozhikode, Kerala - 673014
              <br />
              📧{" "}
              <a href="mailto:info@finquo.ai" className={LINK}>
                info@finquo.ai
              </a>{" "}
              · 💬{" "}
              <a href="https://wa.me/919745001121" target="_blank" rel="noopener noreferrer" className={LINK}>
                +91 97450 01121
              </a>{" "}
              (WhatsApp)
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
