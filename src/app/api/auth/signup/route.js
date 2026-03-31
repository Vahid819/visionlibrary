import connectDB from "@/lib/db";
import UserModel from "@/models/User";
import { hash } from "bcryptjs";

export async function POST(req){
    await connectDB();

    try {
        const body = await req.json();
        const hashedPassword = await hash(body.password, 10);
        const newUser = new UserModel({
            name: body.name,
            lastname: body.lastname,
            email: body.email,
            password: hashedPassword,
            otp: body.otp,
        })
        await newUser.save();
        return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
    } catch (error) {
        console.error("Error during user registration:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}