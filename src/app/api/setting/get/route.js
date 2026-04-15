import { connectDB } from "@/lib/db";
import Seat from "@/models/Seats";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const seats = await Seat.find();

    const seatObject = {};
    let counter = 1; // 🔥 numeric numbering

    seats.forEach((doc) => {
      doc.seat.forEach((seatItem) => {
        seatObject[counter] = {
          _id: seatItem._id,
          isOccupied: !seatItem.isAvailable,
          row: doc.row,
          column: doc.column,
          parentId: doc._id,
        };

        counter++; // 🔥 increment
      });
    });

    return NextResponse.json({
      success: true,
      data: seatObject,
    });
  } catch (error) {
    console.error("API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        data: {},
        message: "Failed to fetch seats",
      },
      { status: 500 }
    );
  }
}