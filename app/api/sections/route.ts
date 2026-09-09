import { NextResponse } from "next/server";
import { getDefaultSectionState, SectionState } from "@/lib/section-config";
import bundledSections from "@/.sections-config.json";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const CONFIG_FILE_PATH = path.join(process.cwd(), ".sections-config.json");

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const getBackendEndpoints = (path: string) => {
  const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
  const localCandidates = !isVercel
    ? [
        `http://127.0.0.1:3000/api/pilot-leads${path}`,
        `http://localhost:3000/api/pilot-leads${path}`,
        `http://127.0.0.1:3002/courses/pilot-leads${path}`,
        `http://localhost:3002/courses/pilot-leads${path}`,
      ]
    : [];

  const remoteCandidates = [
    process.env.BACKEND_URL && !process.env.BACKEND_URL.includes("localhost") && !process.env.BACKEND_URL.includes("127.0.0.1")
      ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads${path}`
      : null,
    process.env.NEXT_PUBLIC_BACKEND_URL && !process.env.NEXT_PUBLIC_BACKEND_URL.includes("localhost") && !process.env.NEXT_PUBLIC_BACKEND_URL.includes("127.0.0.1")
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads${path}`
      : null,
    "https://api.finquo.ai/api/pilot-leads" + path,
  ];

  return [...localCandidates, ...remoteCandidates].filter(Boolean) as string[];
};

function loadFileState(): SectionState | null {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, "utf-8"));
    }
  } catch {
    // Read-only filesystem
  }
  return null;
}

async function fetchSectionsFromDb(): Promise<SectionState | null> {
  for (const url of getBackendEndpoints("/sections")) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json?.data && typeof json.data === "object" && Object.keys(json.data).length > 0) {
          return json.data as SectionState;
        }
      }
    } catch {}
  }
  return null;
}

async function saveSectionsToDb(state: SectionState): Promise<boolean> {
  for (const url of getBackendEndpoints("/sections")) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(state),
      });
      if (res.ok) {
        const json = await res.json();
        if (json?.success) return true;
      }
    } catch {}
  }
  return false;
}

export async function GET() {
  const dbSections = await fetchSectionsFromDb();
  const fileState = loadFileState();

  const merged = {
    ...getDefaultSectionState(),
    ...(bundledSections as SectionState),
    ...(fileState || {}),
    ...(dbSections || {}),
  };

  const response = NextResponse.json(
    { success: true, data: merged },
    { headers: NO_CACHE_HEADERS }
  );

  response.cookies.delete("landing_sections_config");
  return response;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const currentDb = (await fetchSectionsFromDb()) || {};
    const fileState = loadFileState() || {};
    const updated: SectionState = {
      ...getDefaultSectionState(),
      ...(bundledSections as SectionState),
      ...fileState,
      ...currentDb,
      ...body,
    };

    // Save to DB globally
    const savedToDb = await saveSectionsToDb(updated);

    // Also persist to local file in dev environment
    try {
      fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
    } catch {}

    const response = NextResponse.json(
      {
        success: true,
        message: savedToDb ? "Section configurations saved globally in database" : "Section configurations updated",
        data: updated,
      },
      { headers: NO_CACHE_HEADERS }
    );

    response.cookies.delete("landing_sections_config");
    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}
