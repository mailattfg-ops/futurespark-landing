import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/partial-leads` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/partial-leads` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/partial-leads` : null,
      "https://api.finquo.ai/api/partial-leads",
      "https://app.finquo.ai/api/partial-leads",
      !isVercel ? "http://127.0.0.1:3002/courses/partial-leads" : null,
      !isVercel ? "http://127.0.0.1:3000/api/partial-leads" : null,
      !isVercel ? "http://localhost:3002/courses/partial-leads" : null,
      !isVercel ? "http://localhost:3000/api/partial-leads" : null,
    ].filter(Boolean) as string[];

    let lastErrorDetails = "";

    for (const url of candidateEndpoints) {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data, { status: response.status });
        } else {
          const errorText = await response.text();
          lastErrorDetails = `Endpoint ${url} responded with status ${response.status}: ${errorText}`;
        }
      } catch (err: any) {
        lastErrorDetails = `Failed to connect to ${url}: ${err?.message || err}`;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: `Failed to connect to backend service. Details: ${lastErrorDetails}`,
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Error in /api/partial-leads proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to process partial lead request" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/partial-leads` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/partial-leads` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/partial-leads` : null,
      "https://api.finquo.ai/api/partial-leads",
      "https://app.finquo.ai/api/partial-leads",
      !isVercel ? "http://127.0.0.1:3002/courses/partial-leads" : null,
      !isVercel ? "http://127.0.0.1:3000/api/partial-leads" : null,
      !isVercel ? "http://localhost:3002/courses/partial-leads" : null,
      !isVercel ? "http://localhost:3000/api/partial-leads" : null,
    ].filter(Boolean) as string[];

    let lastErrorDetails = "";

    for (const url of candidateEndpoints) {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          return NextResponse.json(data, { status: response.status });
        } else {
          const errorText = await response.text();
          lastErrorDetails = `Endpoint ${url} responded with status ${response.status}: ${errorText}`;
        }
      } catch (err: any) {
        lastErrorDetails = `Failed to connect to ${url}: ${err?.message || err}`;
      }
    }

    return NextResponse.json(
      {
        success: false,
        message: `Failed to connect to backend service. Details: ${lastErrorDetails}`,
      },
      { status: 502 }
    );
  } catch (error: any) {
    console.error("Error in GET /api/partial-leads proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch partial leads" },
      { status: 500 }
    );
  }
}
