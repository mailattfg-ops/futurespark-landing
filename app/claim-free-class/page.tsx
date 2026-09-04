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
  Clock,
  ChevronDown,
  ShieldCheck,
  Laptop,
} from "lucide-react";
import {
  timezones,
  detectUserTimezone,
  getCountryCodeFromTimezone,
  getMatchingTimezone,
  allCountriesList,
  allCountryCodesList,
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
import { getDefaultSectionState, SectionState } from "../../lib/section-config";

const countryCodes = allCountryCodesList;

const gradeOptions = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8",
  "Grade 9", "Grade 10", "Grade 11", "Grade 12",
];

function ClaimFreeClassFormContent() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [partialLeadId, setPartialLeadId] = useState<string | null>(null);
  const [sections, setSections] = useState<SectionState>(getDefaultSectionState());

  useEffect(() => {
    async function loadSectionsConfig() {
      try {
        const cached = localStorage.getItem("landing_sections_config");
        if (cached) {
          setSections(JSON.parse(cached));
        }
        const res = await fetch("/api/sections");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            setSections(json.data);
            localStorage.setItem("landing_sections_config", JSON.stringify(json.data));
          }
        }
      } catch { }
    }
    loadSectionsConfig();

    const handleUpdate = () => {
      const cached = localStorage.getItem("landing_sections_config");
      if (cached) setSections(JSON.parse(cached));
    };
    window.addEventListener("storage_sections_updated", handleUpdate);
    return () => window.removeEventListener("storage_sections_updated", handleUpdate);
  }, []);

  const isEnabled = (key: string) => sections[key] !== false;

  // ── Step 1 State ───────────────────────────────────────────────────────────
  const [childName, setChildName] = useState("");
  const [studentGrade, setStudentGrade] = useState("Grade 6");
  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [presentCountry, setPresentCountry] = useState("India");
  const [email, setEmail] = useState("");
  const [hasLaptop, setHasLaptop] = useState<boolean>(true);
  const [isStep1Submitting, setIsStep1Submitting] = useState(false);

  // ── Step 2 State - Timezone, Dates & Backend Capacity Slots ──────────────
  const [timezone, setTimezone] = useState(timezones[0].value);
  const [selectedDateId, setSelectedDateId] = useState<string>("date-0");
  const [slotsList, setSlotsList] = useState<SlotOption[]>(defaultTimeSlots);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("11:00 AM");
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);
  const [isStep2Submitting, setIsStep2Submitting] = useState(false);

  // Auto-detect user timezone & dial code from device/browser location on mount
  useEffect(() => {
    const detectedTz = detectUserTimezone();
    if (detectedTz) {
      setTimezone(detectedTz);
      const code = getCountryCodeFromTimezone(detectedTz);
      if (code) setDialCode(code);
    }
  }, []);

  // Sync Timezone when Dial Code is manually changed
  useEffect(() => {
    const matched = getMatchingTimezone("", dialCode);
    setTimezone(matched);
  }, [dialCode]);

  // Detect if location is USA
  const isUSA = useMemo(() => {
    return isUSALocation("", dialCode, timezone);
  }, [dialCode, timezone]);

  // Dynamic Quick Date Options (Matches Pilot Form)
  const quickDateOptions = useMemo<DateOption[]>(() => {
    return generateQuickDates(isUSA, timezone);
  }, [isUSA, timezone]);

  const activeDateObj: DateOption = useMemo(() => {
    const idx = parseInt(selectedDateId.replace("date-", ""), 10);
    return quickDateOptions[idx] || quickDateOptions[0];
  }, [selectedDateId, quickDateOptions]);

  // Fetch Live Server Capacity and Slots Availability (Pilot Form Logic)
  const loadSlotsForDate = useCallback(
    async (targetDate: Date, dateStr: string) => {
      setIsLoadingSlots(true);
      const available = getAvailableSlotsForDate(targetDate, timezone, isUSA);

      try {
        const res = await fetch(`/api/pilot-leads/slot-availability?date=${encodeURIComponent(dateStr)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data && Array.isArray(json.data.slots)) {
            const cutoffHour = json.data.todayCutoffHour;
            const updatedAvailable = getAvailableSlotsForDate(targetDate, timezone, isUSA, cutoffHour);
            const serverSlotsMap = new Map<string, any>();
            json.data.slots.forEach((s: any) => serverSlotsMap.set(s.time, s));

            const merged = updatedAvailable.map((s) => {
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
        // Fallback to local available slots
      }

      setSlotsList(available);
      if (available.length > 0) {
        const firstAvailable = available.find((s) => !s.isBookedOut);
        setSelectedSlotTime(firstAvailable ? firstAvailable.time : available[0].time);
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

  // ── Step 3 State ───────────────────────────────────────────────────────────
  const [parentName, setParentName] = useState("");
  const [whoAreYou, setWhoAreYou] = useState<string>("Parent");
  const [bookingReason, setBookingReason] = useState<string>("Want to buy course");
  const [purchaseTimeline, setPurchaseTimeline] = useState<string>("After the demo");
  const [isStep3Submitting, setIsStep3Submitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Auto-redirect home after successful submission
  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [isSubmitted, router]);

  // Handle Step 1 Submission ("Book a Free Trial Class")
  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!childName.trim() || !phone.trim()) {
      setSubmitError("Please fill in student name and mobile number.");
      return;
    }

    setSubmitError(null);
    setIsStep1Submitting(true);

    const payload = {
      id: partialLeadId || undefined,
      studentName: childName.trim(),
      studentGrade,
      dialCode,
      phone: phone.trim(),
    };

    try {
      const res = await fetch("/api/partial-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.data?.id) {
        setPartialLeadId(data.data.id);
        setStep(2);
      } else {
        setSubmitError(data.message || "Failed to save details. Please try again.");
      }
    } catch {
      setStep(2);
    } finally {
      setIsStep1Submitting(false);
    }
  };

  // Handle Step 2 Submission ("Confirm Class Time")
  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSlotTime) {
      setSubmitError("Please select an available class start time.");
      return;
    }

    const currentSlot = slotsList.find((s) => s.time === selectedSlotTime);
    if (currentSlot?.isBookedOut) {
      setSubmitError("The selected slot is fully booked. Please choose an available time slot.");
      return;
    }

    setSubmitError(null);
    setIsStep2Submitting(true);

    const payload = {
      id: partialLeadId || undefined,
      studentName: childName.trim(),
      studentGrade,
      dialCode,
      phone: phone.trim(),
      preferredSlotDate: `${activeDateObj.fullDateStr} (${activeDateObj.weekdayName})`,
      preferredSlotTime: selectedSlotTime,
    };

    try {
      const res = await fetch("/api/partial-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success && data.data?.id) {
        setPartialLeadId(data.data.id);
      }
      setStep(3);
    } catch {
      setStep(3);
    } finally {
      setIsStep2Submitting(false);
    }
  };

  // Handle Step 3 Final Submission ("Submit")
  const handleStep3Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !email.trim()) {
      setSubmitError("Please fill in parent name and email address.");
      return;
    }

    setSubmitError(null);
    setIsStep3Submitting(true);

    const payload = {
      id: partialLeadId || undefined,
      studentName: childName.trim(),
      studentGrade,
      dialCode,
      phone: phone.trim(),
      email: email.trim(),
      hasLaptop,
      preferredSlotDate: `${activeDateObj.fullDateStr} (${activeDateObj.weekdayName})`,
      preferredSlotTime: selectedSlotTime,
      parentName: parentName.trim() || childName.trim(),
      whoAreYou,
      bookingReason,
      purchaseTimeline,
    };

    try {
      const res = await fetch("/api/partial-leads/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        track("Lead");
        setIsSubmitted(true);
      } else {
        setSubmitError(data.message || "Failed to submit form.");
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsStep3Submitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF5FC] text-gray-900 flex flex-col justify-between font-sans">
      {/* Top Light Navbar with Logo */}
      {isEnabled("claim_header") && (
        <header className="w-full bg-white border-b border-gray-200/80 px-4 sm:px-8 py-3.5 flex items-center justify-between shadow-xs z-10">
          <Link href="/" className="flex items-center">
            <div className="relative w-36 h-9 sm:w-44 sm:h-11">
              <Image
                src="/newlogo.png"
                alt="Finquo Junior Logo"
                fill
                sizes="(min-width: 640px) 176px, 144px"
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12 z-10">
        <div className="w-full max-w-[540px]">
          {/* Card Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-9 shadow-xl border border-gray-100/90 relative space-y-6">
            {/* Header & Back Arrow */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                {step > 1 && !isSubmitted ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as any)}
                    className="p-1.5 -ml-1.5 rounded-full hover:bg-gray-100 text-gray-800 transition-colors cursor-pointer"
                    aria-label="Back"
                  >
                    <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
                  </button>
                ) : <div />}

                <h1 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight text-center flex-1 font-sans">
                  {step === 1
                    ? "Book Financial Literacy Classes"
                    : step === 2
                      ? "Select Date & Time"
                      : "Help us customize your experience"}
                </h1>
                <div className="w-6" />
              </div>

              {/* 3-Segment Progress Bar */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 1 ? "bg-[#7C3AED]" : "bg-gray-200"
                    }`}
                />
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 2 ? "bg-[#7C3AED]" : "bg-gray-200"
                    }`}
                />
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${step >= 3 ? "bg-[#7C3AED]" : "bg-gray-200"
                    }`}
                />
              </div>
            </div>

            {/* Submit Success View */}
            {isSubmitted ? (
              <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h2 className="text-2xl font-black text-gray-900 font-sans tracking-tight">
                  Class Booked Successfully!
                </h2>
                <p className="text-sm text-gray-600 max-w-sm mx-auto leading-relaxed">
                  Thank you! We have received your booking for <strong>{childName}</strong>. Our academic team will reach out on WhatsApp shortly with class access details.
                </p>

                <div className="pt-3">
                  <p className="text-xs text-[#7C3AED] font-bold flex items-center justify-center gap-2 animate-pulse">
                    <Loader2 className="w-4 h-4 animate-spin" /> Redirecting to Home Page...
                  </p>
                </div>
              </div>
            ) : step === 1 ? (
              /* SECTION 1 FORM */
              <form onSubmit={handleStep1Submit} className="space-y-5">
                {/* Student's Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Student&apos;s Name
                    </label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Enter student's name"
                      className="w-full bg-[#F3F6FC]/70 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Student's Grade */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Student&apos;s Grade
                    </label>
                    <CustomSelect
                      id="studentGrade"
                      value={studentGrade}
                      onChange={setStudentGrade}
                      options={gradeOptions}
                      placeholder="Select grade (1 to 12)"
                      buttonClassName="py-3 px-4 text-sm text-gray-900 border-gray-300 rounded-2xl font-medium focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                    />
                  </div>
                </div>

                {/* Dial Code & Parent's WhatsApp Number */}
                <div className="space-y-1">
                  <div className="grid grid-cols-12 gap-2.5">
                    {/* Dial Code */}
                    <div className="col-span-5 sm:col-span-4 relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-bold text-gray-500 z-10">
                        Dial Code
                      </label>
                      <CustomSelect
                        id="dialCode"
                        aria-label="Dial Code"
                        value={dialCode}
                        onChange={setDialCode}
                        options={countryCodes.map((c) => ({
                          value: c.code,
                          displayValue: c.code,
                          label: `${c.country} (${c.code})`,
                          flag: c.flag,
                          country: c.country,
                        }))}
                        searchable
                        buttonClassName="py-3 px-2 sm:px-3 text-xs sm:text-sm font-bold text-gray-900 border-gray-300 rounded-2xl focus:border-[#7C3AED] focus:ring-2 focus:ring-[#7C3AED]/20"
                      />
                    </div>

                    {/* Parent's WhatsApp Number */}
                    <div className="col-span-7 sm:col-span-8 relative">
                      <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                        Parent&apos;s WhatsApp Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter WhatsApp number"
                        className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all font-medium"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium pl-1">
                    Please share the number that you use for WhatsApp
                  </p>
                </div>


                {submitError && (
                  <p className="text-xs text-red-500 font-semibold">{submitError}</p>
                )}

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isStep1Submitting}
                    className="w-full py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isStep1Submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Saving Details...</span>
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="w-4.5 h-4.5" />
                        <span>Book a Free Trial Class</span>
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-3 text-[11px] sm:text-xs text-gray-500 font-medium mt-3">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Free Trial
                    </span>
                    <span className="text-gray-300">•</span>
                    <span className="flex items-center gap-1">
                      <Laptop className="w-3.5 h-3.5 text-indigo-500" /> Laptop/Desktop Recommended
                    </span>
                  </div>
                </div>
              </form>
            ) : step === 2 ? (
              /* SECTION 2 FORM - Matches Pilot Form Slots & Capacity Conditions */
              <form onSubmit={handleStep2Submit} className="space-y-5">
                {/* Select Date */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-gray-900">Select Date</h3>
                      <p className="text-[11px] text-gray-400">Your class will be for 1 hour</p>
                    </div>
                    <TimezoneSelect value={timezone} onChange={setTimezone} />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {quickDateOptions.map((opt) => {
                      const isSelected = selectedDateId === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setSelectedDateId(opt.id)}
                          className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${isSelected
                            ? "bg-[#7C3AED] text-white border-[#7C3AED] font-extrabold shadow-sm"
                            : "bg-white border-gray-200 hover:border-gray-300 text-gray-800 font-semibold"
                            }`}
                        >
                          <span className="block text-xs">{opt.dayName}</span>
                          <span className={`block text-xs font-black mt-0.5 ${isSelected ? "text-white" : "text-gray-900"}`}>
                            {opt.dayDate}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Select Start Time */}
                <div className="space-y-2">
                  <div>
                    <h3 className="text-xs font-bold text-gray-900">Select Start Time</h3>
                    <p className="text-[11px] text-gray-400">Class slots are limited. Please choose carefully.</p>
                  </div>

                  {isLoadingSlots ? (
                    <div className="py-6 text-center text-xs text-gray-500 flex items-center justify-center gap-2 bg-gray-50 rounded-2xl border border-gray-100">
                      <Loader2 className="w-4 h-4 text-[#7C3AED] animate-spin" />
                      <span>Loading available demo slots...</span>
                    </div>
                  ) : slotsList.length === 0 ? (
                    <div className="py-4 text-center text-xs text-gray-600 bg-amber-50 rounded-2xl border border-amber-200 font-medium">
                      No demo slots available for this date. Please pick another date above.
                    </div>
                  ) : (
                    <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                      {slotsList.map((slot) => {
                        const isSelected = selectedSlotTime === slot.time;
                        const isBookedOut = slot.isBookedOut;
                        const displayTime = isUSA ? slot.time : istSlotToLocalLabel(slot.time, timezone, activeDateObj.rawDate);

                        return (
                          <button
                            key={slot.id}
                            type="button"
                            disabled={isBookedOut}
                            onClick={() => !isBookedOut && setSelectedSlotTime(slot.time)}
                            className={`py-2.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${isBookedOut
                              ? "bg-gray-100/90 border-gray-200 text-gray-400 cursor-not-allowed opacity-80"
                              : isSelected
                                ? "border-[#7C3AED] bg-[#7C3AED]/10 text-[#7C3AED] font-extrabold ring-2 ring-[#7C3AED]/30 cursor-pointer"
                                : "bg-white border-gray-200 hover:border-gray-300 text-gray-800 font-semibold cursor-pointer"
                              }`}
                          >
                            <span className={`text-xs font-bold ${isBookedOut ? "line-through text-gray-400" : ""}`}>
                              {displayTime}
                            </span>
                            {isBookedOut && (
                              <span className="text-[9px] font-medium text-gray-400 mt-0.5">Slot Full</span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {submitError && (
                  <p className="text-xs text-red-500 font-semibold">{submitError}</p>
                )}

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isStep2Submitting}
                    className="w-full py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isStep2Submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Confirming Slot...</span>
                      </>
                    ) : (
                      <span>Confirm Class Time</span>
                    )}
                  </button>

                  {/* <p className="text-[10px] text-gray-400 text-center font-medium mt-3">
                    Note: Free class will be conducted by reputed teachers.
                  </p> */}
                </div>
              </form>
            ) : (
              /* SECTION 3 FORM */
              <form onSubmit={handleStep3Submit} className="space-y-5">
                {/* Parent / Guardian Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Parent / Guardian Name
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter parent / guardian name"
                      className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Parent's Email Address */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Parent&apos;s Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="parent@example.com"
                      className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all font-medium"
                    />
                  </div>
                </div>




                {submitError && (
                  <p className="text-xs text-red-500 font-semibold">{submitError}</p>
                )}

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isStep3Submitting}
                    className="w-full py-3.5 rounded-2xl bg-[#7C3AED] hover:bg-[#6D28D9] active:bg-[#5B21B6] text-white font-extrabold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isStep3Submitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting...</span>
                      </>
                    ) : (
                      <>
                        <CalendarIcon className="w-4.5 h-4.5" />
                        <span>Submit</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      {isEnabled("claim_footer") && (
        <footer className="w-full bg-white border-t border-gray-200/80 px-4 py-4 text-center text-xs text-gray-500 z-10">
          © {new Date().getFullYear()} Finquo Junior. All rights reserved.
        </footer>
      )}
    </div>
  );
}

export default function ClaimFreeClassPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#EEF5FC] flex items-center justify-center text-gray-800">
          <Loader2 className="w-8 h-8 animate-spin text-[#7C3AED]" />
        </div>
      }
    >
      <ClaimFreeClassFormContent />
    </Suspense>
  );
}
