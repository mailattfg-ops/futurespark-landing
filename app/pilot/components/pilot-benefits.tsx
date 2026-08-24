"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

const COLORS = {
  gold: "#fdae27",
  orange: "#f8721f",
  teal: "#09b1bb",
  purple: "#714ade",
  blue: "#3b68fc",
  dark: "#1a1a2e",
  white: "#ffffff",
  border: "#e5e7eb",
  textMuted: "#6b7280",
};

const SparkSVG = ({ size = 36, color = COLORS.gold }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle cx="10" cy="10" r="10" fill={color} />
  </svg>
);

export function PilotBenefitsSection() {
  const cards = [
    {
      icon: <SparkSVG size={36} />,
      title: "Live 1‑on‑1 Mentorship",
      desc: "Four 60‑minute sessions with a dedicated mentor not pre‑recorded, not group classes. Real conversations, real growth.",
      color: COLORS.gold,
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={COLORS.teal} strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="7" y1="8" x2="17" y2="8" /><line x1="7" y1="12" x2="14" y2="12" /><line x1="7" y1="16" x2="11" y2="16" /></svg>,
      title: "Physical Worksheet Packet",
      desc: "A printed workbook delivered to your door. Kids learn by doing writing, sketching, solving not just watching a screen.",
      color: COLORS.teal,
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={COLORS.purple} strokeWidth="1.8"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" /></svg>,
      title: "Shape the Program",
      desc: "Your honest feedback after each session directly influences what Finquo Junior becomes. You're not just a participant you're a co‑creator.",
      color: COLORS.purple,
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={COLORS.orange} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg>,
      title: "Curated by Experts",
      desc: "Designed by leading educators and domain experts to build practical life skills, decision making, and financial intelligence early.",
      color: COLORS.orange,
    },
    {
      icon: <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={COLORS.blue} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" /><path d="M2 12h20" /></svg>,
      title: "Realworld Training",
      desc: "Hands-on simulations, interactive scenarios, and real-life problem solving that bridge academic knowledge to real-world application.",
      color: COLORS.blue,
    },
  ];

  return (
    <section style={{ padding: "64px 24px", background: COLORS.white, position: "relative", overflow: "hidden" }}>
      {/* Benefits Ambient Orbs */}
      <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "900px", height: "320px", background: "radial-gradient(ellipse at center, rgba(253, 174, 39, 0.20) 0%, rgba(59, 104, 252, 0.10) 50%, rgba(255,255,255,0) 75%)", pointerEvents: "none", filter: "blur(55px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "30%", left: "2%", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.22) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(42px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "10%", right: "4%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.20) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(44px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-40px", left: "35%", width: "360px", height: "200px", background: "radial-gradient(ellipse at center, rgba(113, 74, 222, 0.18) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />
      
      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <ScrollReveal variant="fade-up">
          <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 900, margin: "0 0 12px", color: COLORS.dark }}>What Your Child Gets</h2>
          <p style={{ textAlign: "center", color: COLORS.textMuted, margin: "0 0 44px", fontSize: 16 }}>Everything included in the pilot, at no cost.</p>
        </ScrollReveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
          {cards.map((card, i) => (
            <ScrollReveal key={i} variant="fade-up" delay={i * 100}>
              <div style={{ padding: 24, borderRadius: 16, border: `1.5px solid ${COLORS.border}`, background: COLORS.white, transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)", height: "100%" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = `0 12px 32px ${card.color}25`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div style={{ marginBottom: 16 }}>{card.icon}</div>
                <h3 style={{ fontSize: 18, fontWeight: 700, margin: "0 0 8px" }}>{card.title}</h3>
                <p style={{ fontSize: 14, color: COLORS.textMuted, margin: 0, lineHeight: 1.65 }}>{card.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
