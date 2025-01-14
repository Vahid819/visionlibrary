
import dbConnect from "@/lib/dbConection";
import User from "@/model/User";
import bcrypt from "bcryptjs";


export async function POST(req) {
    // Ensure database connection
    await dbConnect();

    try {
        const { fristname, lastname, email, username, password } = await req.json();

        const existusername = await User.findOne({
            username,
        })

        // Check username is exist or not 
        if (existusername) {
            return Response.json({
                success: false,
                message: "Username is already taken"
            }, {
                status: 400
            })
        } else {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create and save the new user
            const newUser = new User({
                fristname,
                lastname,
                email,
                username,
                password: hashedPassword,
            });
            await newUser.save();
            // Respond with success
            return new Response(
                JSON.stringify({
                    success: true,
                    message: "User registered successfully",
                }),
                { status: 201 }
            );
        }


    } catch (error) {
        console.error("Something went wrong:", error);

        // Handle errors
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error registering user",
            }),
            { status: 500 }
        );
    }
}
