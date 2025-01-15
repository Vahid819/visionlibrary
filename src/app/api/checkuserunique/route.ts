import dbConnect from "@/lib/dbConection";
import User from "@/model/User";
import { z } from "zod";
import usernameValidation from "@/zodSchemas/signUP";

const UsernameQuerySchema = z.object({
  username: usernameValidation,
});

export async function GET(request : Request) {
  await dbConnect();

  try {
    // Collect value from URL
    const { searchParams } = new URL(request.url);
    const queryParams = {
      username: searchParams.get("username") || "",
    }

    console.log("Extracted username from URL:", searchParams.get("username"));

    console.log("Received query params:", queryParams);

    // Validation with zod
    const result = UsernameQuerySchema.safeParse(queryParams);
    console.log("Validation result:", result);

    if (!result.success) {
      const usernameErrors = result.error.format().username?._errors || [];
      return new Response(
        JSON.stringify({
          success: false,
          message: usernameErrors?.length > 0 ? usernameErrors.join(", "): "Invalid query parameters",
        }),
        { status: 400 }
      );
    }

    const { username } = result.data;
    console.log(username)

    // Check if username exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Username is already taken!",
        }),
        { status: 400 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Username is unique",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error checking username:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error checking username",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
