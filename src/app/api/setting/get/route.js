// app/api/seats/route.js
import { connectDB } from "@/lib/db";
import Seat from "@/models/Seats";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {

  const session = await getServerSession(authOptions);
  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }
  await connectDB();

  try {
    
    const seatting = await Seat.findOne({ id: session.user.id });

    if (!seatting) {
      return new Response(JSON.stringify({ error: "Seatting not found" }), {
        status: 404,
      });
    }
    return new Response(
      JSON.stringify({
        success: true,
        data: seatting,
      }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching seatting:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch seatting" }), {
      status: 500,
    });
  }
}