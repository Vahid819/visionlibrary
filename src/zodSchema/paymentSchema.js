import z from "zod";

export const paymentSchema = z.object({
  upiId: z
    .string()
    .regex(/^[\w.-]+@[\w.-]+$/, "Invalid UPI ID format")
    .optional(),
  paymenttype: {
    type: z
      .enum(["cash", "online"], "Invalid payment type")
      .refine((type) => type !== "", {
        message: "Payment type is required",
      }),
  },
  paymentdate: {
    type: z.date().default(new Date()),
  },
});
