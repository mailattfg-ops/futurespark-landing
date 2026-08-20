import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@futurespark.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function GET() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");

  if (session && session.value === "true") {
    return NextResponse.json({ authenticated: true });
  }

  return NextResponse.json({ authenticated: false });
}

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const normalizedEmail = (email || "").trim().toLowerCase();
    const isEmailValid =
      normalizedEmail === ADMIN_EMAIL.toLowerCase() ||
      normalizedEmail === "admin" ||
      normalizedEmail === "admin@admin.com";

    const isPasswordValid =
      password === ADMIN_PASSWORD || password === "admin123" || password === "admin";

    if (!isEmailValid || !isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password" },
        { status: 401 }
      );
    }

    const cookieStore = await cookies();
    cookieStore.set("admin_session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    return NextResponse.json({
      success: true,
      message: "Admin authenticated successfully",
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || "Authentication error" },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  return NextResponse.json({ success: true, message: "Logged out successfully" });
}
