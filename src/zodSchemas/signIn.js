import {z} from 'zod';

const loginSchema = z.object({
    username: z.string().min(4, "username must be atlast 4 carector"),
    password: z.string().min(8, 'In password at last 8 carectors are required'),
})

export default loginSchema;