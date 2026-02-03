import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { ZodUserSchema } from "@/Schemas/zoduserschema";
import crypto from "crypto";
import { promisify } from "util";

export const runtime = "nodejs";

// Turn callback-based scrypt into a Promise-based function.
const scryptAsync = promisify(crypto.scrypt);

const hashPassword = async (password: string): Promise<string> => {
    // Generate a per-user random salt, then derive a key using scrypt.
    const salt = crypto.randomBytes(16).toString("hex");
    const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;
    // Store as "salt:hash" so we can verify later.
    return `${salt}:${derivedKey.toString("hex")}`;
};

export async function POST(request: Request) {
    try {
        // Parse request body and validate with Zod.
        const body = await request.json();
        const parsed = ZodUserSchema.safeParse(body);

        if (!parsed.success) {
            return NextResponse.json(
                { message: "Invalid input", errors: parsed.error.flatten() },
                { status: 400 }
            );
        }

        const { fname, lname, email, username, password } = parsed.data;

        // Ensure a single cached DB connection.
        await connectDB();

        // Check if email or username already exists.
        const existingUser = await User.findOne({
            $or: [{ email }, { username }],
        }).lean();

        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 409 }
            );
        }

        // Hash the password before storing it.
        const hashedPassword = await hashPassword(password);
        const user = await User.create({
            fname,
            lname,
            email,
            username,
            password: hashedPassword,
        });

        // Return a safe response without the password.
        return NextResponse.json(
            {
                message: "User created",
                user: {
                    id: user._id,
                    fname: user.fname,
                    lname: user.lname,
                    email: user.email,
                    username: user.username,
                },
            },
            { status: 201 }
        );
    } catch (error: unknown) {
        if (error instanceof SyntaxError) {
            return NextResponse.json(
                { message: "Invalid JSON body" },
                { status: 400 }
            );
        }

        // Handle duplicate key errors from MongoDB (unique indexes).
        if (
            typeof error === "object" &&
            error !== null &&
            "code" in error &&
            (error as { code?: number }).code === 11000
        ) {
            return NextResponse.json(
                { message: "Email or username already exists" },
                { status: 409 }
            );
        }

        console.error("Sign-up error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
