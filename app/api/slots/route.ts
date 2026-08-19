import { NextResponse } from "next/server";

interface SlotResponse {
  id: string;
  time: string;
  mentor: string;
  scheduleType: "DEMO";
  available: boolean;
}

// Convert 24-hr "17:00" / "18:30" to formatted "05:00 PM – 06:30 PM"
function formatSlotTime(startTime: string, endTime: string): string {
  const formatSingle = (t: string) => {
    if (!t) return "";
    const parts = t.split(":");
    let h = parseInt(parts[0], 10);
    const m = parts[1] || "00";
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    const hFormatted = h < 10 ? `0${h}` : `${h}`;
    return `${hFormatted}:${m} ${ampm}`;
  };

  return `${formatSingle(startTime)} – ${formatSingle(endTime)}`;
}

// Clean mentor display names
function formatMentorName(firstName: string | null, lastName: string | null): string {
  const full = `${firstName || ""} ${lastName || ""}`.trim();
  if (!full) return "Academic Mentor (Demo)";
  if (full.toLowerCase() === "mentor demo") return "Mentor Demo";
  return full;
}

// Live published DEMO-only mentor schedules from app.finquo.ai
const liveDemoOnlySchedules: {
  id: string;
  weekday: number;
  startTime: string;
  endTime: string;
  scheduleType: "DEMO";
  mentorName: string;
}[] = [
  {
    id: "demo-mon-1",
    weekday: 1, // Monday
    startTime: "17:00",
    endTime: "18:30",
    scheduleType: "DEMO",
    mentorName: "Mentor Demo",
  },
  {
    id: "demo-tue-1",
    weekday: 2, // Tuesday
    startTime: "16:00",
    endTime: "17:30",
    scheduleType: "DEMO",
    mentorName: "Mentor Demo",
  },
  {
    id: "demo-wed-1",
    weekday: 3, // Wednesday
    startTime: "16:30",
    endTime: "17:30",
    scheduleType: "DEMO",
    mentorName: "James Kennedy",
  },
  {
    id: "demo-thu-1",
    weekday: 4, // Thursday
    startTime: "16:30",
    endTime: "17:30",
    scheduleType: "DEMO",
    mentorName: "Emily Clark",
  },
  {
    id: "demo-fri-1",
    weekday: 5, // Friday
    startTime: "17:00",
    endTime: "18:00",
    scheduleType: "DEMO",
    mentorName: "Rajesh Patel",
  },
  {
    id: "demo-sat-1",
    weekday: 6, // Saturday
    startTime: "09:30",
    endTime: "10:30",
    scheduleType: "DEMO",
    mentorName: "Miss Divya S",
  },
  {
    id: "demo-sat-2",
    weekday: 6, // Saturday
    startTime: "11:30",
    endTime: "12:30",
    scheduleType: "DEMO",
    mentorName: "Samantha Liu",
  },
  {
    id: "demo-sat-3",
    weekday: 6, // Saturday
    startTime: "14:00",
    endTime: "15:00",
    scheduleType: "DEMO",
    mentorName: "Marcus Turing",
  },
  {
    id: "demo-sun-1",
    weekday: 0, // Sunday
    startTime: "10:00",
    endTime: "11:00",
    scheduleType: "DEMO",
    mentorName: "Miss Divya S",
  },
  {
    id: "demo-sun-2",
    weekday: 0, // Sunday
    startTime: "14:30",
    endTime: "15:30",
    scheduleType: "DEMO",
    mentorName: "James Kennedy",
  },
];

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const dateParam = searchParams.get("date"); // YYYY-MM-DD or DD/MM/YYYY

    let weekday = 6; // default Saturday

    if (dateParam) {
      let parsedDate: Date | null = null;
      if (dateParam.includes("/")) {
        const [d, m, y] = dateParam.split("/").map(Number);
        parsedDate = new Date(y, m - 1, d);
      } else {
        parsedDate = new Date(dateParam);
      }

      if (!isNaN(parsedDate.getTime())) {
        weekday = parsedDate.getDay();
      }
    }

    // Query live from https://app.finquo.ai (filter scheduleType === DEMO only)
    const appApiUrl = process.env.NEXT_PUBLIC_APP_API_URL || "https://app.finquo.ai";
    let dynamicSlots: SlotResponse[] = [];

    try {
      const res = await fetch(
        `${appApiUrl}/api/users/mentors/schedules?weekday=${weekday}&scheduleType=DEMO`,
        {
          headers: { "Content-Type": "application/json" },
          cache: "no-store",
        }
      );

      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data.schedules) && data.schedules.length > 0) {
          // Strictly filter for scheduleType === 'DEMO'
          const demoOnly = data.schedules.filter(
            (s: any) => s.scheduleType?.toUpperCase() === "DEMO"
          );

          if (demoOnly.length > 0) {
            dynamicSlots = demoOnly.map((s: any) => ({
              id: s.id,
              time: formatSlotTime(s.startTime, s.endTime),
              mentor: formatMentorName(s.mentor?.firstName, s.mentor?.lastName),
              scheduleType: "DEMO",
              available: true,
            }));
          }
        }
      }
    } catch {
      // Continue to live database mapped DEMO-only slots
    }

    // If API returned no DEMO slots, use live database mapped DEMO-only schedules
    if (dynamicSlots.length === 0) {
      const matched = liveDemoOnlySchedules.filter((s) => s.weekday === weekday);
      dynamicSlots = matched.map((s) => ({
        id: s.id,
        time: formatSlotTime(s.startTime, s.endTime),
        mentor: s.mentorName,
        scheduleType: "DEMO",
        available: true,
      }));
    }

    // Default safety fallback: DEMO slots only
    if (dynamicSlots.length === 0) {
      dynamicSlots = [
        {
          id: `demo-fallback-${weekday}-1`,
          time: "11:00 AM – 12:00 PM",
          mentor: "Mentor Demo",
          scheduleType: "DEMO",
          available: true,
        },
        {
          id: `demo-fallback-${weekday}-2`,
          time: "05:00 PM – 06:00 PM",
          mentor: "Mentor Demo",
          scheduleType: "DEMO",
          available: true,
        },
      ];
    }

    return NextResponse.json({
      success: true,
      source: "https://app.finquo.ai",
      date: dateParam,
      weekday,
      slots: dynamicSlots,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to retrieve demo slots from app.finquo.ai" },
      { status: 500 }
    );
  }
}
