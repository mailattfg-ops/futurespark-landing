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

// Initialize in-memory state: Bundled JSON is baked into the build at compile time,
// with runtime file read fallback in local dev.
let memorySections: SectionState = {
  ...getDefaultSectionState(),
  ...(bundledSections as SectionState),
  ...(loadFileState() || {}),
};

export async function GET() {
  // Check if file was updated in local dev
  const fileState = loadFileState();
  if (fileState) {
    memorySections = { ...memorySections, ...fileState };
  }

  return NextResponse.json(
    { success: true, data: memorySections },
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

    // Persist to local project file in development environment
    try {
      fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(memorySections, null, 2), "utf-8");
    } catch {
      // Safely ignore on read-only environments (e.g. Vercel Serverless)
    }

    return NextResponse.json(
      {
        success: true,
        message: "Section configurations updated successfully",
        data: memorySections,
      },
      { headers: NO_CACHE_HEADERS }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}
