"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  CheckCircle2,
  Loader2,
  Globe,
  Clock,
  User,
  GraduationCap,
  Phone,
  Mail,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Laptop,
  Star,
  ChevronDown,
} from "lucide-react";
import { timezones, getMatchingTimezone, allCountriesList } from "@/lib/timezone-utils";

interface SlotOption {
  id: string;
  time: string;
  mentor: string;
  scheduleType?: "DEMO";
  available?: boolean;
}

const countryCodes = [
  { code: "+91", flag: "🇮🇳", label: "India (+91)" },
  { code: "+1", flag: "🇺🇸", label: "USA (+1)" },
  { code: "+44", flag: "🇬🇧", label: "UK (+44)" },
  { code: "+971", flag: "🇦🇪", label: "UAE (+971)" },
  { code: "+65", flag: "🇸🇬", label: "Singapore (+65)" },
  { code: "+61", flag: "🇦🇺", label: "Australia (+61)" },
];

const gradeOptions = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8",
  "Grade 9", "Grade 10", "Grade 11", "Grade 12",
];

const defaultTimeSlots: SlotOption[] = [
  { id: "slot-1", time: "10:00 AM", mentor: "" },
  { id: "slot-2", time: "11:00 AM", mentor: "" },
  { id: "slot-3", time: "12:00 PM", mentor: "" },
  { id: "slot-4", time: "01:00 PM", mentor: "" },
  { id: "slot-5", time: "02:00 PM", mentor: "" },
  { id: "slot-6", time: "03:00 PM", mentor: "" },
  { id: "slot-7", time: "04:00 PM", mentor: "" },
  { id: "slot-8", time: "05:00 PM", mentor: "" },
  { id: "slot-9", time: "06:00 PM", mentor: "" },
  { id: "slot-10", time: "07:00 PM", mentor: "" },
  { id: "slot-11", time: "08:00 PM", mentor: "" },
];

interface DateOption {
  id: string;
  dayName: string;
  dayDate: string;
  fullDateStr: string;
  weekdayName: string;
  rawDate: Date;
  isCustom?: boolean;
}

function generateQuickDates(): DateOption[] {
  const dates: DateOption[] = [];
  const today = new Date();
  for (let i = 1; i <= 3; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const dayName = i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
    const dayDate = `${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })}`;
    const fullDateStr = `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}/${d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
      }/${d.getFullYear()}`;
    const weekdayName = d.toLocaleDateString("en-US", { weekday: "long" });
    dates.push({
      id: `date-${i - 1}`,
      dayName,
      dayDate,
      fullDateStr,
      weekdayName,
      rawDate: d,
    });
  }
  return dates;
}

