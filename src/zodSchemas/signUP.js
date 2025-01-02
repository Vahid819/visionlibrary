import z from 'zod'

const signUpSchema = z.object({
    fristname: z.string(),
    lastname: z.string(),
    email: z.string().email("please enter valid email").regex(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g, "please enter valid email"),
    username: z.string().min(4, "Enter minimum 4 carector username"),
    password: z.string().min(8, "Enter minimum 8 carector password"),
});

export default signUpSchema;