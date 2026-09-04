import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    const candidateEndpoints = [
      process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/partial-leads/${id}` : null,
      process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/partial-leads/${id}` : null,
      process.env.NEXT_PUBLIC_APP_API_URL ? `${process.env.NEXT_PUBLIC_APP_API_URL.replace(/\/$/, "")}/api/partial-leads/${id}` : null,
      `https://api.finquo.ai/api/partial-leads/${id}`,
      `https://app.finquo.ai/api/partial-leads/${id}`,
      !isVercel ? `http://127.0.0.1:3002/courses/partial-leads/${id}` : null,
      !isVercel ? `http://127.0.0.1:3000/api/partial-leads/${id}` : null,
      !isVercel ? `http://localhost:3002/courses/partial-leads/${id}` : null,
      !isVercel ? `http://localhost:3000/api/partial-leads/${id}` : null,
    ].filter(Boolean) as string[];

    let lastErrorDetails = "";

    for (const url of candidateEndpoints) {
      try {
        const response = await fetch(url, {
          method: "DELETE",
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
    console.error("Error in DELETE /api/partial-leads/[id] proxy:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete partial lead" },
      { status: 500 }
    );
  }
}
