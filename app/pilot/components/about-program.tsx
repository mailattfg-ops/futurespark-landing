"use client";

import { Sparkles } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const COLORS = {
  purple: "#714ade",
  dark: "#1a1a2e",
  textMuted: "#6b7280",
};

export function AboutProgramSection() {
  const sessionIncludes = [
    { title: "Live presentations", icon: "🎥", color: "#f8721f" },
    { title: "Real-life financial examples and activities", icon: "💡", color: "#09b1bb" },
    { title: "Doubt clearing & Q&A", icon: "❓", color: "#714ade" },
    { title: "Physical worksheets", icon: "📚", color: "#3b68fc" },
    { title: "Interactive virtual activities", icon: "💻", color: "#f8721f" },
    { title: "Practical exercises and challenges", icon: "🎯", color: "#09b1bb" },
    { title: "Personalized 1-on-1 mentor guidance", icon: "👤", color: "#714ade" },
    { title: "Student progress report after every session", icon: "📊", color: "#3b68fc" },
  ];

  return (
    <section
      style={{
        padding: "88px 24px 96px",
        background: "linear-gradient(180deg, #f8f9ff 0%, #ffffff 50%, #f4f5ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Finquo Junior Section Ambient Orbs */}
      <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "1100px", height: "420px", background: "radial-gradient(ellipse at center, rgba(113, 74, 222, 0.22) 0%, rgba(253, 174, 39, 0.12) 45%, rgba(255,255,255,0) 75%)", pointerEvents: "none", filter: "blur(55px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "20%", left: "0%", width: "350px", height: "350px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.24) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(50px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "30%", right: "0%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.22) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(52px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "5%", left: "30%", width: "440px", height: "260px", background: "radial-gradient(ellipse at center, rgba(59, 104, 252, 0.18) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(45px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "20%", left: "5%", width: "220px", height: "220px", background: "radial-gradient(circle, rgba(253, 174, 39, 0.26) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(38px)", zIndex: 0 }} />
      
      <div style={{ maxWidth: 1140, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* Section Header */}
        <ScrollReveal variant="fade-up">
          <div style={{ textAlign: "center", marginBottom: 54 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span style={{ color: COLORS.purple, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5 }}>
                ✦ ABOUT THE PROGRAM ✦
              </span>
            </div>
            <h2 style={{ fontSize: "clamp(32px, 4.5vw, 46px)", fontWeight: 900, color: COLORS.dark, margin: "0 0 16px", letterSpacing: "-0.02em" }}>
              What is Finquo Junior?
            </h2>
            <p style={{ fontSize: 18, color: "#374151", lineHeight: 1.65, maxWidth: 880, margin: "0 auto", fontWeight: 600 }}>
              Finquo Junior is a one-year, mentor-led financial literacy and future-readiness program designed to help children build the knowledge, confidence, and practical skills they need for life.
            </p>
          </div>
        </ScrollReveal>

        {/* 2 Main Program Highlight Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 32 }}>
          {/* Card 1: Core Financial Literacy */}
          <ScrollReveal variant="fade-right" delay={100}>
            <div
              style={{
                padding: 32,
                borderRadius: 24,
                background: "#ffffff",
                border: "1.5px solid rgba(253, 174, 39, 0.25)",
                boxShadow: "0 12px 32px -10px rgba(253, 174, 39, 0.12)",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "rgba(253, 174, 39, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#f8721f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: COLORS.dark, margin: "0 0 12px" }}>
                Financial Literacy at the Core
              </h3>
              <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>
                At the heart of the program is financial literacy. Children learn how money works and, more importantly, how to make responsible financial decisions in real-life situations. From saving and budgeting to banking, taxation, investments, insurance, digital payments, and financial safety, the program builds a strong foundation for lifelong money management.
              </p>
            </div>
          </ScrollReveal>

          {/* Card 2: Essential Future-Ready Skills */}
          <ScrollReveal variant="fade-left" delay={200}>
            <div
              style={{
                padding: 32,
                borderRadius: 24,
                background: "#ffffff",
                border: "1.5px solid rgba(9, 177, 187, 0.25)",
                boxShadow: "0 12px 32px -10px rgba(9, 177, 187, 0.12)",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 16,
                  background: "rgba(9, 177, 187, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 20,
                }}
              >
                <Sparkles size={26} stroke="#09b1bb" />
              </div>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: COLORS.dark, margin: "0 0 12px" }}>
                Complementary Future-Ready Skills
              </h3>
              <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>
                The program also develops essential complementary skills such as communication, entrepreneurship, responsible decision-making, technology and AI awareness, sustainability, and cyber safety.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* 1-on-1 Dedicated Mentor Banner */}
        <ScrollReveal variant="zoom-in" delay={250}>
          <div
            style={{
              padding: "24px 32px",
              borderRadius: 20,
              background: "linear-gradient(135deg, rgba(113, 74, 222, 0.08) 0%, rgba(59, 104, 252, 0.08) 100%)",
              border: "1px solid rgba(113, 74, 222, 0.2)",
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 56,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: "50%",
                background: COLORS.purple,
                color: "#ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                fontWeight: 900,
              }}
            >
              1:1
            </div>
            <p style={{ fontSize: 16, color: COLORS.dark, fontWeight: 700, margin: 0, lineHeight: 1.6, flex: 1 }}>
              Each child is assigned a dedicated mentor for 1-on-1 mentoring, with every session lasting 60 minutes and designed around practical, engaging learning.
            </p>
          </div>
        </ScrollReveal>

        {/* "Every Session Includes" Section */}
        <div style={{ marginBottom: 56 }}>
          <ScrollReveal variant="fade-up">
            <h3 style={{ fontSize: 26, fontWeight: 900, color: COLORS.dark, margin: "0 0 28px", textAlign: "center" }}>
              Every Session Includes
            </h3>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {sessionIncludes.map((item, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 70}>
                <div
                  style={{
                    padding: 20,
                    borderRadius: 16,
                    background: "#ffffff",
                    border: "1.5px solid #e5e7eb",
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    boxShadow: "0 4px 14px rgba(0, 0, 0, 0.02)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(-3px)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = `0 10px 24px ${item.color}20`;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                    (e.currentTarget as HTMLDivElement).style.boxShadow = "0 4px 14px rgba(0, 0, 0, 0.02)";
                  }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      borderRadius: 12,
                      background: `${item.color}15`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.dark, lineHeight: 1.4 }}>
                    {item.title}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Parent Session Report Card */}
        <ScrollReveal variant="fade-up" delay={200}>
          <div
            style={{
              padding: 32,
              borderRadius: 24,
              background: "#ffffff",
              border: "1.5px solid rgba(113, 74, 222, 0.25)",
              boxShadow: "0 12px 32px -10px rgba(113, 74, 222, 0.12)",
              display: "flex",
              gap: 24,
              alignItems: "flex-start",
              marginBottom: 40,
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "rgba(113, 74, 222, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#714ade" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
            </div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h4 style={{ fontSize: 20, fontWeight: 800, color: COLORS.dark, margin: "0 0 10px" }}>
                Student Session Report for Parents
              </h4>
              <p style={{ fontSize: 15, color: COLORS.textMuted, lineHeight: 1.7, margin: 0 }}>
                After every session, parents receive a Student Session Report covering the child&apos;s participation, learning progress, key observations, and areas for improvement. This enables continuous evaluation and personalized mentoring throughout the one-year journey.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Closing Impact Summary Banner */}
        <ScrollReveal variant="zoom-in" delay={300}>
          <div
            style={{
              padding: "32px 40px",
              borderRadius: 24,
              background: "linear-gradient(135deg, #1a1a2e 0%, #2a2a4e 100%)",
              color: "#ffffff",
              textAlign: "center",
              boxShadow: "0 16px 40px -12px rgba(26, 26, 46, 0.3)",
            }}
          >
            <p style={{ fontSize: 17, lineHeight: 1.7, margin: 0, fontWeight: 600, color: "rgba(255, 255, 255, 0.95)" }}>
              Finquo Junior goes beyond teaching children about money. It helps them understand, practice, and apply financial concepts in real life, while building the broader skills they need to become confident and responsible young adults.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
