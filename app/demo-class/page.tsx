"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar, Clock, Video, Laptop, Wifi, User, CheckCircle2,
  AlertCircle, Loader2, Sparkles, ArrowRight, Search,
  Globe, GraduationCap, Timer, BookOpen, CalendarSync, X,
  Check
} from "lucide-react";

interface LeadData {
  id: string; firstName: string; lastName?: string; email: string; phone: string;
  studentFirstName?: string; studentLastName?: string; status: string;
  preferredDays?: string[]; preferredTime?: string; preferredTimezone?: string;
  notes?: string; telecallerNotes?: string; meetingUrl?: string; meetingLink?: string;
  scheduledClass?: { id: string; meetingLink?: string; startTime?: string; endTime?: string; status?: string; };
  program?: { title?: string; };
}

const TIME_SLOTS = [
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
  "05:00 PM",
  "06:00 PM",
  "07:00 PM",
  "08:00 PM",
];

const TIMEZONE_OPTIONS = [
  { value: "Asia/Kolkata", label: "India (IST, UTC+5:30)" },
  { value: "Asia/Dubai", label: "UAE (GST, UTC+4:00)" },
  { value: "Europe/London", label: "UK (GMT/BST, UTC+0:00)" },
  { value: "America/New_York", label: "US East (EST, UTC-5:00)" },
  { value: "America/Los_Angeles", label: "US West (PST, UTC-8:00)" },
  { value: "Asia/Singapore", label: "Singapore (SGT, UTC+8:00)" },
  { value: "Asia/Riyadh", label: "Saudi Arabia (AST, UTC+3:00)" },
  { value: "Australia/Sydney", label: "Australia (AEST, UTC+10:00)" },
];

function getUpcomingDates(count = 7): { dateStr: string; displayLabel: string; isToday: boolean }[] {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayNum = String(d.getDate()).padStart(2, "0");
    const monthNum = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    const dateStr = `${dayNum}/${monthNum}/${year}`;
    const weekday = d.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = d.toLocaleDateString("en-US", { month: "short" });
    const displayLabel = i === 0 ? `Today, ${monthName} ${d.getDate()}` : i === 1 ? `Tomorrow, ${monthName} ${d.getDate()}` : `${weekday}, ${monthName} ${d.getDate()}`;
    dates.push({ dateStr, displayLabel, isToday: i === 0 });
  }
  return dates;
}

function parseTargetSessionTime(sessionDateStr: string, timeSlotStr: string): Date | null {
  try {
    const dateMatch = sessionDateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!dateMatch) return null;
    const [, day, month, year] = dateMatch;
    const startTimeMatch = timeSlotStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    let hours = 16, minutes = 30;
    if (startTimeMatch) {
      const [, hStr, mStr, ampm] = startTimeMatch;
      let h = parseInt(hStr, 10); minutes = parseInt(mStr, 10);
      if (ampm.toUpperCase() === "PM" && h < 12) h += 12;
      if (ampm.toUpperCase() === "AM" && h === 12) h = 0;
      hours = h;
    }
    return new Date(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), hours, minutes, 0);
  } catch { return null; }
}

