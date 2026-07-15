import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { sendOTPEmail } from "@/helper/sendOTPEmail";

export async function POST(req) {
  await connectDB();

  try {
    const body = await req.json();
    console.log(body)
    const existingUser = await UserModel.findOne({
      email: body.email,
    });
    console.log("existingUser",existingUser)
    if (existingUser) {
      return Response.json(
        {
          error: "Email already in use",
        },
        {
          status: 400,
        }
      );
    }

    const otp = crypto.randomInt(100000, 999999);

    const hashedPassword = await hash(body.password, 10);

    const emailResponse = await sendOTPEmail(body.email, otp);
    console.log(emailResponse)
    if (!emailResponse.success) {
      return Response.json(
        {
          error: "Failed to send OTP email",
        },
        {
          status: 500,
        }
      );
    }

    const user = await UserModel.create({
      firstname: body.firstName,
      lastname: body.lastName,
      email: body.email,
      libraryname: body.libraryname,
      password: hashedPassword,
      otp,
      otpCreatedAt: new Date(),
      otpExpiryDate: new Date(Date.now() + 10 * 60 * 1000),

      // User should NOT be verified yet
      userverified: false,
    });
    console.log("user",user)
    return Response.json(
      {
        success: true,
        message: "OTP sent successfully",
        email: user.email,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Signup Error:", error);

    return Response.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      }
    );
  }
}