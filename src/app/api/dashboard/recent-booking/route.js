// app/api/dashboard/recent-bookings/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import StudentModel from "@/models/Student";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { success: false },
        { status: 401 }
      );
    }

    await connectDB();

    const students = await StudentModel.find({
      createdBy: session.user.id,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("firstName lastName seat createdAt")
      .lean();

    return NextResponse.json({
      success: true,
      data: students,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}