import connectDB from "@/lib/db";
import UserModel from "@/models/User";

export async function POST(req){
    await connectDB();

    try {
        const body = await req.json();
        const user = await UserModel.findOne({email: body.email});

        if(!user){
            return new Response(JSON.stringify({ error: "User not found"}),{ status: 404 });
        }

        if(user.otp !== body.otp){
            return new Response(JSON.stringify({ error: "Invalid OTP" }), { status: 400 });
        }

        if(user.otpExpiryDate < new Date()){
            return new Response(JSON.stringify({ error: "OTP has expired" }), { status: 400 });
        }

        user.userverified = true;
        await user.save();
        return new Response(JSON.stringify({ message: "OTP verified successfully" }), { status: 200 });     
        

    } catch (error) {
        console.error("Error during OTP verification:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
    }
}