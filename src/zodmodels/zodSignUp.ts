import {z} from 'zod'

export const usernameValidation = z.string()
.min(4, "Enter must be atleast 4 characters")
.max(10, "Enter username must be no more than 10 characters")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")


export const signUpSchema = z.object({
    firstname: z.string(),
    lastname:z.string(),
    email: z.string().email({message: "invalid Email Address"}),
    username: usernameValidation,
    password: z.string().min(6, "enter minimum 6 charector are include")
})