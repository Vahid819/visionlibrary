import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import { generateOTP } from "@/utils/otpGenerator";

export async function POST(req){
    await connectDB();

    try {
        const body = await req.json();
        const otp = generateOTP();

        const user = await UserModel.findOneAndUpdate(
            {email: body.email},
            {otp: otp,
                otpCreatedAt: new Date(),
                otpExpiryDate: new Date(Date.now() + 1 * 60 * 1000) // OTP valid for 1 minutes
            }
            ,{new: true, upsert: true},
        )
        //TODO after complete all code remove console.log   
        console.log(user);
        return new Response(JSON.stringify({ message: "OTP generated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error during OTP generation:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}