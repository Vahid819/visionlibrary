// /api/send-whatsapp.js

import twilio from "twilio";
import UserModel from "@/models/User";
import dbConnect from "@/utils/dbConnect";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export default async function handler(req, res) {

    const session = await getServerSession(authOptions);
    await dbConnect();


  try {
    if (!session) {
      return res.status(401).json({ success: false, error: "Unauthorized" });
    }
    const user = await UserModel.findById(session.user.id);
    console.log("User from session:", user);
    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    const { phone, message } = req.body;

    const response = await client.messages.create({
      body: message,
      from: user.phone, // Twilio sandbox
      to: `whatsapp:${phone}`,
    });

    res.status(200).json({ success: true, sid: response.sid });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
}