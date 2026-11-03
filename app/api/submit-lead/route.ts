// app/api/submit-lead/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const country = req.headers.get("x-vercel-ip-country") || "unknown";

    // 👇 TEMP: For local testing only
    const isLocal = ip === "::1" || ip === "127.0.0.1" || ip === "unknown";
    const finalIp = isLocal ? "103.21.58.5 (test)" : ip;
    const finalCountry = isLocal ? "IN (test)" : country;

    const payload = { ...body, ip: finalIp, country: finalCountry };

    // const payload = { ...body, ip, country };

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      return NextResponse.json(
        { error: "Server not configured" },
        { status: 500 },
      );
    }

    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
