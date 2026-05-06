import { connectDB } from "@/lib/db";
import StudentModel from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

// GET — fetch all students
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  try {
    const students = await StudentModel.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, data: students });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST — create a new student
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();

  try {
    const body = await req.json();

    // Check if seat already taken
    const seatTaken = await StudentModel.findOne({
      seat: body.seat,
      isActive: true,
    });

    if (seatTaken) {
      return NextResponse.json(
        { message: `Seat ${body.seat} is already occupied` },
        { status: 400 }
      );
    }

    const student = await StudentModel.create({
      ...body,
      createdBy: session.user.id,
    });

    return NextResponse.json(
      { success: true, data: student },
      { status: 201 }
    );
  } catch (error) {
    console.error("Student POST error:", error);
    return NextResponse.json(
      { message: error.message || "Failed to register student" },
      { status: 500 }
    );
  }
}
