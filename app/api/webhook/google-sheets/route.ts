import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    // Helper to find value across normalized key variations (ignores quotes, spaces, underscores, hyphens)
    const findField = (...candidateKeys: string[]): string | undefined => {
      const normalizedMap = new Map<string, any>();
      for (const [k, v] of Object.entries(body)) {
        if (v !== undefined && v !== null && String(v).trim() !== "") {
          const cleanKey = k.toLowerCase().replace(/[^a-z0-9]/g, "");
          normalizedMap.set(cleanKey, v);
        }
      }

      for (const key of candidateKeys) {
        const cleanTarget = key.toLowerCase().replace(/[^a-z0-9]/g, "");
        if (normalizedMap.has(cleanTarget)) {
          return String(normalizedMap.get(cleanTarget)).trim();
        }
      }
      return undefined;
    };

    const phone = findField(
      "phone_number",
      "phone",
      "parentphone",
      "parents_phone_number",
      "parent_phone",
      "mobile_number",
      "mobile",
      "whatsapp_number",
      "contact",
      "phonenumber"
    );

    const parentName =
      findField(
        "parent_name",
        "parents_name",
        "parentname",
        "name",
        "full_name",
        "parent"
      ) || "Parent";

    const studentName =
      findField(
        "childs_full_name",
        "child_full_name",
        "childs_name",
        "child_name",
        "studentName",
        "student_name",
        "child",
        "student"
      ) || "Student";

    const studentGrade =
      findField(
        "childs_grade",
        "child_grade",
        "studentGrade",
        "student_grade",
        "grade",
        "class"
      ) || "Grade 6";

    const parentEmail =
      findField(
        "parent_email",
        "parents_email",
        "email_address",
        "email"
      ) || "";

    const sessionDate =
      findField(
        "sessionDate",
        "preferredSlotDate",
        "date",
        "preferred_date"
      ) || "to be confirmed";

    const sessionTime =
      findField(
        "sessionTime",
        "preferredSlotTime",
        "time",
        "preferred_time"
      ) || "to be confirmed";

    const timezone =
      findField("timezone", "preferredTimezone", "tz") || "Asia/Kolkata";

    const courseName =
      findField("courseName", "course", "program") ||
      "1-on-1 Financial Literacy Mentorship";

    if (!phone) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number is required. Please provide 'phone_number', 'parentPhone', or 'phone' in the request payload.",
        },
        { status: 400 }
      );
    }

    // Clean & normalize phone number format (Auto-adds +91 for 10-digit Indian numbers)
    let cleanPhone = String(phone).trim();
    const digitsOnly = cleanPhone.replace(/\D/g, "");
    if (digitsOnly.length === 10) {
      cleanPhone = `+91${digitsOnly}`;
    } else if (!cleanPhone.startsWith("+") && digitsOnly.length > 0) {
      cleanPhone = `+${digitsOnly}`;
    }

    const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL_ENV);

    // 1. Submit Lead to Pilot Leads API endpoint (Saves in Database & Admin Portal)
    const leadEndpoints = [
      process.env.BACKEND_URL
        ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads`
        : null,
      process.env.NEXT_PUBLIC_BACKEND_URL
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/pilot-leads`
        : null,
      "https://api.finquo.ai/api/pilot-leads",
      "https://app.finquo.ai/api/pilot-leads",
      !isVercel ? "http://127.0.0.1:3002/courses/pilot-leads" : null,
      !isVercel ? "http://localhost:3002/courses/pilot-leads" : null,
      !isVercel ? "http://127.0.0.1:3000/api/pilot-leads" : null,
      !isVercel ? "http://localhost:3000/api/pilot-leads" : null,
    ].filter(Boolean) as string[];

    const leadPayload = {
      parentName,
      studentName,
      studentGrade,
      parentEmail: parentEmail || `${cleanPhone.replace(/\D/g, "")}@lead.sheet`,
      parentPhone: cleanPhone,
      presentCountry: body.presentCountry || "India",
      preferredLanguage: body.preferredLanguage || "English",
      preferredSlotDate: sessionDate !== "to be confirmed" ? sessionDate : undefined,
      preferredSlotTime: sessionTime !== "to be confirmed" ? sessionTime : undefined,
      preferredTimezone: timezone,
      hearAbout: "Google Sheets Webhook",
    };

    let leadSaved = false;
    for (const url of leadEndpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(leadPayload),
        });
        if (res.ok) {
          leadSaved = true;
          break;
        }
      } catch {}
    }

    // 2. Trigger WhatsApp Marketing Template (finquo_free_demo_marketing) via Communication Service / Gateway
    const commEndpoints = [
      process.env.COMMUNICATION_SERVICE_URL
        ? `${process.env.COMMUNICATION_SERVICE_URL.replace(/\/$/, "")}/whatsapp/send-marketing-template`
        : null,
      process.env.BACKEND_URL
        ? `${process.env.BACKEND_URL.replace(/\/$/, "")}/api/whatsapp/send-marketing-template`
        : null,
      process.env.NEXT_PUBLIC_BACKEND_URL
        ? `${process.env.NEXT_PUBLIC_BACKEND_URL.replace(/\/$/, "")}/api/whatsapp/send-marketing-template`
        : null,
      "https://api.finquo.ai/api/whatsapp/send-marketing-template",
      "https://app.finquo.ai/api/whatsapp/send-marketing-template",
      "https://api.finquo.ai/whatsapp/send-marketing-template",
      !isVercel ? "http://127.0.0.1:3003/whatsapp/send-marketing-template" : null,
      !isVercel ? "http://localhost:3003/whatsapp/send-marketing-template" : null,
      !isVercel ? "http://127.0.0.1:3000/api/whatsapp/send-marketing-template" : null,
      !isVercel ? "http://localhost:3000/api/whatsapp/send-marketing-template" : null,
    ].filter(Boolean) as string[];

    let whatsappSent = false;
    let whatsappResponseDetails = "";

    const whatsappPayload = {
      to: cleanPhone,
      parentName,
      templateName: "finquo_free_demo_marketing",
      claimUrl: "https://junior.finquo.ai/claim-free-class",
      studentName,
      courseName,
      sessionDate,
      sessionTime,
      timezone,
      joinUrl: "https://junior.finquo.ai/claim-free-class",
    };

    for (const url of commEndpoints) {
      try {
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(whatsappPayload),
        });
        if (res.ok) {
          whatsappSent = true;
          whatsappResponseDetails = await res.text();
          break;
        }
      } catch (err: any) {
        whatsappResponseDetails = err?.message || "Fetch failed";
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Google Sheets new row processed successfully",
        leadSaved,
        whatsappSent,
        phone: cleanPhone,
        details: whatsappResponseDetails || "Processed",
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing Google Sheets Webhook:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to process Google Sheets webhook event",
      },
      { status: 500 }
    );
  }
}
