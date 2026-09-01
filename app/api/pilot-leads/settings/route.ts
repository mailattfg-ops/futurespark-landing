import { NextResponse } from "next/server";

const getEndpoints = (path: string) => {
  const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
  return [
    process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads${path}` : null,
    process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads${path}` : null,
    "https://api.finquo.ai/api/pilot-leads" + path,
    !isVercel ? `http://127.0.0.1:3002/courses/pilot-leads${path}` : null,
    !isVercel ? `http://127.0.0.1:3000/api/pilot-leads${path}` : null,
    !isVercel ? `http://localhost:3002/courses/pilot-leads${path}` : null,
    !isVercel ? `http://localhost:3000/api/pilot-leads${path}` : null,
  ].filter(Boolean) as string[];
};

export async function GET() {
  const candidateEndpoints = getEndpoints("/settings");
  for (const url of candidateEndpoints) {
    try {
      const response = await fetch(url, { method: "GET" });
      if (response.ok) {
        const resData = await response.json();
        return NextResponse.json(resData);
      }
    } catch {
      // Continue to next endpoint
    }
  }
  return NextResponse.json({ success: true, data: { demoTeachersCount: 3 } });
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const candidateEndpoints = getEndpoints("/settings");
    for (const url of candidateEndpoints) {
      try {
        const response = await fetch(url, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        if (response.ok) {
          const resData = await response.json();
          return NextResponse.json(resData);
        }
      } catch {
        // Continue to next endpoint
      }
    }
    return NextResponse.json({ success: true, data: { demoTeachersCount: body.demoTeachersCount || 3 } });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
