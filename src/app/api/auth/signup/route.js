import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import { hash } from "bcryptjs";
import crypto from "crypto";

export async function POST(req){
    await connectDB();

    try {
        const body = await req.json();
        const existingUser = await UserModel.findOne({email: body.email});

        if(existingUser){
            return new Response(JSON.stringify({ error: "Email already in use" }), { status: 400 });
        }

        const otp = crypto.randomInt(100000, 999999); // Generate a 6-digit OTP
        const otpExpiryDate = new Date(Date.now() + 1 * 60 * 1000); // OTP expires in 1 minute
        const hashedPassword = await hash(body.password, 10);

        const newUser = new UserModel({
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: hashedPassword,
            otp: otp,
            otpCreatedAt: new Date(),
            otpExpiryDate: otpExpiryDate,
        })

        await newUser.save();
        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error during user registration:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}