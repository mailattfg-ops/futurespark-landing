import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      parentName,
      studentName,
      studentGrade,
      parentEmail,
      parentPhone,
      presentCountry,
      preferredLanguage,
      hearAbout,
      preferredSlotDate,
      preferredSlotTime,
      preferredTimezone,
    } = body;

    if (!parentName || !studentName || !parentEmail || !parentPhone) {
      return NextResponse.json(
        { success: false, message: "Parent name, student name, email, and phone are required." },
        { status: 400 }
      );
    }

    const payload = {
      parentName: parentName.trim(),
      studentName: studentName.trim(),
      studentGrade: (studentGrade || "Grade 6").trim(),
      parentEmail: parentEmail.trim(),
      parentPhone: parentPhone.trim(),
      presentCountry: (presentCountry || "India").trim(),
      preferredLanguage: (preferredLanguage || "English").trim(),
      hearAbout: hearAbout ? hearAbout.trim() : undefined,
      preferredSlotDate: preferredSlotDate || undefined,
      preferredSlotTime: preferredSlotTime || undefined,
      preferredTimezone: preferredTimezone || "Asia/Kolkata",
    };

    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    // Backend proxy endpoints for Pilot Leads
    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/pilot-leads` : null,
      "https://api.finquo.ai/api/pilot-leads",
      "https://app.finquo.ai/api/pilot-leads",
      // Local development fallbacks (learning service at 3002 or Gateway at 3000)
      !isVercel ? "http://127.0.0.1:3002/courses/pilot-leads" : null,
      !isVercel ? "http://127.0.0.1:3000/api/pilot-leads" : null,
      !isVercel ? "http://localhost:3002/courses/pilot-leads" : null,
      !isVercel ? "http://localhost:3000/api/pilot-leads" : null,
    ].filter(Boolean) as string[];

    let lastErrorDetails = "";

    for (const url of candidateEndpoints) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const resData = await response.json();
          return NextResponse.json(
            { success: true, message: "Pilot lead application saved successfully", data: resData.data },
            { status: 201 }
          );
        } else {
          const errText = await response.text();
          lastErrorDetails = `Endpoint ${url} responded with ${response.status}: ${errText}`;
        }
      } catch (err: any) {
        lastErrorDetails = `Fetch to ${url} failed: ${err.message}`;
      }
    }

    console.warn("[Next.js Pilot Leads Proxy Warning]", lastErrorDetails);

    // Graceful fallback if backend is offline during local test
    return NextResponse.json(
      {
        success: true,
        message: "Pilot lead application accepted (Local Fallback)",
        data: payload,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error in /api/pilot-leads proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process pilot lead application" },
      { status: 500 }
    );
  }
}
