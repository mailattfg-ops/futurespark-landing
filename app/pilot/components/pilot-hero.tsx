"use client";

import { Video, ShieldCheck, Clock, Calendar, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface PilotHeroProps {
  onOpenDemoModal: () => void;
}

const COLORS = {
  gold: "#fdae27",
  orange: "#f8721f",
  teal: "#09b1bb",
  purple: "#714ade",
  blue: "#3b68fc",
  dark: "#1a1a2e",
  textMuted: "#6b7280",
};

export function PilotHero({ onOpenDemoModal }: PilotHeroProps) {
  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        padding: "140px 24px 64px",
        textAlign: "center",
        background: "linear-gradient(180deg, #fef9ed 0%, #ffffff 40%, #f4f5ff 100%)",
        minHeight: "100vh",
        height: "auto",
        display: "grid",
        alignItems: "end",
      }}
    >
      {/* Ambient Glowing Radial Orbs Background */}
      <div style={{ position: "absolute", top: "-70px", left: "50%", transform: "translateX(-50%)", width: "1200px", height: "520px", background: "radial-gradient(ellipse at center, rgba(253, 174, 39, 0.30) 0%, rgba(113, 74, 222, 0.18) 45%, rgba(255, 255, 255, 0) 72%)", pointerEvents: "none", filter: "blur(52px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "15%", left: "3%", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.28) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(45px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "20%", right: "3%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(113, 74, 222, 0.26) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(45px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "0%", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.28) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(48px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "0%", right: "5%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(59, 104, 252, 0.24) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(46px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "0%", left: "0%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(253, 174, 39, 0.32) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "2%", right: "0%", width: "240px", height: "240px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.26) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(38px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-40px", left: "50%", transform: "translateX(-50%)", width: "900px", height: "280px", background: "radial-gradient(ellipse at center, rgba(253, 174, 39, 0.18) 0%, rgba(248, 114, 31, 0.12) 50%, rgba(255, 255, 255, 0) 75%)", pointerEvents: "none", filter: "blur(50px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "50%", left: "8%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(113, 74, 222, 0.22) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(36px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "55%", right: "7%", width: "220px", height: "220px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.26) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(38px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "38%", left: "18%", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(59, 104, 252, 0.18) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(42px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "40%", right: "16%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(253, 174, 39, 0.22) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />

      {/* Hero Content Box */}
      <div style={{ maxWidth: 920, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Primary Main Headline */}
        <ScrollReveal variant="fade-up" delay={200}>
          <h1
            style={{
              fontSize: "clamp(42px, 6vw, 68px)",
              fontWeight: 950,
              lineHeight: 1.12,
              margin: "0 0 14px",
              color: COLORS.dark,
              letterSpacing: "-0.03em",
            }}
          >
            Financial Literacy for{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.purple} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
              }}
            >
              Kids
            </span>
          </h1>
        </ScrollReveal>

        {/* Supporting Subheadline */}
        <ScrollReveal variant="fade-up" delay={280}>
          <p
            style={{
              fontSize: "clamp(22px, 3vw, 32px)",
              fontWeight: 800,
              lineHeight: 1.3,
              margin: "0 0 20px",
              color: "#374151",
              letterSpacing: "-0.015em",
            }}
          >
            <span
              style={{
                background: `linear-gradient(135deg, ${COLORS.purple} 0%, ${COLORS.purple} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "inline-block",
                fontWeight: 900,
              }}
            >
              FREE
            </span>{" "}
            Pilot Program
          </p>
        </ScrollReveal>

        {/* Subtitle Paragraph */}
        <ScrollReveal variant="fade-up" delay={300}>
          <p
            style={{
              fontSize: 16,
              color: COLORS.textMuted,
              lineHeight: 1.7,
              margin: "0 0 28px",
              maxWidth: 780,
              marginLeft: "auto",
              marginRight: "auto",
              fontWeight: 450,
            }}
          >
            You are the chosen one for our pilot program of Finquo Junior <b>Financial Literacy</b> Program. Finquo Junior is a 1 on 1 mentorship program focuses on future ready skills like finance, Communication, Entrepreneurship, AI and Cyberawareness
          </p>
        </ScrollReveal>

        {/* Primary CTA Button */}
        <ScrollReveal variant="zoom-in" delay={400}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <button
              onClick={onOpenDemoModal}
              style={{
                background: `linear-gradient(135deg, ${COLORS.gold} 0%, ${COLORS.orange} 100%)`,
                color: "#ffffff",
                fontWeight: 800,
                fontSize: 16,
                padding: "15px 40px",
                borderRadius: 50,
                border: "none",
                cursor: "pointer",
                boxShadow: `0 8px 28px rgba(248, 114, 31, 0.35)`,
                transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                letterSpacing: 0.3,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px) scale(1.02)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 12px 32px rgba(248, 114, 31, 0.45)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0) scale(1)";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = `0 8px 28px rgba(248, 114, 31, 0.35)`;
              }}
            >
              Join Now →
            </button>
          </div>
        </ScrollReveal>
      </div>

      {/* Hero Stats Card Grid Section */}
      <ScrollReveal variant="fade-up" delay={500}>
        <div style={{ maxWidth: 1140, margin: "44px auto 0", position: "relative", zIndex: 1 }}>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2"
            style={{
              padding: "12px 14px",
              background: "rgba(255, 255, 255, 0.92)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderRadius: 22,
              border: "1.5px solid rgba(113, 74, 222, 0.16)",
              boxShadow: "0 18px 44px -12px rgba(113, 74, 222, 0.14), 0 6px 16px rgba(0, 0, 0, 0.03)",
              alignItems: "center",
            }}
          >
            {[
              {
                icon: <Video size={18} color="#714ade" />,
                num: "1 on 1",
                unit: "Mentorship",
                label: "4 Live Sessions",
                gradient: "linear-gradient(135deg, #714ade 0%, #3b68fc 100%)",
                bgColor: "rgba(113, 74, 222, 0.06)",
                borderColor: "rgba(113, 74, 222, 0.18)",
              },
              {
                icon: <ShieldCheck size={18} color="#f8721f" />,
                num: "100%",
                unit: "Scholarship",
                label: "0 INR (Free Access)",
                gradient: "linear-gradient(135deg, #f8721f 0%, #fdae27 100%)",
                bgColor: "rgba(248, 114, 31, 0.06)",
                borderColor: "rgba(248, 114, 31, 0.18)",
              },
              {
                icon: <Clock size={18} color="#09b1bb" />,
                num: "60",
                unit: "Mins",
                label: "Each Session",
                gradient: "linear-gradient(135deg, #09b1bb 0%, #3b68fc 100%)",
                bgColor: "rgba(9, 177, 187, 0.06)",
                borderColor: "rgba(9, 177, 187, 0.18)",
              },
              {
                icon: <Calendar size={18} color="#3b68fc" />,
                num: "Flexible",
                unit: "Schedule",
                label: "Convenient Timings",
                gradient: "linear-gradient(135deg, #3b68fc 0%, #714ade 100%)",
                bgColor: "rgba(59, 104, 252, 0.06)",
                borderColor: "rgba(59, 104, 252, 0.18)",
              },
              {
                icon: <BookOpen size={18} color="#fdae27" />,
                num: "Physical",
                unit: "Worksheet",
                label: "Deliver at Doorstep",
                gradient: "linear-gradient(135deg, #fdae27 0%, #f8721f 100%)",
                bgColor: "rgba(253, 174, 39, 0.06)",
                borderColor: "rgba(253, 174, 39, 0.18)",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  gap: 8,
                  padding: "10px 10px",
                  borderRadius: 14,
                  background: s.bgColor,
                  border: `1px solid ${s.borderColor}`,
                  transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
                  cursor: "default",
                  minWidth: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 24px -4px rgba(0, 0, 0, 0.08)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.06)",
                    flexShrink: 0,
                  }}
                >
                  {s.icon}
                </div>
                <div style={{ textAlign: "left", minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 3, whiteSpace: "nowrap" }}>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 900,
                        background: s.gradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline-block",
                        lineHeight: 1.15,
                      }}
                    >
                      {s.num}
                    </span>
                    <span style={{ fontSize: 12.5, fontWeight: 800, color: COLORS.dark }}>
                      {s.unit}
                    </span>
                  </div>
                  <div style={{ fontSize: 11, color: COLORS.textMuted, fontWeight: 600, marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {s.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
