import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { UserZodSchema } from "@/Schemas/zoduserschema";
import { NextResponse, NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import { log } from "console";


export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();

        const { fname, lname, email, otp, password } = UserZodSchema.parse(body);

        const isexistingUser = await User.findOne({ email });

        if (isexistingUser) {
            return NextResponse.json({ message: "User already exists so please login or use another email"}, { status: 400 })
        }else {
            const hashedPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                fname,
                lname,
                email,
                otp,
                password: hashedPassword,
                otp_expiry: new Date(Date.now() + 10 * 60 * 1000), // OTP expires in 10 minutes
            })
            await newUser.save();
             

            const user = await User.findOne({ email, otp});
            if (user) {
                if (user.otp_expiry < new Date()) {
                    return NextResponse.json( { message: "OTP has expired, please request a new OTP" }, { status: 400 });
                }
                if (user.otp !== otp) {
                    return NextResponse.json( { message: "Invalid OTP, please try again" }, { status: 400 });
                }
                if (user.otp === otp) {
                    user.isverified = true;
                    await user.save();
                    return NextResponse.json( { message: "User registered and OTP verified successfully, you can now login" }, { status: 200 });
                }
            }

        }
        
    } catch (error: any) {
        log("Error in sign-up route:", error.message);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}