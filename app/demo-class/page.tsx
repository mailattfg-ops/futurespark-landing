"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Video,
  Laptop,
  Wifi,
  User,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Search,
} from "lucide-react";

interface LeadData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentFirstName?: string;
  studentLastName?: string;
  status: string;
  preferredDays?: string[];
  preferredTime?: string;
  preferredTimezone?: string;
  notes?: string;
  telecallerNotes?: string;
  meetingUrl?: string;
  meetingLink?: string;
  scheduledClass?: {
    id: string;
    meetingLink?: string;
    startTime?: string;
    endTime?: string;
    status?: string;
  };
  program?: {
    title?: string;
  };
}

function parseTargetSessionTime(sessionDateStr: string, timeSlotStr: string): Date | null {
  try {
    const dateMatch = sessionDateStr.match(/(\d{1,2})\/(\d{1,2})\/(\d{4})/);
    if (!dateMatch) return null;
    const [, day, month, year] = dateMatch;

    const startTimeMatch = timeSlotStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
    let hours = 16;
    let minutes = 30;

    if (startTimeMatch) {
      const [, hStr, mStr, ampm] = startTimeMatch;
      let h = parseInt(hStr, 10);
      minutes = parseInt(mStr, 10);
      if (ampm.toUpperCase() === "PM" && h < 12) h += 12;
      if (ampm.toUpperCase() === "AM" && h === 12) h = 0;
      hours = h;
    }

    return new Date(
      parseInt(year, 10),
      parseInt(month, 10) - 1,
      parseInt(day, 10),
      hours,
      minutes,
      0
    );
  } catch {
    return null;
  }
}

