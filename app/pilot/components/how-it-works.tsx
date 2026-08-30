"use client";

import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const COLORS = {
  gold: "#fdae27",
  orange: "#f8721f",
  teal: "#09b1bb",
  purple: "#714ade",
  blue: "#3b68fc",
  dark: "#1a1a2e",
  textMuted: "#6b7280",
};

export function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      step: "1",
      title: "Sign Up",
      desc: "Fill out the quick registration form to get started.",
      color: "#f8721f",
      borderColor: "rgba(248, 114, 31, 0.25)",
      bgColor: "#ffffff",
      iconBg: "rgba(248, 114, 31, 0.08)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f8721f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-4" />
          <path d="M8 14h8" />
        </svg>
      ),
    },
    {
      step: "2",
      title: "Mentor Assigned",
      desc: "We assign your child a mentor best suited to their needs.",
      color: "#09b1bb",
      borderColor: "rgba(9, 177, 187, 0.25)",
      bgColor: "#ffffff",
      iconBg: "rgba(9, 177, 187, 0.08)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#09b1bb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
          <polygon points="12 11 13.2 12.8 15.3 12.8 13.8 14.1 14.4 16.2 12.6 15 10.8 16.2 11.4 14.1 9.9 12.8 12 12.8" />
        </svg>
      ),
    },
    {
      step: "3",
      title: "Attend Sessions",
      desc: "4 live sessions over 2–3 weeks with hands-on learning.",
      color: "#714ade",
      borderColor: "rgba(113, 74, 222, 0.25)",
      bgColor: "#ffffff",
      iconBg: "rgba(113, 74, 222, 0.08)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#714ade" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="3" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
    },
    {
      step: "4",
      title: "Share Feedback",
      desc: "Help us improve after each session with your feedback.",
      color: "#3b68fc",
      borderColor: "rgba(59, 104, 252, 0.25)",
      bgColor: "#ffffff",
      iconBg: "rgba(59, 104, 252, 0.08)",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b68fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          <polygon points="12 7 12.8 8.8 14.8 8.8 13.3 10 13.9 12 12.1 10.8 10.3 12 10.9 10 9.4 8.8 11.4 8.8" />
        </svg>
      ),
    },
  ];

  // Default continuous auto-play step cycling effect (2.8 seconds per step)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <section
      style={{
        padding: "72px 24px 80px",
        background: "linear-gradient(180deg, #f8f9ff 0%, #f4f5ff 100%)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes stepRipple {
          0% {
            transform: translate(-50%, -50%) scale(0.85);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.8);
            opacity: 0;
          }
        }
        @keyframes stepIconFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        @keyframes arrowFlowNudge {
          0%, 100% {
            transform: translateX(0) scale(1);
          }
          50% {
            transform: translateX(4px) scale(1.12);
          }
        }
      `}</style>

      {/* How It Works Ambient Orbs */}
      <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "1000px", height: "400px", background: "radial-gradient(ellipse at center, rgba(59, 104, 252, 0.20) 0%, rgba(113, 74, 222, 0.12) 45%, rgba(255,255,255,0) 75%)", pointerEvents: "none", filter: "blur(60px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "25%", left: "1%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(253, 174, 39, 0.25) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(48px)", zIndex: 0 }} />
      <div style={{ position: "absolute", top: "15%", right: "2%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.22) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(46px)", zIndex: 0 }} />
      <div style={{ position: "absolute", bottom: "-50px", left: "15%", width: "350px", height: "220px", background: "radial-gradient(ellipse at center, rgba(9, 177, 187, 0.20) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />
      
      <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
        <ScrollReveal variant="fade-down">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
            <span style={{ color: COLORS.teal, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5 }}>
              ✦ HOW IT WORKS ✦
            </span>
          </div>

          <h2 style={{ fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 900, color: COLORS.dark, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            How It Works
          </h2>
          <p style={{ fontSize: 16, color: COLORS.textMuted, margin: "0 0 54px", maxWidth: 640, marginLeft: "auto", marginRight: "auto" }}>
            From sign up to success – we make it easy for your child to learn, grow, and shine.
          </p>
        </ScrollReveal>

        {/* 4 Step Cards Responsive Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "stretch",
            justifyContent: "center",
            gap: 16,
            maxWidth: 1180,
            margin: "0 auto",
          }}
        >
          {steps.map((step, idx) => {
            const isActive = activeStep === idx;
            return (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 120} className="flex-1 min-w-[220px] max-w-[250px] w-full">
                <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>
                  <div
                    onClick={() => setActiveStep(idx)}
                    style={{
                      position: "relative",
                      background: step.bgColor,
                      borderRadius: 24,
                      padding: "44px 20px 28px",
                      border: isActive ? `2px solid ${step.color}` : `2px solid ${step.borderColor}`,
                      boxShadow: isActive
                        ? `0 20px 42px -8px ${step.color}45, 0 0 20px ${step.color}20`
                        : "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transform: isActive ? "translateY(-10px)" : "translateY(0)",
                      transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                      cursor: "pointer",
                    }}
                  >
                    {/* Top Glow Accent Line for Active Step */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: "20%",
                          right: "20%",
                          height: 3,
                          borderRadius: "0 0 4px 4px",
                          background: `linear-gradient(90deg, transparent, ${step.color}, transparent)`,
                          boxShadow: `0 2px 10px ${step.color}`,
                        }}
                      />
                    )}

                    {/* Step Ripple Ring on Active */}
                    {isActive && (
                      <div
                        style={{
                          position: "absolute",
                          top: -20,
                          left: "50%",
                          width: 44,
                          height: 44,
                          borderRadius: "50%",
                          border: `2px solid ${step.color}`,
                          animation: "stepRipple 2s cubic-bezier(0, 0.2, 0.8, 1) infinite",
                          pointerEvents: "none",
                        }}
                      />
                    )}

                    {/* Step Number Circle Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: -20,
                        left: "50%",
                        transform: isActive ? "translateX(-50%) scale(1.15)" : "translateX(-50%) scale(1)",
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        background: step.color,
                        color: "#ffffff",
                        fontWeight: 900,
                        fontSize: 18,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: isActive ? `0 6px 20px ${step.color}70` : `0 4px 14px ${step.color}40`,
                        zIndex: 2,
                        transition: "transform 0.3s ease, box-shadow 0.3s ease",
                      }}
                    >
                      {step.step}
                    </div>

                    {/* Icon Container with Float Animation when Active */}
                    <div
                      style={{
                        width: 68,
                        height: 68,
                        borderRadius: "50%",
                        background: step.iconBg,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 18,
                        animation: isActive ? "stepIconFloat 2.5s ease-in-out infinite" : "none",
                        boxShadow: isActive ? `0 8px 20px ${step.color}25` : "none",
                        transition: "all 0.3s ease",
                      }}
                    >
                      {step.icon}
                    </div>

                    <h3 style={{ fontSize: 18, fontWeight: 800, color: COLORS.dark, margin: "0 0 8px" }}>
                      {step.title}
                    </h3>
                    <div
                      style={{
                        width: isActive ? 48 : 28,
                        height: 3,
                        borderRadius: 2,
                        background: step.color,
                        opacity: isActive ? 1 : 0.6,
                        marginBottom: 12,
                        transition: "all 0.3s ease",
                        boxShadow: isActive ? `0 0 8px ${step.color}` : "none",
                      }}
                    />

                    <p style={{ fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.55, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Flow Arrow Connector between steps */}
                  {idx < 3 && (
                    <div
                      className="hidden xl:flex"
                      style={{
                        width: 28,
                        flexShrink: 0,
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 8,
                        marginRight: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background: (activeStep === idx || activeStep === idx + 1) ? step.color : "rgba(156, 163, 175, 0.3)",
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: (activeStep === idx || activeStep === idx + 1) ? `0 4px 14px ${step.color}60` : "none",
                          flexShrink: 0,
                          animation: activeStep === idx ? "arrowFlowNudge 1.5s ease-in-out infinite" : "none",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <ArrowRight size={13} strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Bottom Trust & Impact Banner */}
        <ScrollReveal variant="zoom-in" delay={450}>
          <div
            style={{
              margin: "48px auto 0",
              maxWidth: 820,
              padding: "14px 24px",
              borderRadius: 24,
              background: "#ffffff",
              border: "1px solid rgba(253, 174, 39, 0.25)",
              boxShadow: "0 10px 30px -10px rgba(253, 174, 39, 0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
              <div
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: "50%",
                  background: "rgba(253, 174, 39, 0.12)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  position: "relative",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="#fdae27"
                  style={{ position: "absolute", top: 8, left: 8 }}
                >
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#f8721f"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
                </svg>
              </div>

              <span style={{ fontWeight: 800, color: COLORS.dark, fontSize: 16, whiteSpace: "nowrap" }}>
                Better Skills, Brighter Future
              </span>
            </div>

            <div
              className="hidden sm:block"
              style={{
                width: 1.5,
                height: 36,
                background: "rgba(0, 0, 0, 0.12)",
                flexShrink: 0,
              }}
            />

            <p
              style={{
                fontSize: 13.5,
                color: "#6b7280",
                fontWeight: 500,
                textAlign: "left",
                lineHeight: 1.45,
                margin: 0,
                flex: "1 1 280px",
              }}
            >
              Every piece of feedback helps us personalize the experience
              <br className="hidden sm:inline" />
              {" "}and create a lasting impact on your child&apos;s future.
            </p>

            <div style={{ flexShrink: 0, paddingLeft: 4 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#fdae27">
                <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
              </svg>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
