import { NextResponse } from "next/server";

const getEndpoints = (pathWithQuery: string) => {
  const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
  const localCandidates = !isVercel
    ? [
        `http://127.0.0.1:3000/api/pilot-leads${pathWithQuery}`,
        `http://localhost:3000/api/pilot-leads${pathWithQuery}`,
        `http://127.0.0.1:3002/courses/pilot-leads${pathWithQuery}`,
        `http://localhost:3002/courses/pilot-leads${pathWithQuery}`,
      ]
    : [];

  const remoteCandidates = [
    process.env.BACKEND_URL && !process.env.BACKEND_URL.includes("localhost") && !process.env.BACKEND_URL.includes("127.0.0.1")
      ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads${pathWithQuery}`
      : null,
    process.env.NEXT_PUBLIC_BACKEND_URL && !process.env.NEXT_PUBLIC_BACKEND_URL.includes("localhost") && !process.env.NEXT_PUBLIC_BACKEND_URL.includes("127.0.0.1")
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads${pathWithQuery}`
      : null,
    "https://api.finquo.ai/api/pilot-leads" + pathWithQuery,
  ];

  return [...localCandidates, ...remoteCandidates].filter(Boolean) as string[];
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || "";
  const queryStr = date ? `?date=${encodeURIComponent(date)}` : "";
  const candidateEndpoints = getEndpoints(`/slot-availability${queryStr}`);

  for (const url of candidateEndpoints) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        const resData = await response.json();
        return NextResponse.json(resData);
      }
    } catch {
      // Continue to next candidate
    }
  }

  // Local fallback if offline
  const defaultTimeSlots = [
    "12:00 AM", "01:00 AM", "02:00 AM", "03:00 AM", "04:00 AM", "05:00 AM",
    "06:00 AM", "07:00 AM", "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM",
    "12:00 PM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
    "06:00 PM", "07:00 PM", "08:00 PM", "09:00 PM", "10:00 PM", "11:00 PM",
  ];

  return NextResponse.json({
    success: true,
    data: {
      demoTeachersCount: 3,
      hiddenSlots: [],
      date: date || null,
      slots: defaultTimeSlots.map((time) => ({
        time,
        bookedCount: 0,
        maxCapacity: 3,
        remainingSeats: 3,
        isBookedOut: false,
      })),
    },
  });
}
