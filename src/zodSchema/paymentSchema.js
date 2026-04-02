import z from "zod";

export const paymentSchema = z.object({
  paymenttype: {
    type: z
      .enum(["cash", "online"], "Invalid payment type")
      .refine((type) => type !== "", {
        message: "Payment type is required",
      }),
  },
  paymentdate: {
    type: z.date().default(new Date()),
  }
});

