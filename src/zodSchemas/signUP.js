import z from 'zod'

export const usernameValidation = z.string()
.min(2,"Username must be atleast 4 carector")
.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character")

const signUpSchema = z.object({
    fristname: z.string(),
    lastname: z.string(),
    email: z.string().email("please enter valid email").regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "please enter valid email"),
    username: usernameValidation,
    password: z.string().min(8, "Enter minimum 8 carector password"),
});

export default signUpSchema;