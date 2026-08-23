"use client";

import { useState, useRef, useEffect, ChangeEvent } from "react";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { BookDemoModal } from "@/app/home/components/book-demo-modal";
import { BookDemoFormSection } from "@/app/home/components/book-demo-form";
import { Video, Clock, ShieldCheck, Sparkles, ArrowRight, Calendar, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const COLORS = {
  gold: "#fdae27",
  orange: "#f8721f",
  teal: "#09b1bb",
  purple: "#714ade",
  blue: "#3b68fc",
  dark: "#1a1a2e",
  warmBg: "#fef9ed",
  lightGray: "#f8f9fa",
  white: "#ffffff",
  border: "#e5e7eb",
  textMuted: "#6b7280",
  success: "#10b981",
  error: "#ef4444",
};

interface SVGProps {
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

const SparkSVG = ({ size = 32, color = COLORS.gold, style = {} }: SVGProps) => (
  <svg width={size} height={size} viewBox="0 0 100 100" style={style}>
    <circle cx="10" cy="10" r="10" fill={color}
    />
  </svg>
);

const DotSVG = ({ size = 12, color, style = {} }: SVGProps & { color: string }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" style={style}>
    <circle cx="10" cy="10" r="10" fill={color} />
  </svg>
);

interface CustomSelectProps {
  label: React.ReactNode;
  value: string;
  onChange: (val: string) => void;
  options: string[];
  placeholder: string;
  error?: string | null;
}

function CustomSelect({ label, value, onChange, options, placeholder, error }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div style={{ marginBottom: 20, position: "relative" }} ref={containerRef}>
      <label style={{ fontSize: 14, fontWeight: 600, color: COLORS.dark, marginBottom: 6, display: "block" }}>{label}</label>
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        style={{
          width: "100%",
          padding: "12px 16px",
          borderRadius: 10,
          border: `1.5px solid ${error ? COLORS.error : isOpen ? COLORS.teal : COLORS.border}`,
          fontSize: 15,
          fontFamily: "Inter, system-ui, sans-serif",
          outline: "none",
          background: COLORS.white,
          boxSizing: "border-box",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: isOpen ? `0 0 0 3px ${COLORS.teal}22` : "none",
          transition: "all 0.2s ease",
          userSelect: "none",
        }}
      >
        <span style={{ color: value ? COLORS.dark : COLORS.textMuted, fontWeight: value ? 500 : 400 }}>
          {value || placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke={COLORS.textMuted}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>

      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            right: 0,
            zIndex: 50,
            background: COLORS.white,
            borderRadius: 12,
            border: `1px solid ${COLORS.border}`,
            boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            padding: "6px",
            maxHeight: 240,
            overflowY: "auto",
          }}
        >
          {options.map((opt) => {
            const isSelected = opt === value;
            return (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setIsOpen(false);
                }}
                style={{
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: 14,
                  fontWeight: isSelected ? 600 : 400,
                  color: isSelected ? COLORS.teal : COLORS.dark,
                  background: isSelected ? `${COLORS.teal}10` : "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "background 0.15s ease",
                  userSelect: "none",
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = COLORS.lightGray;
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                <span>{opt}</span>
                {isSelected && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={COLORS.teal} strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      )}

      {error && (
        <span style={{ color: COLORS.error, fontSize: 12, marginTop: 4, display: "block" }}>
          {error}
        </span>
      )}
    </div>
  );
}

interface FormState {
  parentName: string;
  studentName: string;
  grade: string;
  email: string;
  whatsapp: string;
  country: string;
  language: string;
  hearAbout: string;
}

const INITIAL_FORM: FormState = {
  parentName: "",
  studentName: "",
  grade: "",
  email: "",
  whatsapp: "",
  country: "",
  language: "",
  hearAbout: "",
};

type FormErrors = Partial<Record<keyof FormState, string | null>>;

export default function FinquoPilotPage() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const formRef = useRef<HTMLDivElement>(null);

  const update = (field: keyof FormState) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  };

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.parentName.trim()) e.parentName = "Required";
    if (!form.studentName.trim()) e.studentName = "Required";
    if (!form.grade.trim()) e.grade = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.whatsapp.trim()) e.whatsapp = "Required";
    if (!form.country.trim()) e.country = "Required";
    if (!form.language) e.language = "Required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    setSubmitting(true);
    try {
      await fetch("/api/pilot-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          parentName: form.parentName.trim(),
          studentName: form.studentName.trim(),
          studentGrade: form.grade.trim(),
          parentEmail: form.email.trim(),
          parentPhone: form.whatsapp.trim(),
          presentCountry: form.country.trim(),
          preferredLanguage: form.language,
          hearAbout: form.hearAbout || undefined,
        }),
      });
    } catch (err) {
      console.error("Failed to submit pilot application lead", err);
    } finally {
      setSubmitting(false);
      setSubmitted(true);
      formRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const inputStyle = (field: keyof FormState): React.CSSProperties => ({
    width: "100%",
    padding: "12px 16px",
    borderRadius: 10,
    border: `1.5px solid ${errors[field] ? COLORS.error : COLORS.border}`,
    fontSize: 15,
    fontFamily: "Inter, system-ui, sans-serif",
    outline: "none",
    transition: "border-color 0.2s",
    background: COLORS.white,
    boxSizing: "border-box",
  });

  const labelStyle: React.CSSProperties = {
    fontSize: 14,
    fontWeight: 600,
    color: COLORS.dark,
    marginBottom: 6,
    display: "block",
  };

  const fieldGroup: React.CSSProperties = { marginBottom: 20 };

  return (
    <div style={{ fontFamily: "Inter, system-ui, -apple-system, sans-serif", color: COLORS.dark, background: COLORS.white, minHeight: "100vh", margin: 0, lineHeight: 1.6, overflowX: "hidden" }}>
      {/* Shared Navbar */}
      <Navbar onOpenDemoModal={() => setIsDemoModalOpen(true)} />

      {/* HERO SECTION - Full Display Size Visual Banner */}
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "140px 24px 64px",
          textAlign: "center",
          background: "linear-gradient(180deg, #fef9ed 0%, #ffffff 40%, #f4f5ff 100%)",
          minHeight: "100vh",
          height: "auto",
        }}
      >
        {/* Ambient Glowing Radial Orbs Background */}
        {/* Orb 1 — Large central top blended ellipse (gold → purple) */}
        <div style={{ position: "absolute", top: "-70px", left: "50%", transform: "translateX(-50%)", width: "1200px", height: "520px", background: "radial-gradient(ellipse at center, rgba(253, 174, 39, 0.30) 0%, rgba(113, 74, 222, 0.18) 45%, rgba(255, 255, 255, 0) 72%)", pointerEvents: "none", filter: "blur(52px)", zIndex: 0 }} />
        {/* Orb 2 — Teal left-side mid */}
        <div style={{ position: "absolute", top: "15%", left: "3%", width: "360px", height: "360px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.28) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(45px)", zIndex: 0 }} />
        {/* Orb 3 — Purple right-side mid */}
        <div style={{ position: "absolute", top: "20%", right: "3%", width: "380px", height: "380px", background: "radial-gradient(circle, rgba(113, 74, 222, 0.26) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(45px)", zIndex: 0 }} />
        {/* Orb 4 — Orange bottom-left corner */}
        <div style={{ position: "absolute", bottom: "0%", left: "5%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.28) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(48px)", zIndex: 0 }} />
        {/* Orb 5 — Blue bottom-right corner */}
        <div style={{ position: "absolute", bottom: "0%", right: "5%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(59, 104, 252, 0.24) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(46px)", zIndex: 0 }} />
        {/* Orb 6 — Gold top-left corner accent */}
        <div style={{ position: "absolute", top: "0%", left: "0%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(253, 174, 39, 0.32) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />
        {/* Orb 7 — Teal top-right corner accent */}
        <div style={{ position: "absolute", top: "2%", right: "0%", width: "240px", height: "240px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.26) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(38px)", zIndex: 0 }} />
        {/* Orb 8 — Wide bottom-center warm ellipse */}
        <div style={{ position: "absolute", bottom: "-40px", left: "50%", transform: "translateX(-50%)", width: "900px", height: "280px", background: "radial-gradient(ellipse at center, rgba(253, 174, 39, 0.18) 0%, rgba(248, 114, 31, 0.12) 50%, rgba(255, 255, 255, 0) 75%)", pointerEvents: "none", filter: "blur(50px)", zIndex: 0 }} />
        {/* Orb 9 — Purple mid-left floating */}
        <div style={{ position: "absolute", top: "50%", left: "8%", width: "200px", height: "200px", background: "radial-gradient(circle, rgba(113, 74, 222, 0.22) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(36px)", zIndex: 0 }} />
        {/* Orb 10 — Orange mid-right floating */}
        <div style={{ position: "absolute", top: "55%", right: "7%", width: "220px", height: "220px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.26) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(38px)", zIndex: 0 }} />
        {/* Orb 11 — Blue center-left mid-page */}
        <div style={{ position: "absolute", top: "38%", left: "18%", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(59, 104, 252, 0.18) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(42px)", zIndex: 0 }} />
        {/* Orb 12 — Gold center-right mid-page */}
        <div style={{ position: "absolute", top: "40%", right: "16%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(253, 174, 39, 0.22) 0%, rgba(255, 255, 255, 0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />

        {/* Decorative Sparkles & Accents */}
        {/* <SparkSVG size={26} style={{ position: "absolute", top: 40, left: "8%", opacity: 0.4 }} />
        <DotSVG size={11} color={COLORS.orange} style={{ position: "absolute", top: 75, right: "10%", opacity: 0.5 }} />
        <DotSVG size={9} color={COLORS.blue} style={{ position: "absolute", bottom: 55, left: "12%", opacity: 0.4 }} />
        <SparkSVG size={20} color={COLORS.teal} style={{ position: "absolute", bottom: 40, right: "6%", opacity: 0.35 }} /> */}

        {/* Hero Content Box */}
        <div style={{ maxWidth: 920, margin: "0 auto", position: "relative", zIndex: 1 }}>
          {/* Top Badge */}
          {/* <ScrollReveal variant="fade-down" delay={100}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 18px",
                borderRadius: 50,
                background: "rgba(113, 74, 222, 0.08)",
                border: "1px solid rgba(113, 74, 222, 0.2)",
                marginBottom: 16,
              }}
            >
              <Sparkles size={14} color={COLORS.purple} />
              <span
                style={{
                  fontSize: 12.5,
                  fontWeight: 800,
                  color: COLORS.purple,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                }}
              >
                Finquo Junior Pilot Program
              </span>
            </div>
          </ScrollReveal> */}

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
              </span>

              {" "}Pilot Program

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
              You are the chosen one for our pilot program of Finquo Junior <b>Financial Literacy</b> Program. Finquo Junior is a one to one mentorship program focuses on future ready skills like finance, Communication, Entrepreneurship, AI and Cyberawareness
            </p>
          </ScrollReveal>

          {/* Primary CTA Button */}
          <ScrollReveal variant="zoom-in" delay={400}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <button
                onClick={() => setIsDemoModalOpen(true)}
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

        {/* Hero Stats Card Grid Section (Full Display Width) */}
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
                  num: "1-on-1",
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

      {/* DUAL DIRECTIONAL MARQUEE SECTION */}
      <ScrollReveal variant="fade-up" duration={700}>
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            padding: "36px 0 40px",
            background: "linear-gradient(135deg, rgba(113, 74, 222, 0.18) 0%, rgba(253, 174, 39, 0.14) 30%, rgba(9, 177, 187, 0.12) 65%, rgba(59, 104, 252, 0.15) 100%)",
            // borderTop: "1px solid rgba(113, 74, 222, 0.25)",
            // borderBottom: "1px solid rgba(253, 174, 39, 0.25)",
          }}
        >
          {/* Marquee Ambient Orbs */}
          <div style={{ position: "absolute", top: "-40px", left: "20%", width: "500px", height: "300px", background: "radial-gradient(ellipse at center, rgba(113, 74, 222, 0.55) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(38px)", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "-30px", right: "18%", width: "460px", height: "280px", background: "radial-gradient(ellipse at center, rgba(253, 174, 39, 0.58) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(36px)", zIndex: 0 }} />
          <div style={{ position: "absolute", top: "10%", right: "5%", width: "260px", height: "260px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.48) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(32px)", zIndex: 0 }} />
          <div style={{ position: "absolute", top: "15%", left: "3%", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.45) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(34px)", zIndex: 0 }} />
          <div style={{ position: "absolute", bottom: "5%", left: "40%", width: "420px", height: "200px", background: "radial-gradient(ellipse at center, rgba(59, 104, 252, 0.40) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />
          <style>{`
            @keyframes marqueeLeft {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            @keyframes marqueeRight {
              0% { transform: translateX(-50%); }
              100% { transform: translateX(0%); }
            }
            .marquee-track-left {
              display: flex;
              gap: 16px;
              width: max-content;
              animation: marqueeLeft 70s linear infinite;
            }
            .marquee-track-left:hover {
              animation-play-state: paused;
            }
            .marquee-track-right {
              display: flex;
              gap: 16px;
              width: max-content;
              animation: marqueeRight 60s linear infinite;
            }
            .marquee-track-right:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Edge Gradient Overlay Masks */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              width: "120px",
              background: "linear-gradient(90deg, #f8f9ff 0%, transparent 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "120px",
              background: "linear-gradient(270deg, #f4f5ff 0%, transparent 100%)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          />

          {/* TRACK 1: USP (Moving Left - Colorful Pastel Pills, Zero Icons) */}
          <div style={{ marginBottom: 18, position: "relative" }}>
            <div className="marquee-track-left">
              {[
                { label: "One to one Mentoring", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
                { label: "Dedicated Mentor for each student", bg: "#f0fdf4", border: "#99f6e4", text: "#115e59" },
                { label: "Online Session with Offline Activity materials", bg: "#faf5ff", border: "#e9d5ff", text: "#6b21a8" },
                { label: "Curated by Experts", bg: "#fff7ed", border: "#ffedd5", text: "#9a3412" },
                { label: "Future ready", bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" },
                { label: "Early Habits", bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46" },
                { label: "Realworld Training", bg: "#eef2ff", border: "#c7d2fe", text: "#3730a3" },
                { label: "Practical Problem Solving", bg: "#fdf2f8", border: "#fbcfe8", text: "#9d174d" },
              ].concat([
                { label: "One to one Mentoring", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
                { label: "Dedicated Mentor for each student", bg: "#f0fdf4", border: "#99f6e4", text: "#115e59" },
                { label: "Online Session with Offline Activity materials", bg: "#faf5ff", border: "#e9d5ff", text: "#6b21a8" },
                { label: "Curated by Experts", bg: "#fff7ed", border: "#ffedd5", text: "#9a3412" },
                { label: "Future ready", bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" },
                { label: "Early Habits", bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46" },
                { label: "Realworld Training", bg: "#eef2ff", border: "#c7d2fe", text: "#3730a3" },
                { label: "Practical Problem Solving", bg: "#fdf2f8", border: "#fbcfe8", text: "#9d174d" },
              ], [
                { label: "One to one Mentoring", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
                { label: "Dedicated Mentor for each student", bg: "#f0fdf4", border: "#99f6e4", text: "#115e59" },
                { label: "Online Session with Offline Activity materials", bg: "#faf5ff", border: "#e9d5ff", text: "#6b21a8" },
                { label: "Curated by Experts", bg: "#fff7ed", border: "#ffedd5", text: "#9a3412" },
                { label: "Future ready", bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" },
                { label: "Early Habits", bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46" },
                { label: "Realworld Training", bg: "#eef2ff", border: "#c7d2fe", text: "#3730a3" },
                { label: "Practical Problem Solving", bg: "#fdf2f8", border: "#fbcfe8", text: "#9d174d" },
              ]).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "11px 24px",
                    borderRadius: 50,
                    background: "#ffffff61",
                    border: "1.5px solid #e5e7eb",
                    whiteSpace: "nowrap",
                    fontSize: 14.5,
                    fontWeight: 500,
                    color: "#111111",
                    cursor: "default",
                  }}
                >
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* TRACK 2: TOPICS (Moving Right - Solid Vibrant Gradient Pills, Zero Icons) */}
          <div style={{ position: "relative" }}>
            <div className="marquee-track-right">
              {[
                { label: "Finance", grad: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.35)" },
                { label: "Communication", grad: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", shadow: "rgba(13, 148, 136, 0.35)" },
                { label: "Entrepreneurship", grad: "linear-gradient(135deg, #714ade 0%, #5b21b6 100%)", shadow: "rgba(113, 74, 222, 0.35)" },
                { label: "AI", grad: "linear-gradient(135deg, #3b68fc 0%, #1d4ed8 100%)", shadow: "rgba(59, 104, 252, 0.35)" },
                { label: "Cyber Awareness", grad: "linear-gradient(135deg, #f8721f 0%, #c2410c 100%)", shadow: "rgba(248, 114, 31, 0.35)" },
              ].concat([
                { label: "Finance", grad: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.35)" },
                { label: "Communication", grad: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", shadow: "rgba(13, 148, 136, 0.35)" },
                { label: "Entrepreneurship", grad: "linear-gradient(135deg, #714ade 0%, #5b21b6 100%)", shadow: "rgba(113, 74, 222, 0.35)" },
                { label: "AI", grad: "linear-gradient(135deg, #3b68fc 0%, #1d4ed8 100%)", shadow: "rgba(59, 104, 252, 0.35)" },
                { label: "Cyber Awareness", grad: "linear-gradient(135deg, #f8721f 0%, #c2410c 100%)", shadow: "rgba(248, 114, 31, 0.35)" },
              ], [
                { label: "Finance", grad: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.35)" },
                { label: "Communication", grad: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", shadow: "rgba(13, 148, 136, 0.35)" },
                { label: "Entrepreneurship", grad: "linear-gradient(135deg, #714ade 0%, #5b21b6 100%)", shadow: "rgba(113, 74, 222, 0.35)" },
                { label: "AI", grad: "linear-gradient(135deg, #3b68fc 0%, #1d4ed8 100%)", shadow: "rgba(59, 104, 252, 0.35)" },
                { label: "Cyber Awareness", grad: "linear-gradient(135deg, #f8721f 0%, #c2410c 100%)", shadow: "rgba(248, 114, 31, 0.35)" },
              ], [
                { label: "Finance", grad: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)", shadow: "rgba(245, 158, 11, 0.35)" },
                { label: "Communication", grad: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)", shadow: "rgba(13, 148, 136, 0.35)" },
                { label: "Entrepreneurship", grad: "linear-gradient(135deg, #714ade 0%, #5b21b6 100%)", shadow: "rgba(113, 74, 222, 0.35)" },
                { label: "AI", grad: "linear-gradient(135deg, #3b68fc 0%, #1d4ed8 100%)", shadow: "rgba(59, 104, 252, 0.35)" },
                { label: "Cyber Awareness", grad: "linear-gradient(135deg, #f8721f 0%, #c2410c 100%)", shadow: "rgba(248, 114, 31, 0.35)" },
              ]).map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    padding: "12px 28px",
                    borderRadius: 50,
                    background: "#ffffff61",
                    border: "1.5px solid #e5e7eb",
                    whiteSpace: "nowrap",
                    fontSize: 15.5,
                    fontWeight: 500,
                    color: "#111111",
                    letterSpacing: "0.02em",
                    cursor: "default",
                  }}
                >
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* BENEFITS */}
      <section style={{ padding: "64px 24px", background: COLORS.white, position: "relative", overflow: "hidden" }}>
        {/* Benefits Ambient Orbs */}
        <div style={{ position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)", width: "900px", height: "320px", background: "radial-gradient(ellipse at center, rgba(253, 174, 39, 0.20) 0%, rgba(59, 104, 252, 0.10) 50%, rgba(255,255,255,0) 75%)", pointerEvents: "none", filter: "blur(55px)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "30%", left: "2%", width: "280px", height: "280px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.22) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(42px)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "10%", right: "4%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(9, 177, 187, 0.20) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(44px)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "35%", width: "360px", height: "200px", background: "radial-gradient(ellipse at center, rgba(113, 74, 222, 0.18) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
          <ScrollReveal variant="fade-up">
            <h2 style={{ textAlign: "center", fontSize: 32, fontWeight: 900, margin: "0 0 12px", color: COLORS.dark }}>What Your Child Gets</h2>
            <p style={{ textAlign: "center", color: COLORS.textMuted, margin: "0 0 44px", fontSize: 16 }}>Everything included in the pilot, at no cost.</p>
          </ScrollReveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
            {[
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
            ].map((card, i) => (
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

      {/* HOW DOES IT WORK */}
      <section
        style={{
          padding: "72px 24px 80px",
          background: "linear-gradient(180deg, #f8f9ff 0%, #f4f5ff 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* How It Works Ambient Orbs */}
        <div style={{ position: "absolute", top: "-80px", left: "50%", transform: "translateX(-50%)", width: "1000px", height: "400px", background: "radial-gradient(ellipse at center, rgba(59, 104, 252, 0.20) 0%, rgba(113, 74, 222, 0.12) 45%, rgba(255,255,255,0) 75%)", pointerEvents: "none", filter: "blur(60px)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "25%", left: "1%", width: "300px", height: "300px", background: "radial-gradient(circle, rgba(253, 174, 39, 0.25) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(48px)", zIndex: 0 }} />
        <div style={{ position: "absolute", top: "15%", right: "2%", width: "320px", height: "320px", background: "radial-gradient(circle, rgba(248, 114, 31, 0.22) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(46px)", zIndex: 0 }} />
        <div style={{ position: "absolute", bottom: "-50px", left: "15%", width: "350px", height: "220px", background: "radial-gradient(ellipse at center, rgba(9, 177, 187, 0.20) 0%, rgba(255,255,255,0) 70%)", pointerEvents: "none", filter: "blur(40px)", zIndex: 0 }} />
        <div style={{ maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
          {/* Top Pill Badge & Heading */}
          <ScrollReveal variant="fade-down">
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}>
              <span style={{ color: COLORS.teal, fontSize: 13, fontWeight: 800, textTransform: "uppercase", letterSpacing: 1.5 }}>
                ✦ HOW DOES IT WORK ✦
              </span>
            </div>

            <h2 style={{ fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 900, color: COLORS.dark, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
              How does it work
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
            {[
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
            ].map((step, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 120} className="flex-1 min-w-[200px] max-w-[260px]">
                <div style={{ display: "flex", alignItems: "center", width: "100%", height: "100%" }}>
                  <div
                    style={{
                      position: "relative",
                      background: step.bgColor,
                      borderRadius: 24,
                      padding: "44px 20px 28px",
                      border: `1.5px solid ${step.borderColor}`,
                      boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      width: "100%",
                      height: "100%",
                      boxSizing: "border-box",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-6px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = `0 16px 36px -8px ${step.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 10px 30px -10px rgba(0, 0, 0, 0.04)";
                    }}
                  >
                    {/* Step Circle Badge on Top Edge */}
                    <div
                      style={{
                        position: "absolute",
                        top: -20,
                        left: "50%",
                        transform: "translateX(-50%)",
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
                        boxShadow: `0 4px 14px ${step.color}40`,
                        zIndex: 2,
                      }}
                    >
                      {step.step}
                    </div>

                    {/* Center Icon Pill */}
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
                      }}
                    >
                      {step.icon}
                    </div>

                    {/* Step Title & Accent Bar */}
                    <h3 style={{ fontSize: 18, fontWeight: 800, color: COLORS.dark, margin: "0 0 8px" }}>
                      {step.title}
                    </h3>
                    <div
                      style={{
                        width: 28,
                        height: 3,
                        borderRadius: 2,
                        background: step.color,
                        opacity: 0.6,
                        marginBottom: 12,
                      }}
                    />

                    {/* Step Description */}
                    <p style={{ fontSize: 13.5, color: COLORS.textMuted, lineHeight: 1.55, margin: 0 }}>
                      {step.desc}
                    </p>
                  </div>

                  {/* Standalone Arrow Connector Pill between Cards */}
                  {idx < 3 && (
                    <div
                      className="hidden xl:flex"
                      style={{
                        width: 28,
                        flexShrink: 0,
                        position: "relative",
                        alignItems: "center",
                        justifyContent: "center",
                        marginLeft: 8,
                        marginRight: 8,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: "100%",
                          height: 0,
                          borderTop: `2px dashed ${step.color}`,
                          zIndex: 1,
                        }}
                      />
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          background: step.color,
                          color: "#ffffff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          zIndex: 2,
                          boxShadow: `0 3px 10px ${step.color}40`,
                          flexShrink: 0,
                        }}
                      >
                        <ArrowRight size={13} strokeWidth={3} />
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Bottom Trust & Impact Banner matching Image 2 */}
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
              {/* Left Trophy Icon & Title */}
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
                  {/* Sparkle on top left of trophy */}
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 24 24"
                    fill="#fdae27"
                    style={{ position: "absolute", top: 8, left: 8 }}
                  >
                    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                  </svg>
                  {/* Trophy SVG */}
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

              {/* Vertical Divider Line */}
              <div
                className="hidden sm:block"
                style={{
                  width: 1.5,
                  height: 36,
                  background: "rgba(0, 0, 0, 0.12)",
                  flexShrink: 0,
                }}
              />

              {/* Right Text Block */}
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
                Every feedback helps us personalize the experience
                <br className="hidden sm:inline" />
                {" "}and create a lasting impact on your child&apos;s future.
              </p>

              {/* Right Gold Sparkle Star Icon */}
              <div style={{ flexShrink: 0, paddingLeft: 4 }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="#fdae27">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
                </svg>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 2-Step Reserve Your Seat Form Section */}
      <div ref={formRef}>
        <ScrollReveal variant="fade-up">
          <BookDemoFormSection />
        </ScrollReveal>
      </div>

      {/* WHAT IS FINQUO JUNIOR? SECTION */}
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
        <div style={{ maxWidth: 1140, margin: "0 auto" }}>
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
                Each child is assigned a dedicated mentor for one-to-one mentoring, with every session lasting 60 minutes and designed around practical, engaging learning.
              </p>
            </div>
          </ScrollReveal>

          {/* "Every session includes" Section */}
          <div style={{ marginBottom: 56 }}>
            <ScrollReveal variant="fade-up">
              <h3 style={{ fontSize: 26, fontWeight: 900, color: COLORS.dark, margin: "0 0 28px", textAlign: "center" }}>
                Every session includes
              </h3>
            </ScrollReveal>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
              {[
                { title: "Live presentations", icon: "🎥", color: "#f8721f" },
                { title: "Real-life financial examples and activities", icon: "💡", color: "#09b1bb" },
                { title: "Doubt clearing & Q&A", icon: "❓", color: "#714ade" },
                { title: "Physical worksheets", icon: "📚", color: "#3b68fc" },
                { title: "Interactive virtual activities", icon: "💻", color: "#f8721f" },
                { title: "Practical exercises and challenges", icon: "🎯", color: "#09b1bb" },
                { title: "Personalized one-to-one mentor guidance", icon: "👤", color: "#714ade" },
                { title: "Student progress report after every session", icon: "📊", color: "#3b68fc" },
              ].map((item, idx) => (
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

      {/* Shared Footer */}
      <Footer />
      <BookDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
}
