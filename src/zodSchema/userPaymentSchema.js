import z from "zod";

export const userPaymentSchema = z.object({
  upiid: z.string().optional(),
});