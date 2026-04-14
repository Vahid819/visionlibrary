import mongoose from "mongoose";
import Seat from "@/models/Seats";
import connectDB from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req){
    const session = await getServerSession(authOptions)
    await connectDB();

    try {
       const body = await req.json();
       console.log("Received body:", body);

       const { rows, cols } = body;
         const seatting = {
            rows,
            cols,
            seat: Array.from({ length: rows }, (_, rowIndex) =>
                Array.from({ length: cols }, (_, colIndex) => ({
                    seatNumber: `${String.fromCharCode(65 + rowIndex)}${colIndex + 1}`,
                    isAvailable: true,
                }))
            ),
        };
        // console.log("Constructed seatting:", seatting);
        const newSeatting = new Seat({
            id: session.user.id,
            row: rows,
            column: cols,
            seat: seatting.seat.flat(),
        });
        await newSeatting.save();   
       return new Response(JSON.stringify({ message: "Seatting updated successfully" }), { status: 200 });
    } catch (error) {
        console.error("Error updating seatting:", error);
        return new Response(JSON.stringify({ error: "Failed to update seatting" }), { status: 500 });
    }
}

