"use client";

import { useState, useMemo, useEffect, useCallback, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "lucide-react";
import {
  timezones,
  detectUserTimezone,
  getCountryCodeFromTimezone,
  getMatchingTimezone,
  allCountriesList,
  isUSALocation,
  generateQuickDates,
  getAvailableSlotsForDate,
  istSlotToLocalLabel,
  SlotOption,
  DateOption,
  defaultTimeSlots,
} from "../../lib/timezone-utils";
import { TimezoneSelect } from "../../components/ui/timezone-select";
import { CustomSelect } from "../../components/ui/custom-select";
import { track } from "../../lib/meta";

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

function ConfirmSeatFormContent() {
  const router = useRouter();
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

  // Auto-detect device timezone and country code on mount
  useEffect(() => {
    const autoDetected = detectUserTimezone();
    if (autoDetected) {
      setTimezone(autoDetected);
      const code = getCountryCodeFromTimezone(autoDetected);
      if (code) setCountryCode(code);
    }
  }, []);

  // Auto-sync Timezone with Present Country & Country Code
  useEffect(() => {
    if (presentCountry || countryCode !== "+91") {
      const matched = getMatchingTimezone(presentCountry, countryCode);
      setTimezone(matched);
    }
  }, [presentCountry, countryCode]);

  // Detect if selected location is USA
  const isUSA = useMemo(() => {
    return isUSALocation(presentCountry, countryCode, timezone);
  }, [presentCountry, countryCode, timezone]);

  // Live slots & selection state
  const [slotsList, setSlotsList] = useState<SlotOption[]>(defaultTimeSlots);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("10:00 AM");
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Form Submission State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-redirect to home page on submission
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, router]);

  // Dynamic Quick Date Cards
  const quickDateOptions = useMemo<DateOption[]>(() => {
    return generateQuickDates(isUSA, timezone);
  }, [isUSA, timezone]);

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

  // Slots calculation based on date, timezone, USA exclusion, and backend capacity
  const loadSlotsForDate = useCallback(
    async (targetDate: Date, dateStr: string) => {
      setIsLoadingSlots(true);
      const available = getAvailableSlotsForDate(targetDate, timezone, isUSA);

      try {
        const res = await fetch(`/api/pilot-leads/slot-availability?date=${encodeURIComponent(dateStr)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && Array.isArray(json.data.slots)) {
            const serverSlotsMap = new Map<string, any>();
            json.data.slots.forEach((s: any) => serverSlotsMap.set(s.time, s));

            const merged = available.map((s) => {
              const serverInfo = serverSlotsMap.get(s.time);
              if (serverInfo) {
                return {
                  ...s,
                  bookedCount: serverInfo.bookedCount,
                  maxCapacity: serverInfo.maxCapacity,
                  remainingSeats: serverInfo.remainingSeats,
                  isBookedOut: serverInfo.isBookedOut,
                };
              }
              return s;
            });

            setSlotsList(merged);
            const firstAvailable = merged.find((s) => !s.isBookedOut);
            setSelectedSlotTime(firstAvailable ? firstAvailable.time : "");
            setIsLoadingSlots(false);
            return;
          }
        }
      } catch {
        // Fallback to local available slots if endpoint fails
      }

      setSlotsList(available);
      if (available.length > 0) {
        setSelectedSlotTime(available[0].time);
      } else {
        setSelectedSlotTime("");
      }
      setIsLoadingSlots(false);
    },
    [timezone, isUSA]
  );

  useEffect(() => {
    if (step === 2 && activeDateObj?.rawDate) {
      loadSlotsForDate(activeDateObj.rawDate, activeDateObj.fullDateStr);
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
    if (!selectedSlotTime) {
      setSubmitError("Please select an available time slot.");
      return;
    }

    const currentSlot = slotsList.find((s) => s.time === selectedSlotTime);
    if (currentSlot?.isBookedOut) {
      setSubmitError("The selected slot is fully booked. Please choose an available time slot.");
      return;
    }

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
      preferredTimezone: timezone,
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
        track("Lead");
        setIsSubmitted(true);
      } else {
        setSubmitError(result.message || "Failed to submit demo request.");
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate min date string YYYY-MM-DD for custom date input based on first available date
  const minDateStr = useMemo(() => {
    const firstDate = quickDateOptions[0]?.rawDate || new Date();
    return `${firstDate.getFullYear()}-${String(firstDate.getMonth() + 1).padStart(2, "0")}-${String(firstDate.getDate()).padStart(2, "0")}`;
  }, [quickDateOptions]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#2E0B73] via-[#3B128E] to-[#250860] text-white flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background Decorative Mesh Blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center group">
          <div className="inline-flex items-center justify-center bg-white/95 hover:bg-white rounded-xl px-3 py-1.5 shadow-md border border-white/60 backdrop-blur-md transition-all">
            <Image
              src="/newlogo.png"
              alt="Finquo Junior Logo"
              width={140}
              height={36}
              className="h-7 sm:h-8.5 w-auto object-contain"
              priority
            />
          </div>
        </Link>

        {/* <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-all"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Home
        </Link> */}
      </header>

      {/* Main Content Form Card */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-6 z-10">
        <div className="w-full max-w-xl mx-auto space-y-4">
          {/* Compact Section Header */}
          <div className="text-center space-y-1.5">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
              Financial Literacy FREE Pilot Program
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-sans">
              Confirm your seat
            </h1>
          </div>

          {/* FINQUO Glassmorphic Form Card */}
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
                      {activeDateObj.dayName} ({activeDateObj.dayDate}) @ {isUSA ? selectedSlotTime : istSlotToLocalLabel(selectedSlotTime, timezone, activeDateObj.rawDate)}
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-[#6366F1] font-bold leading-relaxed max-w-xs mx-auto flex items-center justify-center gap-1.5 animate-pulse">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" /> Redirecting to Home Page...
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
              /* STEP 1: Parent & Student Info */
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
                    <CustomSelect
                      id="studentGrade"
                      value={studentGrade}
                      onChange={setStudentGrade}
                      options={gradeOptions}
                      placeholder="Select grade (1 to 12)"
                      leftIcon={<GraduationCap className="w-3.5 h-3.5" />}
                    />
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
                      <div className="col-span-5 sm:col-span-4">
                        <CustomSelect
                          id="countryCode"
                          aria-label="Country Code"
                          value={countryCode}
                          onChange={setCountryCode}
                          options={countryCodes.map((c) => ({
                            value: c.code,
                            label: c.code,
                            flag: c.flag,
                          }))}
                        />
                      </div>

                      <div className="col-span-7 sm:col-span-8 relative">
                        <Phone className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-3 pointer-events-none" />
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="WhatsApp number"
                          className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-2 py-2 text-xs text-gray-900 placeholder-gray-400 focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 focus:outline-none transition-all font-sans font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="presentCountry" className="block text-[11px] font-bold text-gray-700 font-sans">
                      Country of Residence <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      id="presentCountry"
                      value={presentCountry}
                      onChange={setPresentCountry}
                      options={allCountriesList}
                      placeholder="Select country"
                      leftIcon={<Globe className="w-3.5 h-3.5" />}
                      searchable
                      placement="top"
                    />
                  </div>
                </div>

                {/* Preferred Language & How did you hear */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="language" className="block text-[11px] font-bold text-gray-700 font-sans">
                      Preferred Language <span className="text-red-500">*</span>
                    </label>
                    <CustomSelect
                      id="language"
                      value={language}
                      onChange={setLanguage}
                      options={[
                        "English",
                        "Malayalam + English",
                        "Hindi + English",
                        "Tamil + English",
                        "Arabic + English",
                      ]}
                      placeholder="Select language"
                      placement="top"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="hearAbout" className="block text-[11px] font-bold text-gray-700 font-sans">
                      How did you hear? <span className="text-gray-400 font-normal">(Optional)</span>
                    </label>
                    <CustomSelect
                      id="hearAbout"
                      value={hearAbout}
                      onChange={setHearAbout}
                      options={[
                        "WhatsApp Invite",
                        "Friend or Family Invite",
                        "Social Media",
                        "Other",
                      ]}
                      placeholder="Select source"
                      placement="top"
                    />
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
              /* STEP 2: Choose Date & Time Slot */
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

                  <TimezoneSelect value={timezone} onChange={setTimezone} />
                </div>

                {/* Quick Date Selection Cards + Calendar Date Picker */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-gray-900">Select Class Date</h4>
                    <span className="text-[10px] text-gray-400">Duration: 60 minutes</span>
                  </div>

                  <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
                    {quickDateOptions.map((opt) => {
                      const isSelected = selectedDateId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedDateId(opt.id)}
                          className={`py-1.5 px-1 sm:p-2 rounded-xl border text-center transition-all cursor-pointer ${isSelected
                            ? "border-[#6366F1] bg-indigo-50/80 shadow-xs ring-2 ring-[#6366F1]/20 font-bold"
                            : "border-gray-200 hover:border-gray-300 bg-white"
                            }`}
                        >
                          <span className="block text-[11px] sm:text-xs font-bold text-gray-900 truncate">
                            {opt.dayName}
                          </span>
                          <span className="block text-[9px] sm:text-[10px] text-gray-500 font-medium mt-0.5 whitespace-nowrap">
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
                      <Clock className="w-3.5 h-3.5 text-[#6366F1]" /> Choose a Time Slot ({activeDateObj.fullDateStr})
                    </h4>
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                      Live 1-on-1
                    </span>
                  </div>

                  {isLoadingSlots ? (
                    <div className="py-4 text-center text-xs text-gray-500 flex items-center justify-center gap-2 bg-gray-50 rounded-xl border border-gray-100">
                      <Loader2 className="w-3.5 h-3.5 text-[#6366F1] animate-spin" />
                      <span>Loading available demo slots...</span>
                    </div>
                  ) : slotsList.length === 0 ? (
                    <div className="py-3 text-center text-xs text-gray-500 bg-amber-50 rounded-xl border border-amber-200 font-medium">
                      No demo slots available for this date. Please pick another date above.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 gap-2">
                      {slotsList.map((slot) => {
                        const isSelected = selectedSlotTime === slot.time;
                        const isBookedOut = slot.isBookedOut;
                        return (
                          <button
                            key={slot.id}
                            type="button"
                            disabled={isBookedOut}
                            onClick={() => {
                              if (!isBookedOut) setSelectedSlotTime(slot.time);
                            }}
                            className={`py-2.5 px-3 rounded-xl border text-center transition-all flex items-center justify-center ${isBookedOut
                              ? "border-gray-200 bg-gray-100/90 text-gray-400 cursor-not-allowed opacity-80"
                              : isSelected
                                ? "border-[#6366F1] bg-[#6366F1]/10 text-gray-900 font-extrabold shadow-xs ring-2 ring-[#6366F1]/30 cursor-pointer"
                                : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white cursor-pointer"
                              }`}
                          >
                            <span className={`text-xs font-bold ${isBookedOut ? "line-through text-gray-400" : ""}`}>
                              {isUSA ? slot.time : istSlotToLocalLabel(slot.time, timezone, activeDateObj.rawDate)}
                            </span>
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
                    Note: Laptop or desktop is recommended for this class
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Trust Badges Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400 flex-shrink-0" />
              <span className="text-xs font-bold">5/5 Parent Rating</span>
            </div>
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 text-white">
              <Laptop className="w-3.5 h-3.5 text-indigo-300 flex-shrink-0" />
              <span className="text-xs font-bold">Live 1-on-1 Virtual Lab</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl mx-auto px-4 py-3 text-center text-xs text-white/50 z-10">
        © {new Date().getFullYear()} Finquo Junior. All rights reserved.
      </footer>
    </div>
  );
}

export default function ConfirmYourSeatPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#2E0B73] flex items-center justify-center text-white">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      }
    >
      <ConfirmSeatFormContent />
    </Suspense>
  );
}
