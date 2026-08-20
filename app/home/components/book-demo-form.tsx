"use client";

import { useState, useMemo } from "react";
import {
  ChevronLeft,
  Calendar as CalendarIcon,
  CheckCircle2,
  Loader2,
  Globe,
  Sparkles,
  ArrowRight,
  Clock,
} from "lucide-react";

interface SlotOption {
  id: string;
  time: string;
  mentor: string;
}

const countryCodes = [
  { code: "+91", flag: "🇮🇳", label: "India (+91)" },
  { code: "+1", flag: "🇺🇸", label: "USA (+1)" },
  { code: "+44", flag: "🇬🇧", label: "UK (+44)" },
  { code: "+971", flag: "🇦🇪", label: "UAE (+971)" },
  { code: "+65", flag: "🇸🇬", label: "Singapore (+65)" },
  { code: "+61", flag: "🇦🇺", label: "Australia (+61)" },
];

const courseOptions = [
  "Financial Literacy & Money Sense",
  "Junior Enterprise & Leadership",
  "FinTech & Critical Thinking",
];

const defaultTimeSlots: SlotOption[] = [
  { id: "slot-1", time: "04:30 PM - 05:30 PM", mentor: "Emily Clark" },
  { id: "slot-2", time: "06:00 PM - 07:00 PM", mentor: "Miss Divya S" },
  { id: "slot-3", time: "10:00 AM - 11:00 AM", mentor: "James Kennedy" },
  { id: "slot-4", time: "02:30 PM - 03:30 PM", mentor: "Samantha Liu" },
];

