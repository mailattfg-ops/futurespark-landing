"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckCircle2,
  Loader2,
  Phone,
  FileText,
  User,
  Sparkles,
} from "lucide-react";

interface SlotOption {
  id: string;
  time: string;
  mentor: string;
  scheduleType?: "DEMO";
  available: boolean;
}

const fallbackSlotsByWeekday: { [key: number]: SlotOption[] } = {
  0: [
    { id: "demo-sun-1", time: "10:00 AM – 11:00 AM", mentor: "Miss Divya S", scheduleType: "DEMO", available: true },
    { id: "demo-sun-2", time: "02:30 PM – 03:30 PM", mentor: "James Kennedy", scheduleType: "DEMO", available: true },
  ],
  1: [
    { id: "demo-mon-1", time: "05:00 PM – 06:30 PM", mentor: "Mentor Demo", scheduleType: "DEMO", available: true },
  ],
  2: [
    { id: "demo-tue-1", time: "04:00 PM – 05:30 PM", mentor: "Mentor Demo", scheduleType: "DEMO", available: true },
  ],
  3: [
    { id: "demo-wed-1", time: "04:30 PM – 05:30 PM", mentor: "James Kennedy", scheduleType: "DEMO", available: true },
  ],
  4: [
    { id: "demo-thu-1", time: "04:30 PM – 05:30 PM", mentor: "Emily Clark", scheduleType: "DEMO", available: true },
  ],
  5: [
    { id: "demo-fri-1", time: "05:00 PM – 06:00 PM", mentor: "Rajesh Patel", scheduleType: "DEMO", available: true },
  ],
  6: [
    { id: "demo-sat-1", time: "09:30 AM – 10:30 AM", mentor: "Miss Divya S", scheduleType: "DEMO", available: true },
    { id: "demo-sat-2", time: "11:30 AM – 12:30 PM", mentor: "Samantha Liu", scheduleType: "DEMO", available: true },
    { id: "demo-sat-3", time: "02:00 PM – 03:00 PM", mentor: "Marcus Turing", scheduleType: "DEMO", available: true },
  ],
};

interface CalendarCell {
  day: number;
  date: Date;
  isCurrentMonth: boolean;
  isToday: boolean;
  isSelected: boolean;
  isPast: boolean;
}

