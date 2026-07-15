import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import crypto from "crypto";
import { sendOTPEmail } from "@/helper/sendOTPEmail";
import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req) {
  await connectDB();

  try {
    const { email } = await req.json();

    if (!email) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return Response.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Optional: don't resend if already verified
    if (user.userverified) {
      return Response.json(
        { error: "Email is already verified" },
        { status: 400 }
      );
    }

    // Generate new OTP
    const otp = crypto.randomInt(100000, 999999);

    user.otp = otp;
    user.otpCreatedAt = new Date();
    user.otpExpiryDate = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    // Send email
    const result = await sendOTPEmail(email, otp);

    if (!result.success) {
      return Response.json(
        { error: "Failed to send OTP email" },
        { status: 500 }
      );
    }

    return Response.json(
      {
        success: true,
        message: "OTP resent successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Resend OTP Error:", error);

    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}