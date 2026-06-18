import axios from "axios";
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";
import paymentModel from "@/models/paymentModel";
import dbConnect from "@/lib/dbConnect";

export async function POST(req){
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();

    try {
        const { upiId } = await req.json();
        const userId = session.user.id;

        // Check if the user already has a payment account
        let paymentAccount = await paymentModel.findOne({ userid: userId });
        if (paymentAccount) {
            // Update existing payment account
            paymentAccount.upiid = upiId;
            await paymentAccount.save();
        } else {
            // Create new payment account
            paymentAccount = new paymentModel({
                userid: userId,
                upiid: upiId,
            });
            await paymentAccount.save();
        }
        return NextResponse.json({ success: true, message: "Payment account saved successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET(req){
    const session = await getSession();
    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await dbConnect();

    try {
        const userId = session.user.id;
        const paymentAccount = await paymentModel.findOne({ userid: userId });
        if (!paymentAccount) {
            return NextResponse.json({ error: "Payment account not found" }, { status: 404 });
        }
        return NextResponse.json({ success: true, data: paymentAccount }, { status: 200 });
        
    } catch (error) {
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}