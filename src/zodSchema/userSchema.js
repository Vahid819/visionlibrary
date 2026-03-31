import { z } from "zod";

const userSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(20),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(20),

    email: z
      .string()
      .email("Invalid email address")
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please use a valid email")
      .trim(),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/\d/, "Must include a number"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default userSchema;