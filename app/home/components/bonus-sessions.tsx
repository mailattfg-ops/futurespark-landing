import { Bot, Mic, ShieldCheck } from "lucide-react";

const CARDS = [
  { icon: <Bot className="w-6 h-6" aria-hidden="true" />, title: "AI", bg: "bg-sky-50 text-sky-700 border-sky-100" },
  { icon: <Mic className="w-6 h-6" aria-hidden="true" />, title: "Public Speaking", bg: "bg-purple-50 text-purple-700 border-purple-100" },
  { icon: <ShieldCheck className="w-6 h-6" aria-hidden="true" />, title: "Cyber Awareness", bg: "bg-emerald-50 text-emerald-700 border-emerald-100" },
];

interface Props {
  embedded?: boolean;
}

export function BonusSessionsSection({ embedded = false }: Props) {
  const body = (
    <>
      <h2 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-[#0F1035] tracking-[-0.03em] font-sans text-center text-balance">
        Finish the 20, <span className="text-[#5B2BE0]">get 5 more free.</span>
      </h2>
      <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto text-center">
        After completing the programme, your child gets five free 1-on-1 sessions in AI, Public Speaking or Cyber Awareness. You choose the mix,
        based on what interests them.
      </p>
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
        {CARDS.map((c) => (
          <div key={c.title} className={`lift rounded-2xl border p-5 flex items-center gap-3.5 ${c.bg}`}>
            <div className="w-11 h-11 rounded-xl bg-white flex items-center justify-center shrink-0">{c.icon}</div>
            <span className="text-base font-extrabold text-gray-900">{c.title}</span>
          </div>
        ))}
      </div>
    </>
  );

  if (embedded) return <div>{body}</div>;

  return (
    <section className="w-full bg-white py-14 sm:py-20">
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">{body}</div>
    </section>
  );
}
