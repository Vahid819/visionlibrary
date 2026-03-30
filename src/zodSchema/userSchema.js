import zod from "zod";

export const userSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 character")
      .max(20)
      .required(),
    lastname: z.string().min(2, "Name must be at least 2 character").max(20),
    email: z
      .string()
      .email("Invalid email address")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email")
      .unique()
      .trim()
      .required(),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/\d/, "Must include a number"),
    comfermpassword: z.string().required(),
    otp: z.number().required(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
