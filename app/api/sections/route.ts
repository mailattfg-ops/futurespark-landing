import { NextResponse } from "next/server";
import { cookies } from "next/headers";
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

function loadFileState(): SectionState | null {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, "utf-8"));
    }
  } catch {
    // Read-only filesystem or file missing in serverless
  }
  return null;
}

// In-memory fallback
let memorySections: SectionState = {
  ...getDefaultSectionState(),
  ...(bundledSections as SectionState),
  ...(loadFileState() || {}),
};

export async function GET() {
  // 1. Check local file if in development
  const fileState = loadFileState();
  if (fileState) {
    memorySections = { ...memorySections, ...fileState };
  }

  // 2. Read cookie preference if present (persists client choices in production without a database)
  let cookieSections: SectionState | null = null;
  try {
    const cookieStore = await cookies();
    const cookieVal = cookieStore.get("landing_sections_config")?.value;
    if (cookieVal) {
      cookieSections = JSON.parse(decodeURIComponent(cookieVal));
    }
  } catch {}

  const mergedState: SectionState = {
    ...getDefaultSectionState(),
    ...(bundledSections as SectionState),
    ...(fileState || {}),
    ...memorySections,
    ...(cookieSections || {}),
  };

  return NextResponse.json(
    { success: true, data: mergedState },
    { headers: NO_CACHE_HEADERS }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    memorySections = { ...memorySections, ...body };

    // Persist to local project file in development environment if writable
    try {
      fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(memorySections, null, 2), "utf-8");
    } catch {
      // Safely ignore on read-only environments (e.g. Vercel Serverless)
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Section configurations updated successfully",
        data: memorySections,
      },
      { headers: NO_CACHE_HEADERS }
    );

    // Set cookie so all future requests from this browser retain the updated toggles
    response.cookies.set("landing_sections_config", encodeURIComponent(JSON.stringify(memorySections)), {
      path: "/",
      maxAge: 31536000, // 1 year
      sameSite: "lax",
    });

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}

