import Seat from "@/models/Seats";
import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserModel from "@/models/User";

export async function POST(req) {
  const session = await getServerSession(authOptions);
  await connectDB();

  try {
    if (!session) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const body = await req.json();
    const { rows, cols } = body;
 
    // ✅ generate seats (FIXED)
   const seats = Array.from({ length: rows * cols }, (_, index) => ({
  seatNumber: `${index + 1}`, // 1, 2, 3...
  isAvailable: true,
}));

    const userid = await Seat.findOne({ id: session.user.id });
    if(!userid){
      const newSeatting = new Seat({
        id: session.user.id,
        row: rows,
        column: cols,
        seat: seats,
        seatUpdatedAt: new Date(),
      })
      await newSeatting.save()
    }else{
     await Seat.findOneAndUpdate(
      { id: session.user.id },
      {
        row: rows,
        column: cols,
        seat: seats,
        seatUpdatedAt: new Date(),
      },
      {
        new: true,
        upsert: true,
      }
    );}

    return new Response(
      JSON.stringify({
        success: true,
        message: "Seatting saved/updated successfully",
        // data: updatedSeatting,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating seatting:", error);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to update seatting",
      }),
      { status: 500 }
    );
  }
}