import { NextResponse } from "next/server";
import { getDefaultSectionState, SectionState } from "@/lib/section-config";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Local-dev fallback only. On Vercel the function filesystem is read-only, so file writes
// always fail there — the durable store is the backend settings row (landingSections key).
const CONFIG_FILE_PATH = path.join(process.cwd(), ".sections-config.json");

const NO_CACHE_HEADERS = {
  "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
  Pragma: "no-cache",
  Expires: "0",
};

const getSettingsEndpoints = (): string[] => {
  const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);
  return [
    process.env.BACKEND_URL ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads/settings` : null,
    process.env.NEXT_PUBLIC_BACKEND_URL ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads/settings` : null,
    "https://api.finquo.ai/api/pilot-leads/settings",
    !isVercel ? "http://127.0.0.1:3000/api/pilot-leads/settings" : null,
    !isVercel ? "http://127.0.0.1:3002/courses/pilot-leads/settings" : null,
  ].filter(Boolean) as string[];
};

async function backendGetSettings(): Promise<Record<string, unknown> | null> {
  for (const url of getSettingsEndpoints()) {
    try {
      const res = await fetch(url, { cache: "no-store" });
      if (res.ok) {
        const json = await res.json();
        if (json?.data && typeof json.data === "object") return json.data as Record<string, unknown>;
      }
    } catch {
      // try next endpoint
    }
  }
  return null;
}

async function backendSaveSections(state: SectionState): Promise<boolean> {
  // Read-merge-write so the other settings fields (demoTeachersCount etc.) are never clobbered
  const settings = await backendGetSettings();
  if (!settings) return false;
  const payload = { ...settings, landingSections: state };
  for (const url of getSettingsEndpoints()) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) continue;
      // Verify the key actually persisted — a backend that strips unknown fields would
      // otherwise let us report a save that never happened (the original bug, relocated).
      const after = await backendGetSettings();
      const stored = after ? (after as Record<string, unknown>).landingSections : null;
      return JSON.stringify(stored ?? null) === JSON.stringify(state);
    } catch {
      // try next endpoint
    }
  }
  return false;
}

function loadFileState(): SectionState | null {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, "utf-8"));
    }
  } catch (err) {
    console.error("Failed to read section config file:", err);
  }
  return null;
}

async function loadStoredState(): Promise<SectionState> {
  const settings = await backendGetSettings();
  const remote = settings ? (settings as Record<string, unknown>).landingSections : null;
  if (remote && typeof remote === "object") {
    return { ...getDefaultSectionState(), ...(remote as SectionState) };
  }
  return { ...getDefaultSectionState(), ...(loadFileState() || {}) };
}

export async function GET() {
  const state = await loadStoredState();
  return NextResponse.json({ success: true, data: state }, { headers: NO_CACHE_HEADERS });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    const currentState = await loadStoredState();
    const updatedState: SectionState = { ...currentState, ...body };

    if (await backendSaveSections(updatedState)) {
      return NextResponse.json(
        { success: true, message: "Section configurations updated successfully", data: updatedState },
        { headers: NO_CACHE_HEADERS }
      );
    }

    // Local-dev fallback: project-dir file. Where the filesystem is read-only this throws,
    // and we return an error — never claim success for a write that did not happen.
    try {
      fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(updatedState, null, 2), "utf-8");
      return NextResponse.json(
        { success: true, message: "Section configurations updated successfully", data: updatedState },
        { headers: NO_CACHE_HEADERS }
      );
    } catch (err) {
      console.error("Failed to persist section config anywhere:", err);
      return NextResponse.json(
        {
          success: false,
          message:
            "Changes were NOT saved: the backend settings API did not store them and the server filesystem is read-only. Ask the backend team to allow a 'landingSections' field on the pilot-leads settings endpoint.",
        },
        { status: 500 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}
