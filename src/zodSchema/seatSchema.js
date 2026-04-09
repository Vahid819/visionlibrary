import z from "zod";

export const seatSchema = z.object(
    {
        seatNumber: z.string().nonempty("Seat number is required"),
        isAvailable: z.boolean().default(true),
    }
)