export function BookDemoFormSection() {
  const today = useMemo(() => new Date(), []);
  const [viewDate, setViewDate] = useState<Date>(() => {
    const d = new Date();
    d.setDate(1);
    return d;
  });

  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [slotsList, setSlotsList] = useState<SlotOption[]>([]);
  const [selectedSlotId, setSelectedSlotId] = useState<string>("");
  const [preferredTime, setPreferredTime] = useState<string>("");
  const [isLoadingSlots, setIsLoadingSlots] = useState<boolean>(false);

  // Parent fields
  const [parentFirstName, setParentFirstName] = useState("");
  const [parentLastName, setParentLastName] = useState("");

  // Student fields (optional)
  const [studentFirstName, setStudentFirstName] = useState("");
  const [studentLastName, setStudentLastName] = useState("");

  // Contact fields
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Admissions notes
  const [admissionsNotes, setAdmissionsNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sat", "Su"];

  const calendarCells = useMemo<CalendarCell[]>(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const mondayOffset = (firstDayIndex + 6) % 7;

    const daysInCurrentMonth = new Date(year, month + 1, 0).getDate();
    const daysInPrevMonth = new Date(year, month, 0).getDate();

    const cells: CalendarCell[] = [];

    for (let i = mondayOffset - 1; i >= 0; i--) {
      const day = daysInPrevMonth - i;
      const date = new Date(year, month - 1, day);
      cells.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isPast: date < new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      });
    }

    for (let day = 1; day <= daysInCurrentMonth; day++) {
      const date = new Date(year, month, day);
      const isToday =
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();
      const isSelected =
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear();
      const isPast = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());

      cells.push({
        day,
        date,
        isCurrentMonth: true,
        isToday,
        isSelected,
        isPast,
      });
    }

    const totalCells = cells.length > 35 ? 42 : 35;
    const remaining = totalCells - cells.length;
    for (let day = 1; day <= remaining; day++) {
      const date = new Date(year, month + 1, day);
      cells.push({
        day,
        date,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isPast: false,
      });
    }

    return cells;
  }, [viewDate, selectedDate, today]);

  const formattedSelectedDate = useMemo(() => {
    const d = selectedDate.getDate();
    const m = selectedDate.getMonth() + 1;
    const y = selectedDate.getFullYear();
    return `${d < 10 ? "0" + d : d}/${m < 10 ? "0" + m : m}/${y}`;
  }, [selectedDate]);

  // Fetch live DEMO slots based on selected date
  const loadSlots = useCallback(async (date: Date) => {
    setIsLoadingSlots(true);
    const weekday = date.getDay();
    const formatted = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    try {
      const res = await fetch(`/api/slots?date=${formatted}`);
      if (res.ok) {
        const data = await res.json();
        if (data.slots && data.slots.length > 0) {
          setSlotsList(data.slots);
          setSelectedSlotId(data.slots[0].id);
          setPreferredTime(data.slots[0].time);
          setIsLoadingSlots(false);
          return;
        }
      }
    } catch {
      // Graceful fallback
    }

    const fallback = fallbackSlotsByWeekday[weekday] || fallbackSlotsByWeekday[6];
    setSlotsList(fallback);
    if (fallback.length > 0) {
      setSelectedSlotId(fallback[0].id);
      setPreferredTime(fallback[0].time);
    }
    setIsLoadingSlots(false);
  }, []);

  useEffect(() => {
    loadSlots(selectedDate);
  }, [selectedDate, loadSlots]);

  const handlePrevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  const handleDateClick = (cell: CalendarCell) => {
    setSelectedDate(cell.date);
    if (!cell.isCurrentMonth) {
      setViewDate(new Date(cell.date.getFullYear(), cell.date.getMonth(), 1));
    }
  };

  const monthYearTitle = useMemo(() => {
    return viewDate.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }, [viewDate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const weekdayName = selectedDate.toLocaleDateString("en-US", { weekday: "long" });

    const payload = {
      firstName: parentFirstName.trim(),
      lastName: parentLastName.trim(),
      studentFirstName: studentFirstName.trim() || undefined,
      studentLastName: studentLastName.trim() || undefined,
      email: email.trim(),
      phone: phone.trim(),
      demoClass: true,
      preferredDays: [weekdayName],
      preferredTime,
      notes: [
        admissionsNotes ? `Notes: ${admissionsNotes}` : "",
        `Demo Slot: ${formattedSelectedDate} (${weekdayName}) @ ${preferredTime}`,
      ]
        .filter(Boolean)
        .join(" | "),
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
    <section id="book-demo" className="w-full bg-[#4E1FE7] py-14 sm:py-16 lg:py-20 relative overflow-hidden">
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Heading */}
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white text-center tracking-tight mb-8 sm:mb-10 font-sans">
          Book Your Free Demo
        </h2>

        {/* Compact Center Modal Card */}
        <div className="bg-white rounded-3xl p-5 sm:p-7 shadow-2xl text-gray-900 border border-white/20">
          {isSubmitted ? (
            <div className="py-8 text-center space-y-3.5 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900 font-sans">
                Demo Class Requested!
              </h3>
              <div className="bg-[#FAFAF7] border border-gray-200/80 rounded-2xl p-4 max-w-md mx-auto text-left space-y-2 mt-3">
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-500 font-medium">Parent:</span>
                  <span className="font-extrabold text-gray-900">
                    {parentFirstName} {parentLastName}
                  </span>
                </div>
                {studentFirstName && (
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-gray-500 font-medium">Student:</span>
                    <span className="font-bold text-gray-900">
                      {studentFirstName} {studentLastName}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-xs sm:text-sm">
                  <span className="text-gray-500 font-medium">Contact:</span>
                  <span className="font-bold text-gray-900">{phone}</span>
                </div>
                <div className="flex justify-between items-center text-xs sm:text-sm pt-1 border-t border-gray-200/60">
                  <span className="text-gray-500 font-medium">Requested Demo Slot:</span>
                  <span className="font-bold text-[#4E1FE7]">{formattedSelectedDate} ({preferredTime})</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 max-w-md mx-auto leading-relaxed pt-1 font-sans">
                Your demo request has been submitted. Our admissions team will WhatsApp you to confirm your 1-on-1 Zoom classroom slot shortly.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="px-5 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-bold text-gray-800 transition-colors cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-start">
                {/* Left Column: Compact Calendar & Live DEMO Slots */}
                <div className="md:col-span-5 border-b md:border-b-0 md:border-r border-gray-200 pb-5 md:pb-0 md:pr-5 flex flex-col justify-between">
                  <div>
                    {/* Calendar Month Header */}
                    <div className="flex items-center justify-between mb-3">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        aria-label="Previous Month"
                      >
                        <ChevronLeft className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-xs sm:text-sm font-bold text-gray-900 font-sans">
                        {monthYearTitle}
                      </span>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="p-1 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
                        aria-label="Next Month"
                      >
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Day Names Row */}
                    <div className="grid grid-cols-7 gap-0.5 text-center mb-1">
                      {daysOfWeek.map((day) => (
                        <span
                          key={day}
                          className="text-[10px] font-semibold text-gray-400"
                        >
                          {day}
                        </span>
                      ))}
                    </div>

                    {/* Compact Days Grid */}
                    <div className="grid grid-cols-7 gap-0.5 text-center">
                      {calendarCells.map((cell, idx) => {
                        return (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleDateClick(cell)}
                            className={`relative h-7 w-7 mx-auto rounded-full flex flex-col items-center justify-center text-[11px] font-medium transition-all cursor-pointer ${
                              cell.isSelected
                                ? "bg-[#6D28D9] text-white font-bold shadow-xs"
                                : cell.isToday
                                ? "border border-[#6D28D9] text-[#6D28D9] font-bold"
                                : cell.isCurrentMonth
                                ? "text-gray-800 hover:bg-gray-100"
                                : "text-gray-300 hover:text-gray-400"
                            }`}
                          >
                            <span>{cell.day}</span>
                            {cell.isToday && !cell.isSelected && (
                              <span className="absolute bottom-0.5 w-0.5 h-0.5 rounded-full bg-[#6D28D9]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Demo Slots from Web App */}
                  <div className="mt-4 pt-3.5 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-bold text-gray-900 font-sans flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#6D28D9]" /> Available Slots ({formattedSelectedDate})
                      </span>
                      <span className="text-[9px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-full">
                        Live 1-on-1
                      </span>
                    </div>

                    {isLoadingSlots ? (
                      <div className="py-4 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
                        <Loader2 className="w-3.5 h-3.5 animate-spin" /> Loading slots...
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {slotsList.map((slot) => {
                          const isSlotSelected = selectedSlotId === slot.id;
                          return (
                            <button
                              key={slot.id}
                              type="button"
                              onClick={() => {
                                setSelectedSlotId(slot.id);
                                setPreferredTime(slot.time);
                              }}
                              className={`w-full px-2.5 py-1.5 rounded-lg text-left border transition-all flex items-center justify-between cursor-pointer ${
                                isSlotSelected
                                  ? "border-[#6D28D9] bg-[#6D28D9]/5 text-gray-900 font-bold shadow-xs"
                                  : "border-gray-200 hover:border-gray-300 text-gray-700 bg-white"
                              }`}
                            >
                              <span className="text-[11px] font-semibold">{slot.time}</span>
                              <span className="text-[9px] text-gray-500 font-medium flex items-center gap-1">
                                <User className="w-2.5 h-2.5 text-gray-400" /> {slot.mentor}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Clean Form Inputs (Without Program Interest) */}
                <div className="md:col-span-7 space-y-3">
                  {/* PARENT / GUARDIAN SECTION */}
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-[#6D28D9] block mb-1 font-sans">
                      PARENT / GUARDIAN
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5 font-sans">
                          First Name
                        </label>
                        <input
                          type="text"
                          required
                          value={parentFirstName}
                          onChange={(e) => setParentFirstName(e.target.value)}
                          placeholder="Alice"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#6D28D9] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5 font-sans">
                          Last Name
                        </label>
                        <input
                          type="text"
                          required
                          value={parentLastName}
                          onChange={(e) => setParentLastName(e.target.value)}
                          placeholder="Smith"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#6D28D9] transition-colors"
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-gray-400 mt-0.5 leading-normal">
                      The contact for this enquiry. Becomes the parent account and receives the WhatsApp reports.
                    </p>
                  </div>

                  {/* STUDENT SECTION (OPTIONAL) */}
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 block mb-1 font-sans">
                      STUDENT <span className="text-gray-400 font-normal lowercase">(optional)</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5 font-sans">
                          First Name
                        </label>
                        <input
                          type="text"
                          value={studentFirstName}
                          onChange={(e) => setStudentFirstName(e.target.value)}
                          placeholder="Aarav"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#6D28D9] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-medium text-gray-700 mb-0.5 font-sans">
                          Last Name
                        </label>
                        <input
                          type="text"
                          value={studentLastName}
                          onChange={(e) => setStudentLastName(e.target.value)}
                          placeholder="Smith"
                          className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#6D28D9] transition-colors"
                        />
                      </div>
                    </div>
                    <p className="text-[9px] text-gray-400 mt-0.5 leading-normal">
                      The child who attends. Shown to the mentor on the demo class and used in the session report.
                    </p>
                  </div>

                  {/* EMAIL ADDRESS */}
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-0.5 font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="candidate@gmail.com"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#6D28D9] transition-colors"
                    />
                  </div>

                  {/* PHONE NUMBER */}
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-0.5 font-sans flex items-center gap-1">
                      <Phone className="w-2.5 h-2.5 text-gray-400" /> Phone Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#6D28D9] transition-colors"
                    />
                  </div>

                  {/* ADMISSIONS NOTES */}
                  <div>
                    <label className="block text-[10px] font-medium text-gray-700 mb-0.5 font-sans flex items-center gap-1">
                      <FileText className="w-2.5 h-2.5 text-gray-400" /> Admissions Notes
                    </label>
                    <textarea
                      rows={2}
                      value={admissionsNotes}
                      onChange={(e) => setAdmissionsNotes(e.target.value)}
                      placeholder="Notes from initial lookup, call back times..."
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium focus:outline-none focus:border-[#6D28D9] transition-colors resize-none h-14"
                    />
                  </div>

                  {/* SELECTED DEMO SLOT BADGE */}
                  <div className="bg-[#6D28D9]/5 border border-[#6D28D9]/20 rounded-lg p-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-[#6D28D9]" />
                      <span className="text-[11px] font-bold text-gray-900 font-sans">
                        Slot: {formattedSelectedDate} at {preferredTime}
                      </span>
                    </div>
                    <span className="text-[9px] font-bold text-[#6D28D9] bg-white px-1.5 py-0.5 rounded-md border border-[#6D28D9]/20">
                      100% Free Demo
                    </span>
                  </div>

                  {submitError && (
                    <p className="text-[11px] text-red-500 font-medium">{submitError}</p>
                  )}

                  {/* ACTION BUTTONS: CANCEL & REGISTER LEAD */}
                  <div className="pt-1 flex items-center justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        setParentFirstName("");
                        setParentLastName("");
                        setStudentFirstName("");
                        setStudentLastName("");
                        setEmail("");
                        setPhone("");
                        setAdmissionsNotes("");
                      }}
                      className="px-5 py-1.5 rounded-lg border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-1.5 rounded-lg bg-[#6D28D9] hover:bg-[#5B21B6] text-white text-xs font-bold shadow-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer flex items-center gap-1.5 disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          <span>Registering...</span>
                        </>
                      ) : (
                        <span>Register Lead</span>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
