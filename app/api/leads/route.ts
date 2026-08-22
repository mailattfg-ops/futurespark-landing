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
      lastName: (lastName || "").trim(),
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

    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    // Endpoints to persist lead into PostgreSQL database
    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/leads` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/leads` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/leads` : null,
      "https://api.finquo.ai/api/leads",
      "https://app.finquo.ai/api/leads",
      // Local development fallbacks (only attempted when NOT in Vercel cloud)
      !isVercel ? "http://127.0.0.1:3002/courses/leads" : null,
      !isVercel ? "http://127.0.0.1:3000/api/leads" : null,
      !isVercel ? "http://localhost:3002/courses/leads" : null,
      !isVercel ? "http://localhost:3000/api/leads" : null,
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
          const data = await response.json();
          return NextResponse.json({
            success: true,
            message: "Lead registered and saved into webapp database successfully",
            data: data.data || data,
          });
        } else {
          const errorText = await response.text();
          lastErrorDetails = `Endpoint ${url} responded with status ${response.status}: ${errorText}`;
          console.warn(lastErrorDetails);
        }
      } catch (err: any) {
        lastErrorDetails = `Failed to connect to ${url}: ${err?.message || err}`;
        console.warn(lastErrorDetails);
      }
    }

    const helpMsg = isVercel
      ? "Please add BACKEND_URL in Vercel Settings -> Environment Variables pointing to your backend gateway URL."
      : "Ensure backend microservices (gateway on 3000 or learning-service on 3002) are running locally.";

    return NextResponse.json(
      {
        success: false,
        message: `Failed to save lead to backend database. ${helpMsg} Details: ${lastErrorDetails}`,
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process lead request." },
      { status: 500 }
    );
  }
}