export function BookDemoFormSection() {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 Form Fields
  const [parentName, setParentName] = useState("");
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [studentGrade, setStudentGrade] = useState("");
  const [presentCountry, setPresentCountry] = useState("");
  const [language, setLanguage] = useState("");
  const [hearAbout, setHearAbout] = useState("");

  // Step 2 Form Fields - Quick Dates + Custom Date
  const [selectedDateId, setSelectedDateId] = useState<string>("date-0");
  const [customDateVal, setCustomDateVal] = useState<string>("");
  const [showCalendarPicker, setShowCalendarPicker] = useState<boolean>(false);
  const [timezone, setTimezone] = useState(timezones[0].value);

  // Auto-sync Timezone with Present Country & Country Code
  useEffect(() => {
    const matched = getMatchingTimezone(presentCountry, countryCode);
    setTimezone(matched);
  }, [presentCountry, countryCode]);

  // Live slots & selection state
  const [slotsList, setSlotsList] = useState<SlotOption[]>(defaultTimeSlots);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("10:00 AM");
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Form Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Dynamic 3 Quick Date Cards (Tomorrow, Day 2, Day 3)
  const quickDateOptions = useMemo<DateOption[]>(() => {
    return generateQuickDates();
  }, []);

  // Custom date object if user picks a date from calendar input
  const customDateOption = useMemo<DateOption | null>(() => {
    if (!customDateVal) return null;
    const dateObj = new Date(customDateVal);
    const dayName = dateObj.toLocaleDateString("en-US", { weekday: "short" });
    const monthName = dateObj.toLocaleDateString("en-US", { month: "short" });
    const dateNum = dateObj.getDate();
    return {
      id: "date-custom",
      dayName,
      dayDate: `${monthName} ${dateNum}`,
      fullDateStr: dateObj.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      weekdayName: dateObj.toLocaleDateString("en-US", { weekday: "long" }),
      rawDate: dateObj,
      isCustom: true,
    };
  }, [customDateVal]);

  const activeDateObj: DateOption = useMemo(() => {
    if (selectedDateId === "date-custom" && customDateOption) {
      return customDateOption;
    }
    const idx = parseInt(selectedDateId.replace("date-", ""), 10);
    return quickDateOptions[idx] || quickDateOptions[0];
  }, [selectedDateId, customDateOption, quickDateOptions]);

  // Slots are fixed — no API fetch needed
  const loadSlotsForDate = useCallback(async (_targetDate: Date) => {
    // Always use fixed slots
    setSlotsList(defaultTimeSlots);
    setSelectedSlotTime(defaultTimeSlots[0].time);
  }, []);

  useEffect(() => {
    if (step === 2 && activeDateObj?.rawDate) {
      loadSlotsForDate(activeDateObj.rawDate);
    }
  }, [step, activeDateObj, loadSlotsForDate]);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !phone.trim() || !email.trim() || !childName.trim() || !studentGrade.trim() || !presentCountry.trim() || !language) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    setSubmitError(null);
    setStep(2);
  };

  const handleCustomDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (val) {
      setCustomDateVal(val);
      setSelectedDateId("date-custom");
    }
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const fullPhone = `${countryCode} ${phone.trim()}`;

    const payload = {
      parentName: parentName.trim(),
      studentName: childName.trim(),
      studentGrade: studentGrade.trim(),
      parentEmail: email.trim(),
      parentPhone: fullPhone,
      presentCountry: presentCountry.trim(),
      preferredLanguage: language,
      hearAbout: hearAbout || undefined,
      preferredSlotDate: `${activeDateObj.fullDateStr} (${activeDateObj.weekdayName})`,
      preferredSlotTime: selectedSlotTime,
    };

    try {
      const response = await fetch("/api/pilot-leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message || "Failed to submit demo request.");
      }
    } catch (err: any) {
      console.error("Submission failed:", err);
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate min date string YYYY-MM-DD for date input
  const minDateStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  }, []);

  return (
    <section id="book-demo" className="w-full bg-gradient-to-b from-[#2E0B73] via-[#3B128E] to-[#250860] py-8 sm:py-10 relative overflow-hidden font-sans scroll-mt-16">
      <div id="book-class" className="absolute -top-16 left-0 opacity-0 pointer-events-none" />
      {/* Background Decorative Mesh Blobs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      <ScrollReveal variant="zoom-in" duration={650} className="w-full max-w-xl mx-auto px-4 sm:px-6 relative z-10 space-y-4">
        {/* Compact Section Header */}
        <div className="text-center space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
            Financial Literacy FREE Pilot Program
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
            Confirm your seat
          </h2>
        </div>

        {/* FINQUO Glassmorphic Floating Form Card */}
        <div className="bg-white/95 backdrop-blur-xl rounded-2xl p-4 sm:p-6 shadow-xl text-gray-900 border border-white/40 relative space-y-4">
          {/* Step Indicator Header */}
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-[#6366F1] text-white font-black text-[11px] flex items-center justify-center shadow-xs">
                {step}
              </span>
              <span className="text-xs font-bold text-gray-800 uppercase tracking-wider font-sans">
                {step === 1 ? "Step 1: Parent & Student Details" : "Step 2: Choose Slot & Schedule"}
              </span>
            </div>

            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-100">
              {step === 1 ? "1 of 2" : "2 of 2"}
            </span>
          </div>

          {/* Dual Progress Bar */}
          <div className="w-full flex items-center gap-2">
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? "bg-gradient-to-r from-[#6366F1] to-[#8B5CF6]" : "bg-gray-200"
                }`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${step === 2 ? "bg-gradient-to-r from-[#8B5CF6] to-[#EC4899]" : "bg-gray-200"
                }`}
            />
          </div>

          {isSubmitted ? (
            /* Confirmation State */
            <div className="py-6 text-center space-y-3 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-black text-gray-900 font-sans tracking-tight">
                Seat Reserved Successfully!
              </h3>
              <div className="bg-gradient-to-b from-[#FBF9FE] to-purple-50/50 border border-purple-100 rounded-xl p-4 text-left space-y-2 max-w-sm mx-auto text-xs shadow-xs">
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">Parent Name:</span>
                  <span className="font-bold text-gray-900">{parentName}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">Student Name:</span>
                  <span className="font-bold text-gray-900">{childName}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">Student Grade:</span>
                  <span className="font-bold text-[#6366F1]">{studentGrade}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span className="font-medium">WhatsApp Contact:</span>
                  <span className="font-bold text-gray-900">{countryCode} {phone}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 pt-1.5 border-t border-purple-100">
                  <span className="font-medium">Confirmed Slot:</span>
                  <span className="font-extrabold text-[#6366F1]">
                    {activeDateObj.dayName} ({activeDateObj.dayDate}) @ {selectedSlotTime}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-xs mx-auto">
                Confirmation link sent to your WhatsApp. Your mentor will be waiting in the virtual classroom!
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setParentName("");
                  setPhone("");
                  setEmail("");
                  setChildName("");
                }}
                className="px-5 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
              >
                Reserve Another Seat
              </button>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Parent & Student Info (8 Fields) */
            <form onSubmit={handleStep1Submit} className="space-y-3">
              {/* Parent Name & Student Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="parentName" className="block text-[11px] font-bold text-gray-700 font-sans">
                    Parent / Guardian Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="parentName"
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter parent full name"
                      className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="childName" className="block text-[11px] font-bold text-gray-700 font-sans">
                    Student&apos;s Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="childName"
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Enter student name"
                      className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Student Grade & Email Address */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="studentGrade" className="block text-[11px] font-bold text-gray-700 font-sans">
                    Student&apos;s Grade <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none z-10" />
                    <select
                      id="studentGrade"
                      required
                      value={studentGrade}
                      onChange={(e) => setStudentGrade(e.target.value)}
                      className={`w-full bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-xs focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium appearance-none cursor-pointer ${!studentGrade ? "text-gray-400" : "text-gray-900"
                        }`}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select Grade (1 to 12)
                      </option>
                      {gradeOptions.map((g) => (
                        <option key={g} value={g} className="text-gray-900 py-1 font-medium">
                          {g}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="email" className="block text-[11px] font-bold text-gray-700 font-sans">
                    Parent&apos;s Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-3 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* WhatsApp Number & Present Country */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="phone" className="block text-[11px] font-bold text-gray-700 font-sans">
                    Parent&apos;s WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-12 gap-1.5">
                    <div className="col-span-4">
                      <select
                        id="countryCode"
                        aria-label="Country Code"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-1.5 py-2 text-xs font-semibold text-gray-900 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none cursor-pointer"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-span-8 relative">
                      <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3 pointer-events-none" />
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile Number"
                        className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-2 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label htmlFor="presentCountry" className="block text-[11px] font-bold text-gray-700 font-sans">
                    Present Country <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Globe className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3 pointer-events-none z-10" />
                    <select
                      id="presentCountry"
                      required
                      value={presentCountry}
                      onChange={(e) => setPresentCountry(e.target.value)}
                      className={`w-full bg-white border border-gray-200 rounded-xl pl-9 pr-8 py-2 text-xs focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium appearance-none cursor-pointer ${
                        !presentCountry ? "text-gray-400" : "text-gray-900"
                      }`}
                    >
                      <option value="" disabled className="text-gray-400">
                        Select Present Country
                      </option>
                      {allCountriesList.map((c) => (
                        <option key={c} value={c} className="text-gray-900 font-medium py-1">
                          {c}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-gray-400 absolute right-3 top-3 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Preferred Language & How did you hear */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label htmlFor="language" className="block text-[11px] font-bold text-gray-700 font-sans">
                    Preferred Language <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="language"
                    required
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-medium focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none cursor-pointer"
                  >
                    <option value="">Select language</option>
                    <option value="English">English</option>
                    <option value="Malayalam + English">Malayalam + English</option>
                    <option value="Hindi + English">Hindi + English</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label htmlFor="hearAbout" className="block text-[11px] font-bold text-gray-700 font-sans">
                    How did you hear? <span className="text-gray-400 font-normal">(Optional)</span>
                  </label>
                  <select
                    id="hearAbout"
                    value={hearAbout}
                    onChange={(e) => setHearAbout(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-900 font-medium focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none cursor-pointer"
                  >
                    <option value="">Select source</option>
                    <option value="WhatsApp Invite">WhatsApp Invite</option>
                    <option value="Friend or Family Invite">Friend or Family Invite</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {submitError && (
                <p className="text-xs text-red-500 font-medium pt-0.5">{submitError}</p>
              )}

              {/* Step 1 CTA Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-extrabold text-sm shadow-md shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  Proceed to Select Preferred Slot <ArrowRight className="w-4 h-4" />
                </button>

                <div className="flex items-center justify-center gap-3 text-[10px] text-gray-400 font-medium mt-2">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-500" /> 100% Free Trial
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Laptop className="w-3 h-3 text-indigo-500" /> Laptop/Desktop Recommended
                  </span>
                </div>
              </div>
            </form>
          ) : (
            /* STEP 2: Choose Date & Time Slot (Compact) */
            <div className="space-y-4">
              {/* Top Navigation */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-700 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-3.5 h-3.5 text-gray-600" /> Back
                </button>

                <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-200 rounded-xl px-3 py-2">
                  <Globe className="w-4 h-4 text-indigo-600 flex-shrink-0" />
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    aria-label="Select Timezone"
                    className="bg-transparent text-xs font-bold text-indigo-700 focus:outline-none cursor-pointer"
                  >
                    {timezones.map((tz) => (
                      <option key={tz.value} value={tz.value}>{tz.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Quick Date Selection Cards + Calendar Date Picker */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-900">Select Class Date</h4>
                  <span className="text-[10px] text-gray-400">Duration: 60 Mins</span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  {quickDateOptions.map((opt) => {
                    const isSelected = selectedDateId === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => setSelectedDateId(opt.id)}
                        className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                          ? "border-[#6366F1] bg-indigo-50/80 shadow-xs ring-2 ring-[#6366F1]/20 font-bold"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                          }`}
                      >
                        <span className="block text-xs font-bold text-gray-900">
                          {opt.dayName}
                        </span>
                        <span className="block text-[10px] text-gray-500 font-medium mt-0.5">
                          {opt.dayDate}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Calendar Date Picker Toggle */}
                <div>
                  {showCalendarPicker ? (
                    <div className="p-2.5 bg-indigo-50/60 border border-indigo-200/80 rounded-xl flex items-center justify-between gap-2 animate-in fade-in duration-200">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                        <span className="text-xs font-bold text-gray-900">Custom Date:</span>
                      </div>
                      <input
                        type="date"
                        min={minDateStr}
                        value={customDateVal}
                        onChange={handleCustomDateChange}
                        className="bg-white border border-gray-300 rounded-lg px-2.5 py-1 text-xs font-bold text-gray-900 focus:outline-none focus:border-[#6366F1] cursor-pointer"
                      />
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowCalendarPicker(true)}
                      className={`w-full py-1.5 px-2.5 rounded-lg border text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${selectedDateId === "date-custom"
                        ? "border-[#6366F1] bg-indigo-50 text-[#6366F1]"
                        : "border-dashed border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                        }`}
                    >
                      <CalendarIcon className="w-3.5 h-3.5 text-[#6366F1]" />
                      {customDateOption
                        ? `Selected: ${customDateOption.dayName} (${customDateOption.dayDate}) — Change`
                        : "📅 Pick Custom Date from Calendar"}
                    </button>
                  )}
                </div>
              </div>

              {/* Time Slots Section */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-[11px] font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#6366F1]" /> Available Time Slots ({activeDateObj.fullDateStr})
                  </h4>
                  <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    Live 1 on 1
                  </span>
                </div>

                {isLoadingSlots ? (
                  <div className="py-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2 bg-gray-50 rounded-xl border border-gray-100">
                    <Loader2 className="w-3.5 h-3.5 text-[#6366F1] animate-spin" />
                    <span>Loading available demo slots...</span>
                  </div>
                ) : slotsList.length === 0 ? (
                  <div className="py-3 text-center text-xs text-gray-500 bg-amber-50 rounded-xl border border-amber-200 font-medium">
                    No demo slots published for this date. Please pick another date above.
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {slotsList.map((slot) => {
                      const isSelected = selectedSlotTime === slot.time;
                      return (
                        <button
                          key={slot.id}
                          type="button"
                          onClick={() => setSelectedSlotTime(slot.time)}
                          className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                            ? "border-[#6366F1] bg-[#6366F1]/10 text-gray-900 font-extrabold shadow-xs ring-2 ring-[#6366F1]/30"
                            : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                            }`}
                        >
                          <span className="text-xs font-bold">{slot.time}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {submitError && (
                <p className="text-xs text-red-500 font-medium">{submitError}</p>
              )}

              {/* Step 2 CTA Button */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] hover:from-[#4F46E5] hover:to-[#7C3AED] text-white font-extrabold text-sm shadow-md shadow-indigo-500/20 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Confirming Trial Session...</span>
                    </>
                  ) : (
                    <span>Confirm Seat Reservation 🚀</span>
                  )}
                </button>

                <p className="text-[10px] text-gray-400 text-center font-medium mt-2">
                  Note: Laptop or desktop is compulsory for this class
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Compact Trust Badges Row Below Card */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
            <span className="text-xs font-bold">4.9/5 Parent Rating</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
            <Laptop className="w-3.5 h-3.5 text-indigo-300 flex-shrink-0" />
            <span className="text-xs font-bold">Live 1 on 1 Virtual Lab</span>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
