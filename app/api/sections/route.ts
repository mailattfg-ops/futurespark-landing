import { NextResponse } from "next/server";
import { getDefaultSectionState, SectionState } from "@/lib/section-config";
import fs from "fs";
import path from "path";

// In-memory cache + file storage fallback for section toggle settings
const CONFIG_FILE_PATH = path.join(process.cwd(), ".sections-config.json");

function loadStoredState(): SectionState {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      return { ...getDefaultSectionState(), ...JSON.parse(data) };
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

let memoryState: SectionState = loadStoredState();

export async function GET() {
  return NextResponse.json({
    success: true,
    data: memoryState,
  });
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

    const updatedState: SectionState = {
      ...memoryState,
      ...body,
    };

    memoryState = updatedState;
    saveStoredState(updatedState);

    return NextResponse.json({
      success: true,
      message: "Section configurations updated successfully",
      data: memoryState,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update sections" },
      { status: 500 }
    );
  }
}
