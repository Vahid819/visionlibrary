import dbconnect from "@/lib/db";
import Seat from "@/models/Seats";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req, res) {
  await dbconnect();

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    const userId = session.user.id;
    const { seatNumber } = await req.json();

    const seats = [];

    for (let i = 1; i <= seatNumber; i++) {
      seats.push({
        seatNumber: i,
        isOccupied: false,
      });
    }

    await Seat.create({
      userId,
      seat: seats,
    });

    return NextResponse.json({
      success: true,
      message: `${seatNumber} seats created successfully`,
    });
  } catch (error) {
    console.log("ERROR:", error);
    console.log("MESSAGE:", error.message);

    if (error.errors) {
      console.log("VALIDATION:", error.errors);
    }

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function GET(req, res){
  await dbconnect();

  try {
    const session = await getServerSession(authOptions);

    const seatData = await Seat.findOne({
      userId: session.user.id,
    });

    return NextResponse.json({
      success: true,
      data: seatData,
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