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

    const candidateEndpoints = [
      `http://127.0.0.1:3002/courses/leads/${id}`,
      `http://127.0.0.1:3000/api/leads/${id}`,
      `http://localhost:3002/courses/leads/${id}`,
      `http://localhost:3000/api/leads/${id}`,
    ];

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
