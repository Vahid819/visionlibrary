import { connectDB } from "@/lib/db";
import StudentModel from "@/models/Student";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import Seat from "@/models/Seats"; // ✅ Imported Seat model

// GET — fetch all students
export async function GET() {
  const session = await getServerSession(authOptions);
  // console.log("session",session)
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const students = await StudentModel
      .find({ createdBy: session.user.id }) 
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data: students,
      total: students.length,
    });
  } catch (error) {
    console.error("Student GET error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch students" },
      { status: 500 }
    );
  }
}

// POST — create a new student
export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const body = await req.json();

    // ✅ Validate required fields
    if (!body.firstName || !body.lastName || !body.phone) {
      return NextResponse.json(
        { message: "First name, last name and phone are required" },
        { status: 400 }
      );
    }

    if (!body.seat) {
      return NextResponse.json(
        { message: "Please select a seat" },
        { status: 400 }
      );
    }

    if (!body.plan) {
      return NextResponse.json(
        { message: "Please select a membership plan" },
        { status: 400 }
      );
    }

    // 🔥 NEW LOGIC: Verify seat availability directly from the Seat model first
    const seatAvailable = await Seat.findOne({
      "seat": {
        $elemMatch: {
          seatNumber: String(body.seat),
          isAvailable: true
        }
      }
    });

    if (!seatAvailable) {
      return NextResponse.json(
        { message: `Seat ${body.seat} is either already occupied or does not exist.` },
        { status: 400 }
      );
    }

    // ✅ Create student 
    const student = await StudentModel.create({
      firstName:      body.firstName,
      lastName:       body.lastName,
      phone:          body.phone,
      email:          body.email,
      dob:            body.dob    ,
      gender:         body.gender ,
      address:        body.address,
      emergencyName:  body.emergencyName ,
      emergencyPhone: body.emergencyPhone,
      seat:           Number(body.seat),
      plan:           body.plan,
      joinDate:       body.joinDate,
      paymentStatus:  body.paymentStatus || "Pending",
      shift:          body.shift   ,
      idType:         body.idType  ,
      idNumber:       body.idNumber,
      notes:          body.notes   ,
      isActive:       true,
      createdBy:      session.user.id,
    });

    // 🔥 NEW FEATURE: Since the seat is confirmed available, update it to false
    await Seat.updateOne(
      // Find the document containing this specific seatNumber
      { "seat.seatNumber": String(body.seat) }, 
      // Use the positional operator ($) to update only that specific seat's availability in the array
      { $set: { "seat.$.isAvailable": false } }
    );

    return NextResponse.json(
      { success: true, data: student },
      { status: 201 }
    );

  } catch (error) {
    console.error("Student POST error:", error);

    // ✅ Handle mongoose validation errors clearly
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(e => e.message);
      return NextResponse.json(
        { message: messages.join(", ") },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: error.message || "Failed to register student" },
      { status: 500 }
    );
  }
}

// DELETE — deactivate a student
export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");

    if (!studentId) {
      return NextResponse.json({ message: "Student ID required" }, { status: 400 });
    }

    const student = await StudentModel.findOneAndUpdate(
      { _id: studentId, createdBy: session.user.id },
      { isActive: false },
      { new: true }
    );

    if (!student) {
      return NextResponse.json({ message: "Student not found" }, { status: 404 });
    }

    // 🔥 NEW FEATURE: Free up the seat in the Seat model (isAvailable: true)
    if (student.seat) {
      await Seat.updateOne(
        { "seat.seatNumber": String(student.seat) },
        { $set: { "seat.$.isAvailable": true } }
      );
    }

    return NextResponse.json({ success: true, message: "Student deactivated and seat freed" });

  } catch (error) {
    return NextResponse.json(
      { message: error.message || "Failed to delete student" },
      { status: 500 }
    );
  }
}