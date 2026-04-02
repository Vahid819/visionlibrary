import z from "zod";

export const studentSchema = z.object({
    name: {
        type: z.string().min(1, "Name is required"),
    },
    phone: {
        type: z.string().min(10, "Phone number is required").max(10, "Phone number must be 10 digits"),
    },
    email: {
        type: z.string().email("Invalid email address"),
    },
    course: {
        type: z.string().min(1, "Course is required"),
    },
    education: {
        type: z.string().min(1, "Education is required"),
    },
    batch: {
        type: z.date().refine((date) => date >= new Date(), {
            message: "Batch date must be in the future",
        }),
    },
    gender: {
        type: z.enum(["Male", "Female", "Other"], "Invalid gender").refine((gender) => gender !== "", {
            message: "Gender is required",
        }),
    },

});