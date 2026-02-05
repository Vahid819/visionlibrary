import mongoose from "mongoose";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { UserZodSchema } from "@/Schemas/zoduserschema";
import { log } from "console";

export async function POST(request: Request) {
    try {
        await connectDB();

        const body = await request.json();

        const { email, otp } = UserZodSchema.pick({ email: true, otp: true }).parse(body);

        const user = await User.findOne({ email, otp });

        if (!user) {
            return NextResponse.json( { message: "User not found with the provided email" }, { status: 404 });
        }
        if (user.isverified) {
            return NextResponse.json( { message: "User is already verified, please login" }, { status: 400 });
        }
        if (user.otp_expiry < new Date()) {
            return NextResponse.json( { message: "OTP has expired, please request a new OTP" }, { status: 400 });
        }
        if (user.otp !== otp) {
            return NextResponse.json( { message: "Invalid OTP, please try again" }, { status: 400 });
        }
        if (user.otp === otp) {
            user.isverified = true;
            await user.save();
            return NextResponse.json( { message: "OTP verified successfully, you can now login" }, { status: 200 });
        }


    } catch (error: any) {
        log("Error in OTP verification route:", error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}