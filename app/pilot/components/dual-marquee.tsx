"use client";

import { ScrollReveal } from "@/components/ui/scroll-reveal";

export function DualMarqueeSection() {
  return (
    <ScrollReveal variant="fade-up" duration={700}>
      <section
        style={{
          position: "relative",
          overflow: "hidden",
          padding: "36px 0 40px",
          background: "linear-gradient(135deg, rgba(113, 74, 222, 0.18) 0%, rgba(253, 174, 39, 0.14) 30%, rgba(9, 177, 187, 0.12) 65%, rgba(59, 104, 252, 0.15) 100%)",
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

        {/* TRACK 1: USP (Moving Left) */}
        <div style={{ marginBottom: 18, position: "relative" }}>
          <div className="marquee-track-left">
            {[
              { label: "1 on 1 Mentoring", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
              { label: "Dedicated Mentor for each student", bg: "#f0fdf4", border: "#99f6e4", text: "#115e59" },
              { label: "Online Session with Offline Activity materials", bg: "#faf5ff", border: "#e9d5ff", text: "#6b21a8" },
              { label: "Curated by Experts", bg: "#fff7ed", border: "#ffedd5", text: "#9a3412" },
              { label: "Future ready", bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" },
              { label: "Early Habits", bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46" },
              { label: "Realworld Training", bg: "#eef2ff", border: "#c7d2fe", text: "#3730a3" },
              { label: "Practical Problem Solving", bg: "#fdf2f8", border: "#fbcfe8", text: "#9d174d" },
            ].concat([
              { label: "1 on 1 Mentoring", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
              { label: "Dedicated Mentor for each student", bg: "#f0fdf4", border: "#99f6e4", text: "#115e59" },
              { label: "Online Session with Offline Activity materials", bg: "#faf5ff", border: "#e9d5ff", text: "#6b21a8" },
              { label: "Curated by Experts", bg: "#fff7ed", border: "#ffedd5", text: "#9a3412" },
              { label: "Future ready", bg: "#eff6ff", border: "#bfdbfe", text: "#1e40af" },
              { label: "Early Habits", bg: "#ecfdf5", border: "#a7f3d0", text: "#065f46" },
              { label: "Realworld Training", bg: "#eef2ff", border: "#c7d2fe", text: "#3730a3" },
              { label: "Practical Problem Solving", bg: "#fdf2f8", border: "#fbcfe8", text: "#9d174d" },
            ], [
              { label: "1 on 1 Mentoring", bg: "#fffbeb", border: "#fcd34d", text: "#92400e" },
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

        {/* TRACK 2: TOPICS (Moving Right) */}
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
  );
}
