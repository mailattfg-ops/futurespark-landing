import { NextResponse } from "next/server";
import { getDefaultSectionState, SectionState } from "@/lib/section-config";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const revalidate = 0;

// Persistent file storage for section toggle settings
const CONFIG_FILE_PATH = path.join(process.cwd(), ".sections-config.json");

function loadStoredState(): SectionState {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      return { ...getDefaultSectionState(), ...parsed };
    }
  } catch (err) {
    console.error("Failed to read section config file:", err);
  }
  return getDefaultSectionState();
}

function saveStoredState(state: SectionState): void {
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(state, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save section config file:", err);
  }
}

export async function GET() {
  const state = loadStoredState();
  return NextResponse.json(
    {
      success: true,
      data: state,
    },
    {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0",
        Pragma: "no-cache",
        Expires: "0",
      },
    }
  );
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid payload" },
        { status: 400 }
      );
    }

    const currentState = loadStoredState();
    const updatedState: SectionState = {
      ...currentState,
      ...body,
    };

    saveStoredState(updatedState);

    return NextResponse.json(
      {
        success: true,
        message: "Section configurations updated successfully",
        data: updatedState,
      },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0",
          Pragma: "no-cache",
        },
      }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}
