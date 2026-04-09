import { roblox } from "better-auth";
import z from "zod";

export const SeatSchema = z.object(
    {
        row: z.number().min(0),
        col: z.number().min(0),
        
    }
)