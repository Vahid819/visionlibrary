import zod from "zod";

export const UserZodSchema = zod.object({
    fname: zod.string().min(1, "First name is required"),
    lname: zod.string().min(1, "Last name is required"),
    email: zod.string().email("Invalid email address").regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address").trim(),
    otp : zod.number().min(100000, "OTP must be a 6-digit number").max(999999, "OTP must be a 6-digit number"),
    password: zod.string().min(6, "Password must be at least 6 characters long"),
})