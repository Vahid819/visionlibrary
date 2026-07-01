import dbconnect from "@/lib/db"
import UserModel from "@/models/User"
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function PATCH(req, res){
    const session = await getServerSession(authOptions);
    await dbconnect()
    try {
        const body = await req.json();
        console.log(session)

        const updatedata = await UserModel.findOneAndUpdate({email: session.user.email}, body , {
        new: true,
        runValidators: true,
    });

        return NextResponse.json({
            success: true,
            message: "Settings saved",
            data: updatedata,
        });
    } catch (error) {
        console.log(error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}