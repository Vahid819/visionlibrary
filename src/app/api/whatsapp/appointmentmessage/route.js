import { NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req) {
  try {
    const body = await req.json();
    const { phone, subject, content } = body;

    if (!phone || !subject || !content) {
      return NextResponse.json(
        { message: "Phone number, subject, and content are required." },
        { status: 400 },
      );
    }

    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    const client = twilio(accountSid, authToken);

    // Remove spaces/dashes
    const cleanPhone = phone.replace(/\D/g, "");

    // Add India country code if missing
    const formattedToNumber = cleanPhone.startsWith("91")
      ? `whatsapp:+${cleanPhone}`
      : `whatsapp:+91${cleanPhone}`;

    // Twilio Sandbox Number
    const formattedFromNumber = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;
    const message = await client.messages.create({
  from: formattedFromNumber,
  to: formattedToNumber,

  contentSid: "HXb5b62575e6e4ff6129ad7c8efe1f983e",

  contentVariables: JSON.stringify({
    "1": subject,
    "2": content,
  }),
});

    return NextResponse.json(
      {
        success: true,
        messageId: message.sid,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Twilio Error:", error);

    return NextResponse.json(
      {
        message: error.message || "Failed to send WhatsApp message",
      },
      { status: 500 },
    );
  }
}
