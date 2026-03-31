import connectDB from "@/lib/db";
import UserModel from "@/models/User";

export async function POST(req) {
  await connectDB();

  try {
    const { email, otp } = await req.json();

    // ✅ Basic validation
    if (!email || !otp) {
      return new Response(
        JSON.stringify({ error: "Email and OTP are required" }),
        { status: 400 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify({ error: "User not found" }),
        { status: 404 }
      );
    }

    // 🔐 Check expiry FIRST (important)
    if (!user.otpExpiryDate || user.otpExpiryDate < new Date()) {
      return new Response(
        JSON.stringify({ error: "OTP has expired" }),
        { status: 400 }
      );
    }

    // ⚠️ Convert both to string (fix type issue)
    if (String(user.otp) !== String(otp)) {
      return new Response(
        JSON.stringify({ error: "Invalid OTP" }),
        { status: 400 }
      );
    }

    // ✅ Mark user verified
    user.userverified = true;

    // 🔥 Clear OTP after success (VERY IMPORTANT)
    user.otp = null;
    user.otpExpiryDate = null;

    await user.save();

    return new Response(
      JSON.stringify({ message: "OTP verified successfully" }),
      { status: 200 }
    );

  } catch (error) {
    console.error("Error during OTP verification:", error);

    return new Response(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}