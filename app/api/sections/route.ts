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

export async function GET() {
  const fileState = loadFileState();
  const currentSections = {
    ...getDefaultSectionState(),
    ...(bundledSections as SectionState),
    ...(fileState || {}),
  };

  const response = NextResponse.json(
    { success: true, data: currentSections },
    { headers: NO_CACHE_HEADERS }
  );

  // Clear any legacy cookie that was stuck in the browser
  response.cookies.delete("landing_sections_config");

  return response;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const fileState = loadFileState() || {};
    const updated = {
      ...getDefaultSectionState(),
      ...(bundledSections as SectionState),
      ...fileState,
      ...body,
    };

    // Write directly to project file
    try {
      fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updated, null, 2), "utf-8");
    } catch {
      // Ignore if filesystem is read-only in serverless
    }

    const response = NextResponse.json(
      {
        success: true,
        message: "Section configurations updated successfully",
        data: updated,
      },
      { headers: NO_CACHE_HEADERS }
    );

    // Clear legacy cookie
    response.cookies.delete("landing_sections_config");

    return response;
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}


