import { connectDB } from "@/lib/db";
import StudentModel from "@/models/Student";
import Seat from "@/models/Seats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function DELETE(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      {
        success: false,
        message: "Unauthorized",
      },
      { status: 401 }
    );
  }

  await connectDB();

  try {
    const { searchParams } = new URL(req.url);
    const studentId = searchParams.get("id");

    if (!studentId) {
      return NextResponse.json(
        {
          success: false,
          message: "Student ID is required",
        },
        { status: 400 }
      );
    }

    // Find student
    const student = await StudentModel.findOne({
      _id: studentId,
      createdBy: session.user.id,
    });

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 }
      );
    }

    // Update seat to available
    const seatUpdated = await Seat.updateOne(
      {
        userId: session.user.id,
        "seat.seatNumber": Number(student.seat),
      },
      {
        $set: {
          "seat.$.isOccupied": false,
        },
      }
    );

    console.log("Seat Update:", seatUpdated);

    // Soft delete student
    student.isActive = false;
    await student.save();

    return NextResponse.json({
      success: true,
      message: "Student deleted successfully",
    });

  } catch (error) {
    console.error("DELETE ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}