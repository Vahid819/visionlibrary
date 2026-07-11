import dbconnect from "@/lib/db"
import UserModel from "@/models/User"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { hash } from "bcryptjs";

export async function PATCH(req, res){
    const session = await getServerSession(authOptions);
    await dbconnect()
    try {
        const body = await req.json();
        // Process the PATCH request 
        const hashedPassword = await hash(body.password, 10);
        const updatedUser = await UserModel.findOneAndUpdate(
            { email: session.user.email },
            { password: hashedPassword },
            { new: true }
        );
        return NextResponse.json({
            success: true,
            message: "Password updated successfully",
            user: updatedUser
        });
    } catch (error) {
        error.message = "You are not authorized to perform this action";
        return NextResponse.json({
            success: false,
            message: error.message,
        },{ status: 501 })
    }
}