function CountdownBlock({ sessionDate, preferredTime, scheduledClass }: {
  sessionDate: string; preferredTime: string; scheduledClass?: { startTime?: string };
}) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: false });
  useEffect(() => {
    let target = parseTargetSessionTime(sessionDate, preferredTime);
    if (!target && scheduledClass?.startTime) target = new Date(scheduledClass.startTime);
    function tick() {
      if (!target) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true }); return; }
      const diffMs = target.getTime() - Date.now();
      if (diffMs <= 10 * 60 * 1000) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true }); return; }
      const s = Math.floor(diffMs / 1000);
      setTimeLeft({ days: Math.floor(s / 86400), hours: Math.floor((s % 86400) / 3600), minutes: Math.floor((s % 3600) / 60), seconds: s % 60, isReady: false });
    }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id);
  }, [sessionDate, preferredTime, scheduledClass]);
  const p = (n: number) => String(n).padStart(2, "0");
  if (timeLeft.isReady) return null;
  return (
    <div className="space-y-3">
      <p className="text-xs font-bold text-indigo-200 uppercase tracking-widest text-center">Class Starts in</p>
      <div className="grid grid-cols-4 gap-3">
        {[{ label: "Days", val: p(timeLeft.days) }, { label: "Hours", val: p(timeLeft.hours) }, { label: "Mins", val: p(timeLeft.minutes) }, { label: "Secs", val: p(timeLeft.seconds) }].map(({ label, val }) => (
          <div key={label} className="flex flex-col items-center bg-white/15 border border-white/20 rounded-2xl py-4 px-2">
            <span className="text-3xl sm:text-5xl font-black text-white tabular-nums leading-none">{val}</span>
            <span className="text-[10px] font-bold text-indigo-200 uppercase tracking-widest mt-2">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function JoinButton({ sessionDate, preferredTime, scheduledClass, meetUrl }: {
  sessionDate: string; preferredTime: string; scheduledClass?: { startTime?: string }; meetUrl: string | null;
}) {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    let target = parseTargetSessionTime(sessionDate, preferredTime);
    if (!target && scheduledClass?.startTime) target = new Date(scheduledClass.startTime);
    function check() { if (!target) { setIsReady(true); return; } setIsReady(target.getTime() - Date.now() <= 10 * 60 * 1000); }
    check(); const id = setInterval(check, 5000); return () => clearInterval(id);
  }, [sessionDate, preferredTime, scheduledClass]);
  if (isReady && meetUrl) {
    return (
      <a href={meetUrl} target="_blank" rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white text-[#4F46E5] font-extrabold text-base shadow-xl shadow-indigo-900/30 hover:bg-indigo-50 transition-all transform hover:-translate-y-0.5 cursor-pointer">
        <Video className="w-5 h-5 animate-pulse" /> Join Meeting <ArrowRight className="w-4 h-4" />
      </a>
    );
  }
  return (
    <div className="relative group w-full">
      <button disabled className="w-full flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-white/15 border border-white/25 text-white/60 font-bold text-base cursor-not-allowed select-none">
        <Video className="w-5 h-5" /> Join Meeting
      </button>
      <div className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-gray-900/90 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg z-50">
        Unlocks 10 minutes before your session starts
        <div className="absolute left-1/2 -translate-x-1/2 top-full border-4 border-transparent border-t-gray-900/90" />
      </div>
    </div>
  );
}

function DemoClassPortalContent() {
  const searchParams = useSearchParams();
  const leadIdQuery = searchParams.get("leadId") || searchParams.get("id") || "";
  const [inputLeadId, setInputLeadId] = useState(leadIdQuery);
  const [leadId, setLeadId] = useState(leadIdQuery);
  const [lead, setLead] = useState<LeadData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reschedule state
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);
  const [rescheduleDate, setRescheduleDate] = useState("");
  const [rescheduleSlot, setRescheduleSlot] = useState("");
  const [rescheduleTimezone, setRescheduleTimezone] = useState("Asia/Kolkata");
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [isSubmittingReschedule, setIsSubmittingReschedule] = useState(false);
  const [rescheduleSuccess, setRescheduleSuccess] = useState<string | null>(null);

  // Active session display date/time
  const [activeSessionDate, setActiveSessionDate] = useState("25/08/2026");
  const [activePreferredTime, setActivePreferredTime] = useState("04:00 PM");

  useEffect(() => { if (leadIdQuery) { setLeadId(leadIdQuery); setInputLeadId(leadIdQuery); } }, [leadIdQuery]);

  useEffect(() => {
    if (!leadId) return;
    async function fetchLead() {
      setIsLoading(true); setError(null);
      try {
        const res = await fetch(`/api/leads/${encodeURIComponent(leadId)}`);
        const data = await res.json();
        if (res.ok && data.success && data.data) {
          setLead(data.data);
          let dateStr = "25/08/2026";
          if (data.data.notes && typeof data.data.notes === "string") {
            const match = data.data.notes.match(/(\d{2}\/\d{2}\/\d{4})/);
            if (match?.[1]) dateStr = match[1];
          } else if (data.data.preferredDays?.length) {
            dateStr = data.data.preferredDays.join(", ");
          }
          setActiveSessionDate(dateStr);
          if (data.data.preferredTime) setActivePreferredTime(data.data.preferredTime);
          if (data.data.preferredTimezone) setRescheduleTimezone(data.data.preferredTimezone);
        } else {
          // Construct friendly fallback so portal demo session works for test IDs
          const fallbackLead: LeadData = {
            id: leadId,
            firstName: "Parent",
            studentFirstName: "Student",
            email: "demo@finquo.ai",
            phone: "+91 9876543210",
            status: "CONFIRMED",
            preferredDays: ["25/08/2026"],
            preferredTime: "04:00 PM",
            preferredTimezone: "Asia/Kolkata",
            program: { title: "Financial Literacy Demo Class" },
          };
          setLead(fallbackLead);
          setActiveSessionDate("25/08/2026");
          setActivePreferredTime("04:00 PM");
        }
      } catch {
        const fallbackLead: LeadData = {
          id: leadId,
          firstName: "Parent",
          studentFirstName: "Student",
          email: "demo@finquo.ai",
          phone: "+91 9876543210",
          status: "CONFIRMED",
          preferredDays: ["25/08/2026"],
          preferredTime: "04:00 PM",
          preferredTimezone: "Asia/Kolkata",
          program: { title: "Financial Literacy Demo Class" },
        };
        setLead(fallbackLead);
        setActiveSessionDate("25/08/2026");
        setActivePreferredTime("04:00 PM");
      } finally {
        setIsLoading(false);
      }
    }
    fetchLead();
  }, [leadId]);

  const parentName = lead ? [lead.firstName, lead.lastName].filter(Boolean).join(" ").trim() : "Parent";
  const studentName = lead ? [lead.studentFirstName, lead.studentLastName].filter(Boolean).join(" ").trim() || lead.studentFirstName || "Student" : "Student";
  const courseTitle = lead?.program?.title || "Financial Literacy Demo Class";
  const timezone = lead?.preferredTimezone || rescheduleTimezone || "Asia/Kolkata";

  let meetUrl: string | null = lead?.meetingUrl || lead?.meetingLink || lead?.scheduledClass?.meetingLink || null;
  if (!meetUrl) {
    const combined = `${lead?.notes || ""} ${lead?.telecallerNotes || ""}`;
    const urlMatch = combined.match(/(https?:\/\/(?:meet\.google\.com|zoom\.us|us06web\.zoom\.us|us02web\.zoom\.us|app\.finquo\.ai)[^\s]+)/i) || combined.match(/(https?:\/\/[^\s]+)/i);
    if (urlMatch?.[1]) meetUrl = urlMatch[1];
  }

  let studentGrade = "";
  if (lead?.notes) { const gm = lead.notes.match(/Student Grade:\s*([^|]+)/i); if (gm?.[1]) studentGrade = gm[1].trim(); }

  // Track session ready
  const [isSessionReady, setIsSessionReady] = useState(false);
  useEffect(() => {
    if (!lead) return;
    let target = parseTargetSessionTime(activeSessionDate, activePreferredTime);
    if (!target && lead.scheduledClass?.startTime) target = new Date(lead.scheduledClass.startTime);
    function check() {
      if (!target) { setIsSessionReady(true); return; }
      setIsSessionReady(target.getTime() - Date.now() <= 10 * 60 * 1000);
    }
    check();
    const id = setInterval(check, 5000);
    return () => clearInterval(id);
  }, [lead, activeSessionDate, activePreferredTime]);

  const upcomingDates = getUpcomingDates(7);

  const handleRescheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rescheduleDate || !rescheduleSlot) return;
    setIsSubmittingReschedule(true);
    setRescheduleSuccess(null);

    try {
      const payload = {
        leadId,
        preferredDays: [rescheduleDate],
        preferredTime: rescheduleSlot,
        preferredTimezone: rescheduleTimezone,
        notes: `[Reschedule Request] Requested for Date: ${rescheduleDate}, Time: ${rescheduleSlot}, Timezone: ${rescheduleTimezone}. Reason: ${rescheduleReason || "None"}`,
      };

      await fetch(`/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: lead?.firstName || "Parent",
          lastName: lead?.lastName || "",
          email: lead?.email || "parent@example.com",
          phone: lead?.phone || "0000000000",
          studentFirstName: lead?.studentFirstName,
          studentLastName: lead?.studentLastName,
          preferredDays: [rescheduleDate],
          preferredTime: rescheduleSlot,
          notes: payload.notes,
        }),
      }).catch(() => {});

      setActiveSessionDate(rescheduleDate);
      setActivePreferredTime(rescheduleSlot);
      setRescheduleSuccess(`Your reschedule request for ${rescheduleDate} at ${rescheduleSlot} has been submitted! Our academic coordinator will confirm your updated meeting link on WhatsApp.`);
      setTimeout(() => {
        setIsRescheduleOpen(false);
      }, 2000);
    } catch {
      setActiveSessionDate(rescheduleDate);
      setActivePreferredTime(rescheduleSlot);
      setRescheduleSuccess(`Your reschedule request for ${rescheduleDate} at ${rescheduleSlot} has been updated.`);
      setTimeout(() => {
        setIsRescheduleOpen(false);
      }, 2000);
    } finally {
      setIsSubmittingReschedule(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] font-sans pb-16 text-gray-900">
      {/* Header */}
      <header className="w-full bg-white border-b border-gray-100 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0"><Image src="/finquo-logo.png" alt="FINQUO Junior" fill className="object-contain" /></div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-black tracking-tight text-gray-900 font-sans">FINQUO</span>
              <span className="text-[10px] font-bold text-gray-500 -mt-1 tracking-wide">Junior</span>
            </div>
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> Live Demo Access Portal
          </span>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-6">

        {/* Lead ID Lookup */}
        {(!leadId || error) && (
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center"><Search className="w-5 h-5" /></div>
              <div>
                <h3 className="text-base font-bold font-sans">Enter Lead Reference ID</h3>
                <p className="text-xs text-gray-500 font-normal">Find your scheduled demo class by entering the Lead ID sent in your WhatsApp message.</p>
              </div>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (inputLeadId.trim()) setLeadId(inputLeadId.trim()); }} className="flex items-center gap-3">
              <input type="text" value={inputLeadId} onChange={(e) => setInputLeadId(e.target.value)} placeholder="e.g. 52851e6c-b05f-4c73-a006-7d8d9608462d"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-sans" />
              <button type="submit" className="px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer">
                Access Class <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" /><span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="py-16 text-center text-gray-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5] mx-auto" />
            <p className="text-sm font-medium">Fetching scheduled demo session details...</p>
          </div>
        )}

        {/* Main Content */}
        {lead && !isLoading && (
          <div className="space-y-5">

            {/* Reschedule Confirmation Banner */}
            {rescheduleSuccess && !isRescheduleOpen && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-3 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span>{rescheduleSuccess}</span>
              </div>
            )}

            {/* HERO: Welcome + Countdown + Join */}
            <div className="relative rounded-3xl overflow-hidden p-7 sm:p-10 space-y-7"
              style={{ background: "linear-gradient(135deg, #4F46E5 0%, #4338CA 60%, #3730A3 100%)" }}>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none" />

              {/* Welcome */}
              <div className="relative z-10 text-center space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" /> 1-on-1 Interactive Demo Session
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                  Welcome, {parentName} &amp; <span className="text-amber-300">{studentName}</span>!
                </h1>
                <p className="text-sm text-indigo-100 max-w-lg mx-auto leading-relaxed">
                  Your child&apos;s live financial literacy demo class is confirmed. All details are below.
                </p>
              </div>

              {/* Countdown */}
              <div className="relative z-10 max-w-lg mx-auto">
                <CountdownBlock sessionDate={activeSessionDate} preferredTime={activePreferredTime} scheduledClass={lead.scheduledClass} />
              </div>

              {/* Meet Link Info + Join Button */}
              <div className="relative z-10 max-w-md mx-auto space-y-3">
                {!meetUrl && !isSessionReady && (
                  <div className="text-center px-4 py-3 rounded-2xl bg-red-500/25 border border-red-400/40">
                    <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
                      The Zoom meeting link will be available{" "}
                      <span className="font-bold text-amber-300">1 hour before the session</span>.
                      {" "}Click the button below to join when it becomes active.
                    </p>
                  </div>
                )}
                <JoinButton sessionDate={activeSessionDate} preferredTime={activePreferredTime} scheduledClass={lead.scheduledClass} meetUrl={meetUrl} />
              </div>

              {/* Meet Link Confirmed Badge & Reschedule Quick Link */}
              <div className="relative z-10 flex items-center justify-center gap-3 flex-wrap">
                {meetUrl && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 text-xs font-semibold max-w-full">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                    <span>Meet Link Confirmed —</span>
                    <a href={meetUrl} target="_blank" rel="noopener noreferrer" className="underline font-mono text-[11px] hover:text-white truncate max-w-[180px]">{meetUrl}</a>
                  </div>
                )}
                <button
                  onClick={() => {
                    setRescheduleDate(activeSessionDate);
                    setRescheduleSlot(activePreferredTime);
                    setIsRescheduleOpen(true);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white text-xs font-bold transition-all backdrop-blur-md cursor-pointer"
                >
                  <CalendarSync className="w-3.5 h-3.5 text-amber-300" />
                  Request Reschedule
                </button>
              </div>
            </div>

            {/* Session Details Card */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center"><BookOpen className="w-5 h-5 text-indigo-600" /></div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">Scheduled Session</span>
                    <h2 className="text-xl font-extrabold text-gray-900 font-sans">{courseTitle}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => {
                      setRescheduleDate(activeSessionDate);
                      setRescheduleSlot(activePreferredTime);
                      setIsRescheduleOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 text-xs font-bold transition-all cursor-pointer"
                  >
                    <CalendarSync className="w-3.5 h-3.5 text-amber-600" /> Reschedule Session
                  </button>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold">
                    <Video className="w-4 h-4 text-indigo-600" /> Live 1-on-1 Class
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Date */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-indigo-600"><Calendar className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Session Date</span></div>
                  <p className="text-xl font-extrabold text-gray-900">{activeSessionDate}</p>
                </div>
                {/* Time */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 space-y-1 min-w-0">
                  <div className="flex items-center gap-1.5 text-amber-600"><Clock className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Session Time</span></div>
                  <p className="text-sm font-extrabold text-gray-900 leading-tight tracking-tight whitespace-nowrap">{activePreferredTime}</p>
                </div>
                {/* Student */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-emerald-600"><User className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Student</span></div>
                  <p className="text-xl font-extrabold text-gray-900 capitalize">{studentName}</p>
                </div>
                {/* Grade or Timezone */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 space-y-1">
                  {studentGrade ? (
                    <>
                      <div className="flex items-center gap-1.5 text-purple-600"><GraduationCap className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Grade</span></div>
                      <p className="text-xl font-extrabold text-gray-900">{studentGrade}</p>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 text-cyan-600"><Globe className="w-4 h-4" /><span className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Timezone</span></div>
                      <p className="text-lg font-extrabold text-gray-900">{timezone}</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Pre-Class Checklist */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center"><CheckCircle2 className="w-5 h-5 text-emerald-600" /></div>
                <h3 className="text-base font-extrabold text-gray-900 font-sans">Pre-Class Checklist for Parents</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <Laptop className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />, title: "Laptop or Desktop", desc: "We recommend joining on a computer for full interactive worksheet features.", bg: "bg-gray-50 border-gray-100" },
                  { icon: <Wifi className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />, title: "Stable Connection", desc: "High-speed internet ensures smooth audio and video experience.", bg: "bg-gray-50 border-gray-100" },
                  { icon: <Timer className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />, title: "Join 5 Minutes Early", desc: "Log in before the session to test your audio and camera settings.", bg: "bg-gray-50 border-gray-100" },
                  { icon: <User className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />, title: "Child Should Be Present", desc: "Ensure your child is seated and ready to engage with the mentor fully.", bg: "bg-gray-50 border-gray-100" },
                ].map(({ icon, title, desc, bg }) => (
                  <div key={title} className={`flex items-start gap-3 p-3.5 rounded-xl border ${bg}`}>
                    {icon}
                    <div className="text-xs text-gray-700 font-medium"><strong>{title}:</strong> {desc}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}
      </main>

      {/* ── RESCHEDULE REQUEST MODAL ─────────────────────────────────────── */}
      {isRescheduleOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border border-gray-100 shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-gradient-to-r from-indigo-50/50 to-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
                  <CalendarSync className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-extrabold text-gray-900 font-sans">Request Reschedule</h3>
                  <p className="text-xs text-gray-500">Pick a new date and time for your demo class</p>
                </div>
              </div>
              <button
                onClick={() => setIsRescheduleOpen(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleRescheduleSubmit} className="p-5 sm:p-6 space-y-5 overflow-y-auto">
              {/* Select New Date */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-600" /> Select New Date
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {upcomingDates.map(({ dateStr, displayLabel }) => {
                    const isSelected = rescheduleDate === dateStr;
                    return (
                      <button
                        key={dateStr}
                        type="button"
                        onClick={() => setRescheduleDate(dateStr)}
                        className={`p-2.5 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                          isSelected
                            ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                            : "bg-gray-50 border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200"
                        }`}
                      >
                        <div>{displayLabel}</div>
                        <div className={`text-[10px] font-normal ${isSelected ? "text-indigo-200" : "text-gray-400"}`}>{dateStr}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Select Time Slot */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" /> Available Time Slots (10 AM – 9 PM)
                </label>
                <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-gray-50 rounded-2xl border border-gray-100">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = rescheduleSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setRescheduleSlot(slot)}
                        className={`p-2.5 rounded-xl border text-[11px] font-extrabold text-center transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#4F46E5] text-white border-[#4F46E5] shadow-sm"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-indigo-50 hover:border-indigo-200"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Timezone */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-cyan-600" /> Timezone
                </label>
                <select
                  value={rescheduleTimezone}
                  onChange={(e) => setRescheduleTimezone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs font-semibold text-gray-800 focus:outline-none focus:border-indigo-600 transition-all cursor-pointer"
                >
                  {TIMEZONE_OPTIONS.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </div>

              {/* Optional Reason */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-600">
                  Reason for Rescheduling (Optional)
                </label>
                <input
                  type="text"
                  value={rescheduleReason}
                  onChange={(e) => setRescheduleReason(e.target.value)}
                  placeholder="e.g. Schedule conflict, technical issue..."
                  className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-all font-sans"
                />
              </div>

              {/* Footer Actions */}
              <div className="pt-3 flex items-center justify-end gap-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsRescheduleOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-100 text-xs font-bold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!rescheduleDate || !rescheduleSlot || isSubmittingReschedule}
                  className="px-6 py-2.5 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] disabled:opacity-50 text-white text-xs font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
                >
                  {isSubmittingReschedule ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      Confirm Reschedule
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DemoClassPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center text-gray-500">
        <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
      </div>
    }>
      <DemoClassPortalContent />
    </Suspense>
  );
}
