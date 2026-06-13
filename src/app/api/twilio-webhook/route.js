import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const formData = await req.formData();

    const body = formData.get("Body");
    const from = formData.get("From");
    const buttonPayload = formData.get("ButtonPayload");
    const buttonText = formData.get("ButtonText");

    // Detect confirm click
    if (
      body?.toLowerCase() === "confirm" ||
      buttonText?.toLowerCase() === "confirm"
    ) {
      console.log("✅ User clicked CONFIRM");
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.log("Webhook Error:", error);

    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}