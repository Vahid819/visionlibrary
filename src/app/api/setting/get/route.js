import connectDB from "@/lib/db";
import Seat from "@/models/Seats";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function GET(res){
    const session = await getServerSession(authOptions)
    await connectDB();
    try {
        const id = await session.user.id
        const userid = await Seat.findOne(id);
        if(!userid){
            console.log("user id not found ")
            return
        }
        console.log({row , cols } = await Seat. find(row, column))
        return new Response(JSON.stringify({message: "data will show"}), {status: 201})
        
    } catch (error) {
        console.error("user data not featuch", error);
        return new Response(JSON.stringify({error: "Failed to featuch data"}), { status: 400 });
    }
}