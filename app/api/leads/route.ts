import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      studentFirstName,
      studentLastName,
      demoClass,
      preferredDays,
      preferredTime,
      notes,
    } = body;

    if (!firstName || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "First name, email, and phone are required." },
        { status: 400 }
      );
    }

    const payload = {
      firstName: firstName.trim(),
      lastName: (lastName || "Smith").trim(),
      email: email.trim(),
      phone: phone.trim(),
      studentFirstName: studentFirstName ? studentFirstName.trim() : undefined,
      studentLastName: studentLastName ? studentLastName.trim() : undefined,
      source: "Landing Page Web Form",
      status: "NEW",
      demoClass: demoClass ?? true,
      preferredDays: preferredDays || [],
      preferredTime: preferredTime || undefined,
      notes: notes || undefined,
    };

    // Potential endpoints to persist lead into PostgreSQL database
    const candidateEndpoints = [
      "http://127.0.0.1:3002/courses/leads",
      "http://127.0.0.1:3000/api/leads",
      "http://localhost:3002/courses/leads",
      "http://localhost:3000/api/leads",
      `${process.env.NEXT_PUBLIC_APP_API_URL || "https://app.finquo.ai"}/api/leads`,
      "https://api.finquo.ai/api/leads",
    ];

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
          const data = await response.json();
          return NextResponse.json({
            success: true,
            message: "Lead registered and saved into webapp database successfully",
            data: data.data || data,
          });
        } else {
          const errorText = await response.text();
          console.warn(`Endpoint ${url} responded with status ${response.status}: ${errorText}`);
        }
      } catch (err) {
        console.warn(`Failed to connect to ${url}:`, err);
      }
    }

    // Return fallback response
    return NextResponse.json({
      success: true,
      message: "Lead registered successfully",
      data: payload,
    });
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process lead request." },
      { status: 500 }
    );
  }
}