export function BookDemoFormSection() {
  const [step, setStep] = useState<1 | 2>(1);

  // Step 1 Form Fields
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [childName, setChildName] = useState("");
  const [course, setCourse] = useState(courseOptions[0]);

  // Step 2 Form Fields
  const [selectedDateIndex, setSelectedDateIndex] = useState<number>(0);
  const [selectedSlotTime, setSelectedSlotTime] = useState<string>("04:30 PM - 05:30 PM");

  // Form State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Dynamic Date Cards (Tomorrow, Day 2, Day 3)
  const dateOptions = useMemo(() => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);

      const dayName = i === 1 ? "Tomorrow" : d.toLocaleDateString("en-US", { weekday: "short" });
      const dayDate = `${d.getDate()} ${d.toLocaleDateString("en-US", { month: "short" })}`;
      const fullDateStr = `${d.getDate() < 10 ? "0" + d.getDate() : d.getDate()}/${
        d.getMonth() + 1 < 10 ? "0" + (d.getMonth() + 1) : d.getMonth() + 1
      }/${d.getFullYear()}`;
      const weekdayName = d.toLocaleDateString("en-US", { weekday: "long" });

      dates.push({
        dayName,
        dayDate,
        fullDateStr,
        weekdayName,
        rawDate: d,
      });
    }

    return dates;
  }, []);

  const selectedDateObj = dateOptions[selectedDateIndex] || dateOptions[0];

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim() || !email.trim() || !childName.trim()) {
      setSubmitError("Please fill in all required fields.");
      return;
    }
    setSubmitError(null);
    setStep(2);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError(null);

    const fullPhone = `${countryCode} ${phone.trim()}`;
    const nameParts = childName.trim().split(" ");
    const firstName = nameParts[0] || childName.trim();
    const lastName = nameParts.slice(1).join(" ") || "Student";

    const payload = {
      firstName,
      lastName,
      studentFirstName: firstName,
      studentLastName: lastName,
      email: email.trim(),
      phone: fullPhone,
      demoClass: true,
      preferredDays: [selectedDateObj.weekdayName],
      preferredTime: selectedSlotTime,
      notes: [
        `Course: ${course}`,
        `Demo Slot: ${selectedDateObj.fullDateStr} (${selectedDateObj.weekdayName}) @ ${selectedSlotTime}`,
      ].join(" | "),
    };

    try {
      const response = await fetch("/api/leads", {
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

  return (
    <section id="book-demo" className="w-full bg-[#4E1FE7] py-14 sm:py-18 lg:py-20 relative overflow-hidden font-sans">
      <div className="w-full max-w-xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Main 2-Step Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl text-gray-900 border border-gray-100 relative">
          {/* Top Progress Bar */}
          <div className="w-full flex items-center gap-2 mb-6">
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                step >= 1 ? "bg-[#7C3AED]" : "bg-gray-200"
              }`}
            />
            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                step === 2 ? "bg-[#7C3AED]" : "bg-gray-200"
              }`}
            />
          </div>

          {isSubmitted ? (
            /* Confirmation State */
            <div className="py-8 text-center space-y-4 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h3 className="text-2xl font-black text-gray-900 font-sans tracking-tight">
                Trial Class Reserved!
              </h3>
              <div className="bg-[#FBF9FE] border border-purple-100 rounded-2xl p-5 text-left space-y-2.5 max-w-md mx-auto text-sm">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Student Name:</span>
                  <span className="font-bold text-gray-900">{childName}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Course:</span>
                  <span className="font-bold text-[#7C3AED]">{course}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>WhatsApp Contact:</span>
                  <span className="font-bold text-gray-900">{countryCode} {phone}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600 pt-2 border-t border-purple-100">
                  <span>Scheduled Slot:</span>
                  <span className="font-extrabold text-[#7C3AED]">
                    {selectedDateObj.dayName} ({selectedDateObj.dayDate}) @ {selectedSlotTime}
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">
                We have sent your confirmation link via WhatsApp. Your mentor will be waiting in the 1-on-1 virtual classroom!
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setStep(1);
                  setPhone("");
                  setEmail("");
                  setChildName("");
                }}
                className="px-6 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
              >
                Book Another Trial Class
              </button>
            </div>
          ) : step === 1 ? (
            /* STEP 1: Book Now & Get Certified */
            <form onSubmit={handleStep1Submit} className="space-y-5">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-black text-gray-900 tracking-tight font-sans">
                  Book Now & Get Certified
                </h3>
              </div>

              {/* Mobile Number with Country Code */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-12 gap-3">
                  <div className="col-span-4">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Country
                    </label>
                    <div className="relative">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="w-full bg-white border border-gray-200 rounded-xl px-3 py-3 text-sm font-semibold text-gray-900 focus:border-[#7C3AED] focus:outline-none cursor-pointer appearance-none"
                      >
                        {countryCodes.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.flag} {c.code}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="col-span-8">
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Enter Mobile Number"
                      className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none transition-colors font-sans"
                    />
                  </div>
                </div>
                <p className="text-[11px] text-gray-400 font-normal">
                  Please share the number that you use for WhatsApp
                </p>
              </div>

              {/* Email ID */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  Email ID
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Type here"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none transition-colors font-sans"
                />
              </div>

              {/* Child's Name */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  Child&apos;s Name
                </label>
                <input
                  type="text"
                  required
                  value={childName}
                  onChange={(e) => setChildName(e.target.value)}
                  placeholder="Enter child name"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:border-[#7C3AED] focus:outline-none transition-colors font-sans"
                />
              </div>

              {/* Course Selector */}
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-700">
                  Course
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-900 font-medium focus:border-[#7C3AED] focus:outline-none cursor-pointer"
                >
                  {courseOptions.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {submitError && (
                <p className="text-xs text-red-500 font-medium pt-1">{submitError}</p>
              )}

              {/* Step 1 Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#9333EA] hover:bg-[#7E22CE] text-white font-extrabold text-base shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2"
                >
                  <CalendarIcon className="w-5 h-5" /> Book a Free Trial Class
                </button>
                <p className="text-[11px] text-gray-400 text-center font-medium mt-2.5">
                  Note: Laptop or desktop is compulsory for this class
                </p>
              </div>
            </form>
          ) : (
            /* STEP 2: Select Date & Time */
            <div className="space-y-6">
              {/* Header with Back Button */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="p-2 rounded-xl bg-purple-50 text-[#7C3AED] hover:bg-purple-100 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-2xl font-black text-gray-900 tracking-tight font-sans">
                  Select Date & Time
                </h3>
              </div>

              {/* Date & Time Zone Header */}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-gray-900">Select Date</h4>
                  <p className="text-xs text-gray-400">(Your class will be for 60 minutes)</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600 font-semibold bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200/80">
                  <Globe className="w-3.5 h-3.5 text-indigo-600" />
                  Asia/Kolkata
                </div>
              </div>

              {/* 3 Quick Date Cards (Tomorrow, Sat, Sun) */}
              <div className="grid grid-cols-3 gap-3">
                {dateOptions.map((opt, idx) => {
                  const isSelected = selectedDateIndex === idx;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDateIndex(idx)}
                      className={`p-3.5 rounded-2xl border text-center transition-all cursor-pointer ${
                        isSelected
                          ? "border-[#7C3AED] bg-purple-50/60 shadow-xs ring-2 ring-[#7C3AED]/20"
                          : "border-gray-200 hover:border-gray-300 bg-white"
                      }`}
                    >
                      <span className="block text-sm font-bold text-gray-900">
                        {opt.dayName}
                      </span>
                      <span className="block text-xs text-gray-500 font-medium mt-0.5">
                        {opt.dayDate}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Select Time Slot */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#7C3AED]" /> Available Time Slots
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {defaultTimeSlots.map((slot) => {
                    const isSelected = selectedSlotTime === slot.time;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotTime(slot.time)}
                        className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? "border-[#7C3AED] bg-[#7C3AED]/10 text-gray-900 font-extrabold shadow-xs"
                            : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                        }`}
                      >
                        <span className="text-xs font-bold">{slot.time}</span>
                        <span className="text-[10px] text-gray-400 font-medium">
                          1-on-1
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {submitError && (
                <p className="text-xs text-red-500 font-medium">{submitError}</p>
              )}

              {/* Step 2 Action Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-2xl bg-[#9333EA] hover:bg-[#7E22CE] text-white font-extrabold text-base shadow-lg shadow-purple-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Confirming Slot...</span>
                    </>
                  ) : (
                    <span>Confirm Your Time Slot</span>
                  )}
                </button>
                <p className="text-[11px] text-gray-400 text-center font-medium mt-2.5">
                  Note: Laptop or desktop is compulsory for this class
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
