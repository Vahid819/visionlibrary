import zod from "zod";

export const ZodUserSchema = zod.object({
    fname: zod.string().min(1).max(100).trim(),
    lname: zod.string().min(1).max(100).trim(),
    email: zod.string().email().max(255).trim().toLowerCase().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/),
    username: zod.string().min(3).max(30).trim().regex(/^[a-zA-Z0-9_]{3,30}$/).trim(),
    password: zod.string().min(6).regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/),
})