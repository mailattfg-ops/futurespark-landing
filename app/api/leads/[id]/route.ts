import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || id.trim().length === 0) {
      return NextResponse.json(
        { success: false, message: "Lead ID is required." },
        { status: 400 }
      );
    }

    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/leads/${id}` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/leads/${id}` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/leads/${id}` : null,
      `https://api.finquo.ai/api/leads/${id}`,
      `https://app.finquo.ai/api/leads/${id}`,
      `https://app.finquo.ai/api/courses/leads/${id}`,
      !isVercel ? `http://127.0.0.1:3002/courses/leads/${id}` : null,
      !isVercel ? `http://127.0.0.1:3000/api/leads/${id}` : null,
      !isVercel ? `http://localhost:3002/courses/leads/${id}` : null,
      !isVercel ? `http://localhost:3000/api/leads/${id}` : null,
    ].filter(Boolean) as string[];

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
          return NextResponse.json({
            success: true,
            data: data.data || data,
          });
        }
      } catch {
        // Try next endpoint
      }
    }

    return NextResponse.json(
      { success: false, message: "Lead not found" },
      { status: 404 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch lead" },
      { status: 500 }
    );
  }
}
