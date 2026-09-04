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
} from "lucide-react";
import {
  timezones,
  detectUserTimezone,
  getCountryCodeFromTimezone,
  getMatchingTimezone,
  isUSALocation,
  generateQuickDates,
  getAvailableSlotsForDate,
  istSlotToLocalLabel,
  SlotOption,
  DateOption,
  defaultTimeSlots,
} from "../../lib/timezone-utils";
import { TimezoneSelect } from "../../components/ui/timezone-select";
import { track } from "../../lib/meta";

const countryCodes = [
  { code: "+91", flag: "🇮🇳", label: "IN +91" },
  { code: "+1", flag: "🇺🇸", label: "US +1" },
  { code: "+44", flag: "🇬🇧", label: "UK +44" },
  { code: "+971", flag: "🇦🇪", label: "UAE +971" },
  { code: "+65", flag: "🇸🇬", label: "SG +65" },
  { code: "+61", flag: "🇦🇺", label: "AU +61" },
];

const gradeOptions = [
  "Grade 1", "Grade 2", "Grade 3", "Grade 4",
  "Grade 5", "Grade 6", "Grade 7", "Grade 8",
  "Grade 9", "Grade 10", "Grade 11", "Grade 12",
];

function ClaimFreeClassFormContent() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [partialLeadId, setPartialLeadId] = useState<string | null>(null);

  // ── Step 1 State ───────────────────────────────────────────────────────────
  const [childName, setChildName] = useState("");
  const [studentGrade, setStudentGrade] = useState("Grade 6");
  const [dialCode, setDialCode] = useState("+91");
  const [phone, setPhone] = useState("");
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
    if (!childName.trim() || !phone.trim() || !email.trim()) {
      setSubmitError("Please fill in your name, mobile number, and email.");
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
      email: email.trim(),
      hasLaptop,
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
      email: email.trim(),
      hasLaptop,
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
                    ? "Claim Your Free Coding Class"
                    : step === 2
                    ? "Select Date & Time"
                    : "Help us customize your experience"}
                </h1>
                <div className="w-6" />
              </div>

              {/* 3-Segment Progress Bar */}
              <div className="flex items-center gap-2.5">
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    step >= 1 ? "bg-[#7C3AED]" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    step >= 2 ? "bg-[#7C3AED]" : "bg-gray-200"
                  }`}
                />
                <div
                  className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                    step >= 3 ? "bg-[#7C3AED]" : "bg-gray-200"
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
                {/* Child's Full Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Child&apos;s Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      placeholder="Enter your child's full name"
                      className="w-full bg-[#F3F6FC]/70 border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] focus:bg-white transition-all font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium pl-1">
                    This will be used on your child&apos;s certificate
                  </p>
                </div>

                {/* Select Child's Grade */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Select Child&apos;s Grade
                    </label>
                    <select
                      value={studentGrade}
                      onChange={(e) => setStudentGrade(e.target.value)}
                      className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 focus:outline-none focus:border-[#7C3AED] appearance-none cursor-pointer font-medium"
                    >
                      {gradeOptions.map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="w-5 h-5 text-gray-700 absolute right-4 top-3.5 pointer-events-none" />
                  </div>
                </div>

                {/* Dial Code & Mobile Number */}
                <div className="space-y-1">
                  <div className="grid grid-cols-12 gap-2.5">
                    {/* Dial Code */}
                    <div className="col-span-5 sm:col-span-4 relative">
                      <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-bold text-gray-500 z-10">
                        Dial Code
                      </label>
                      <select
                        value={dialCode}
                        onChange={(e) => setDialCode(e.target.value)}
                        className="w-full bg-white border border-gray-300 rounded-2xl pl-3 pr-7 py-3 text-xs sm:text-sm font-bold text-gray-900 focus:outline-none focus:border-[#7C3AED] appearance-none cursor-pointer"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-700 absolute right-2.5 top-4 pointer-events-none" />
                    </div>

                    {/* Mobile Number */}
                    <div className="col-span-7 sm:col-span-8 relative">
                      <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter 10-digit mobile number"
                        className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all font-medium"
                      />
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium pl-1">
                    Please share the number that you use for WhatsApp
                  </p>
                </div>

                {/* Parent's Email ID */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Parent&apos;s Email ID
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter parent's email address"
                      className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all font-medium"
                    />
                  </div>
                </div>

                {/* Do you have a Laptop or Desktop? */}
                <div className="space-y-2 pt-1">
                  <label className="block text-xs font-bold text-gray-800">
                    Do you have a Laptop or Desktop?
                  </label>
                  <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="hasLaptop"
                        checked={hasLaptop === true}
                        onChange={() => setHasLaptop(true)}
                        className="w-4 h-4 accent-[#7C3AED] cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-gray-800">Yes</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="radio"
                        name="hasLaptop"
                        checked={hasLaptop === false}
                        onChange={() => setHasLaptop(false)}
                        className="w-4 h-4 accent-[#7C3AED] cursor-pointer"
                      />
                      <span className="text-xs font-semibold text-gray-800">No</span>
                    </label>
                  </div>
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

                  <div className="text-center text-[10px] text-gray-400 space-y-0.5 mt-3 leading-tight">
                    <p>Note: Laptop or desktop is compulsory for this class.</p>
                    <p>
                      By proceeding further, you agree to our{" "}
                      <Link href="/privacy-policy" className="text-[#7C3AED] underline">
                        Terms &amp; Conditions
                      </Link>{" "}
                      and our{" "}
                      <Link href="/privacy-policy" className="text-[#7C3AED] underline">
                        Privacy Policy
                      </Link>
                      .
                    </p>
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
                          className={`py-3 px-2 rounded-2xl border text-center transition-all cursor-pointer ${
                            isSelected
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
                            className={`py-2.5 px-2 rounded-xl border text-center transition-all flex flex-col items-center justify-center ${
                              isBookedOut
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

                  <p className="text-[10px] text-gray-400 text-center font-medium mt-3">
                    Note: Free class will be conducted by reputed teachers.
                  </p>
                </div>
              </form>
            ) : (
              /* SECTION 3 FORM */
              <form onSubmit={handleStep3Submit} className="space-y-5">
                {/* Parent's Full Name */}
                <div className="space-y-1">
                  <div className="relative">
                    <label className="absolute -top-2.5 left-3.5 bg-white px-1.5 text-[11px] font-bold text-gray-500 z-10">
                      Parent&apos;s Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
                      placeholder="Enter parent's full name"
                      className="w-full bg-white border border-gray-300 rounded-2xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-[#7C3AED] transition-all font-medium"
                    />
                  </div>
                  <p className="text-[11px] text-gray-400 font-medium pl-1">
                    This will be used on your child&apos;s certificate
                  </p>
                </div>

                {/* Who are you? */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-800">Who are you?</label>
                  <div className="flex flex-wrap gap-2">
                    {["Parent", "Student", "Guardian"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setWhoAreYou(opt)}
                        className={`px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                          whoAreYou === opt
                            ? "bg-[#7C3AED]/10 border-[#7C3AED] text-[#7C3AED] font-extrabold ring-1 ring-[#7C3AED]"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Why are you booking this demo class? */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-800">
                    Why are you booking this demo class?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["Want to buy course", "Just want the free demo class"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setBookingReason(opt)}
                        className={`px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                          bookingReason === opt
                            ? "bg-[#7C3AED]/10 border-[#7C3AED] text-[#7C3AED] font-extrabold ring-1 ring-[#7C3AED]"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* When are you planning to buy the course? */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-800">
                    When are you planning to buy the course?
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {["After the demo", "This week", "This month", "Just exploring"].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setPurchaseTimeline(opt)}
                        className={`px-4 py-2 rounded-2xl border text-xs font-semibold transition-all cursor-pointer ${
                          purchaseTimeline === opt
                            ? "bg-[#7C3AED]/10 border-[#7C3AED] text-[#7C3AED] font-extrabold ring-1 ring-[#7C3AED]"
                            : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
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
      <footer className="w-full bg-white border-t border-gray-200/80 px-4 py-4 text-center text-xs text-gray-500 z-10">
        © {new Date().getFullYear()} Finquo Junior. All rights reserved.
      </footer>
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
