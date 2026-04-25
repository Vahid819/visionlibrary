// app/api/seats/route.js
import { connectDB } from "@/lib/db";
import Seat from "@/models/Seats";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const seats = await Seat.find().lean(); // ← lean() for better performance

    if (!seats.length) {
      return NextResponse.json(
        { success: false, message: "No seats found" },
        { status: 404 }
      );
    }

    // Build seat object with numeric keys
    const seatObject = {};
    let counter = 1;

    seats.forEach((doc) => {
      doc.seat.forEach((seatItem) => {
        seatObject[counter++] = {
          _id: seatItem._id,
          isOccupied: !seatItem.isAvailable,
          row: doc.row,
          column: doc.column,
          parentId: doc._id,
        };
      });
    });

    return NextResponse.json({
      success: true,
      total: Object.keys(seatObject).length, // ← useful for frontend
      data: seatObject,
    });

  } catch (error) {
    console.error("❌ Seats GET error:", error.message);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch seats",
        error: process.env.NODE_ENV === "development" 
          ? error.message  // show error in dev only
          : undefined,     // hide error in production
      },
      { status: 500 }
    );
  }
}