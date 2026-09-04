import { NextResponse } from "next/server";
import { DEFAULT_WEEKLY_PLANS, CurriculumPlanItem } from "@/lib/curriculum-plans-config";
import fs from "fs";
import path from "path";

const CONFIG_FILE_PATH = path.join(process.cwd(), ".curriculum-plans.json");

function loadStoredPlans(): CurriculumPlanItem[] {
  try {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const data = fs.readFileSync(CONFIG_FILE_PATH, "utf-8");
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error("Failed to read curriculum plans config file:", err);
  }
  return DEFAULT_WEEKLY_PLANS;
}

function saveStoredPlans(plans: CurriculumPlanItem[]): void {
  try {
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(plans, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to save curriculum plans config file:", err);
  }
}

let memoryPlans: CurriculumPlanItem[] = loadStoredPlans();

export async function GET() {
  return NextResponse.json({
    success: true,
    data: memoryPlans,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!Array.isArray(body)) {
      return NextResponse.json(
        { success: false, message: "Payload must be an array of curriculum plan items" },
        { status: 400 }
      );
    }

    memoryPlans = body;
    saveStoredPlans(body);

    return NextResponse.json({
      success: true,
      message: "Curriculum weekly plans updated successfully",
      data: memoryPlans,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update curriculum weekly plans" },
      { status: 500 }
    );
  }
}