function DemoClassJoinSection({
  sessionDate,
  preferredTime,
  notes,
  telecallerNotes,
  leadMeetingUrl,
  leadMeetingLink,
  scheduledClass,
}: {
  sessionDate: string;
  preferredTime: string;
  notes?: string;
  telecallerNotes?: string;
  leadMeetingUrl?: string;
  leadMeetingLink?: string;
  scheduledClass?: { meetingLink?: string; startTime?: string };
}) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    isReady: boolean;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: false });

  // Extract meet URL from lead properties, scheduled class or notes (e.g. Google Meet, Zoom)
  let meetUrl: string | null = leadMeetingUrl || leadMeetingLink || scheduledClass?.meetingLink || null;

  if (!meetUrl) {
    const combinedNotes = `${notes || ""} ${telecallerNotes || ""}`;
    const urlMatch = combinedNotes.match(/(https?:\/\/(?:meet\.google\.com|zoom\.us|us06web\.zoom\.us|us02web\.zoom\.us|app\.finquo\.ai)[^\s]+)/i) ||
                     combinedNotes.match(/(https?:\/\/[^\s]+)/i);
    if (urlMatch && urlMatch[1]) {
      meetUrl = urlMatch[1];
    }
  }

  useEffect(() => {
    let targetDate = parseTargetSessionTime(sessionDate, preferredTime);
    if (!targetDate && scheduledClass?.startTime) {
      targetDate = new Date(scheduledClass.startTime);
    }

    function updateCountdown() {
      if (!targetDate) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true });
        return;
      }

      const now = Date.now();
      const diffMs = targetDate.getTime() - now;

      // Allow joining 10 minutes before session start time or anytime after session start
      if (diffMs <= 10 * 60 * 1000) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isReady: true });
        return;
      }

      const totalSec = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSec / (3600 * 24));
      const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = totalSec % 60;

      setTimeLeft({ days, hours, minutes, seconds, isReady: false });
    }

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [sessionDate, preferredTime, scheduledClass]);

  const padZero = (num: number) => String(num).padStart(2, "0");

  const canJoin = timeLeft.isReady && Boolean(meetUrl);

  return (
    <div className="bg-[#FFF8EE] border border-[#F7EBD9] rounded-2xl p-6 text-center space-y-4 shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-extrabold text-gray-900 font-sans">
          {canJoin ? "Ready for your child's demo class!" : "Demo Session Scheduled"}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto">
          {canJoin
            ? "Click below to join the live virtual classroom with your mentor. Please ensure your child is present."
            : "The Join Class button activates automatically 10 minutes before your scheduled session once the meet link is verified."}
        </p>
      </div>

      {/* Meet Link Status Indicator Badge */}
      {meetUrl ? (
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Meet Link Confirmed:</span>
          <a href={meetUrl} target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] underline text-emerald-900 font-bold hover:text-emerald-700">{meetUrl}</a>
        </div>
      ) : (
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-800 text-xs font-semibold">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Meeting Link: Being assigned by academic advisor</span>
        </div>
      )}

      {/* Countdown Timer Display (When session is in future) */}
      {!timeLeft.isReady && (
        <div className="py-2 space-y-2">
          <span className="text-xs font-bold text-amber-800 uppercase tracking-wider">
            Activates In
          </span>

          <div className="flex items-center justify-center gap-2 sm:gap-3 font-mono">
            <div className="bg-white border border-amber-200 shadow-2xs rounded-xl px-3 py-2 text-center min-w-[56px] sm:min-w-[64px]">
              <span className="text-xl sm:text-2xl font-black text-amber-700">{padZero(timeLeft.days)}</span>
              <span className="block text-[10px] text-gray-500 font-sans uppercase font-bold">Days</span>
            </div>
            <span className="text-lg font-bold text-amber-400">:</span>
            <div className="bg-white border border-amber-200 shadow-2xs rounded-xl px-3 py-2 text-center min-w-[56px] sm:min-w-[64px]">
              <span className="text-xl sm:text-2xl font-black text-amber-700">{padZero(timeLeft.hours)}</span>
              <span className="block text-[10px] text-gray-500 font-sans uppercase font-bold">Hours</span>
            </div>
            <span className="text-lg font-bold text-amber-400">:</span>
            <div className="bg-white border border-amber-200 shadow-2xs rounded-xl px-3 py-2 text-center min-w-[56px] sm:min-w-[64px]">
              <span className="text-xl sm:text-2xl font-black text-amber-700">{padZero(timeLeft.minutes)}</span>
              <span className="block text-[10px] text-gray-500 font-sans uppercase font-bold">Mins</span>
            </div>
            <span className="text-lg font-bold text-amber-400">:</span>
            <div className="bg-white border border-amber-200 shadow-2xs rounded-xl px-3 py-2 text-center min-w-[56px] sm:min-w-[64px]">
              <span className="text-xl sm:text-2xl font-black text-amber-700">{padZero(timeLeft.seconds)}</span>
              <span className="block text-[10px] text-gray-500 font-sans uppercase font-bold">Secs</span>
            </div>
          </div>
        </div>
      )}

      {/* Join Button */}
      {canJoin ? (
        <a
          href={meetUrl!}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white font-extrabold text-base shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all transform hover:-translate-y-0.5 cursor-pointer"
        >
          <Video className="w-5 h-5 mr-2 animate-bounce" /> Join Live Demo Class Now
        </a>
      ) : (
        <button
          disabled
          className="inline-flex items-center justify-center px-8 py-4 rounded-xl bg-gray-200 border border-gray-300 text-gray-400 font-bold text-base cursor-not-allowed select-none shadow-none opacity-80"
        >
          <Video className="w-5 h-5 mr-2 text-gray-400" /> Join Live Demo Class (Locked)
        </button>
      )}
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

  useEffect(() => {
    if (leadIdQuery) {
      setLeadId(leadIdQuery);
      setInputLeadId(leadIdQuery);
    }
  }, [leadIdQuery]);

  useEffect(() => {
    if (!leadId) return;

    async function fetchLead() {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/leads/${encodeURIComponent(leadId)}`);
        const data = await res.json();

        if (res.ok && data.success && data.data) {
          setLead(data.data);
        } else {
          setError(data.message || "Lead not found. Please verify your Lead ID.");
          setLead(null);
        }
      } catch (err: any) {
        setError("Unable to connect to lead service. Please try again.");
        setLead(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchLead();
  }, [leadId]);

  const handleManualSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputLeadId.trim()) {
      setLeadId(inputLeadId.trim());
    }
  };

  const parentName = lead
    ? [lead.firstName, lead.lastName].filter(Boolean).join(" ").trim()
    : "Parent";

  const studentName = lead
    ? [lead.studentFirstName, lead.studentLastName].filter(Boolean).join(" ").trim() ||
      lead.studentFirstName ||
      "Student"
    : "Student";

  const courseTitle = lead?.program?.title || "Financial Literacy Demo Class";
  const preferredTime = lead?.preferredTime || "04:30 PM - 05:30 PM";
  const timezone = lead?.preferredTimezone || "IST";

  // Parse session date from notes e.g. "Demo Slot: 20/08/2026 (Thursday)"
  let sessionDate = "20/08/2026";
  if (lead?.notes && typeof lead.notes === "string") {
    const match = lead.notes.match(/(\d{2}\/\d{2}\/\d{4})/);
    if (match && match[1]) {
      sessionDate = match[1];
    }
  } else if (lead?.preferredDays && lead.preferredDays.length > 0) {
    sessionDate = lead.preferredDays.join(", ");
  }

  return (
    <div className="min-h-screen bg-[#FAFAF7] font-sans pb-16 text-gray-900">
      {/* Top Header Bar */}
      <header className="w-full bg-white border-b border-gray-100 py-4 px-4 sm:px-8">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 flex-shrink-0">
              <Image src="/finquo-logo.png" alt="FINQUO Junior" fill className="object-contain" />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-black tracking-tight text-gray-900 font-sans">
                FINQUO
              </span>
              <span className="text-[10px] font-bold text-gray-700 -mt-1 tracking-wide">
                Junior
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200/60">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Demo Access Portal
            </span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-8">
        {/* Banner Card */}
        <div className="bg-gradient-to-r from-[#4F46E5] to-[#4338CA] text-white rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              1-on-1 Interactive Demo Session
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight font-sans">
              {lead ? `Welcome, ${parentName} & ${studentName}!` : "Demo Class Portal"}
            </h1>

            <p className="text-sm sm:text-base text-indigo-100 leading-relaxed font-normal">
              Join your child&apos;s live 1-on-1 session to experience financial literacy, critical thinking, and real-world trade-offs in action.
            </p>
          </div>
        </div>

        {/* Lead ID Lookup Bar (If missing or error) */}
        {(!leadId || error) && (
          <div className="bg-white border border-gray-200/80 rounded-2xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 text-gray-900">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold font-sans">Enter Lead Reference ID</h3>
                <p className="text-xs text-gray-500 font-normal">
                  Find your scheduled demo class by entering the Lead ID sent in your WhatsApp message.
                </p>
              </div>
            </div>

            <form onSubmit={handleManualSearch} className="flex items-center gap-3">
              <input
                type="text"
                value={inputLeadId}
                onChange={(e) => setInputLeadId(e.target.value)}
                placeholder="e.g. 52851e6c-b05f-4c73-a006-7d8d9608462d"
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-indigo-600 focus:bg-white transition-all font-sans"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl bg-[#4F46E5] hover:bg-[#4338CA] text-white text-sm font-bold shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                Access Class <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200/80 text-red-700 text-xs font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="py-16 text-center text-gray-500 space-y-3">
            <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5] mx-auto" />
            <p className="text-sm font-medium">Fetching scheduled demo session details...</p>
          </div>
        )}

        {/* Main Demo Class Card (When Lead loaded successfully) */}
        {lead && !isLoading && (
          <div className="space-y-6">
            {/* Scheduled Details Card */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                    Scheduled Session
                  </span>
                  <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-sans">
                    {courseTitle}
                  </h2>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/60 text-indigo-700 text-xs font-bold">
                  <Video className="w-4 h-4 text-indigo-600" />
                  Live 1-on-1 Class
                </div>
              </div>

              {/* Grid Info Columns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Date */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-indigo-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Session Date</span>
                    <p className="text-sm font-extrabold text-gray-900 mt-0.5">{sessionDate}</p>
                  </div>
                </div>

                {/* Time */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-amber-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Scheduled Time</span>
                    <p className="text-sm font-extrabold text-gray-900 mt-0.5">
                      {preferredTime} ({timezone})
                    </p>
                  </div>
                </div>

                {/* Student */}
                <div className="p-4 rounded-2xl bg-[#FAFAFA] border border-gray-100 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white border border-gray-200 text-emerald-600 flex items-center justify-center flex-shrink-0 shadow-2xs">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-gray-500 font-medium">Student Name</span>
                    <p className="text-sm font-extrabold text-gray-900 mt-0.5">{studentName}</p>
                  </div>
                </div>
              </div>

              {/* Join Button & Live Countdown Box */}
              <DemoClassJoinSection
                sessionDate={sessionDate}
                preferredTime={preferredTime}
                notes={lead.notes}
                telecallerNotes={lead.telecallerNotes}
                leadMeetingUrl={lead.meetingUrl}
                scheduledClass={lead.scheduledClass}
              />
            </div>

            {/* Preparation Checklist */}
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h3 className="text-base font-extrabold text-gray-900 font-sans flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                Pre-Class Checklist for Parents
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <Laptop className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700 font-medium">
                    <strong>Laptop or Desktop:</strong> We recommend joining on a computer for full interactive worksheet features.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-100">
                  <Wifi className="w-5 h-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <div className="text-xs text-gray-700 font-medium">
                    <strong>Stable Connection:</strong> High-speed internet ensures smooth audio and video experience.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function DemoClassPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center text-gray-500">
          <Loader2 className="w-8 h-8 animate-spin text-[#4F46E5]" />
        </div>
      }
    >
      <DemoClassPortalContent />
    </Suspense>
  );
}
