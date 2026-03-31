import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import { hash } from "bcryptjs";
import crypto from "crypto";
import { sendOTPEmail } from "@/helper/setoptemail";

export async function POST(req){
    await connectDB();

    try {
        const body = await req.json();
        const existingUser = await UserModel.findOne({email: body.email});

        if(existingUser){
            return new Response(JSON.stringify({ error: "Email already in use" }), { status: 400 });
        }

        const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
        const otpExpiryDate = new Date(Date.now() + 10 * 60 * 1000);
        await sendOTPEmail(body.email, otp)
        const hashedPassword = await hash(body.password, 10);

        const newUser = new UserModel({
            firstname: body.firstName,
            lastname: body.lastName,
            email: body.email,
            password: hashedPassword,
            otp: otp,
            otpCreatedAt: new Date(),
            otpExpiryDate: otpExpiryDate,
        })

        console.log("New user created:", newUser);

        await newUser.save();
        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error during user registration:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}