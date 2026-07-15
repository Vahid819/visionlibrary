import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOTPEmail(email, otp) {
  try {
    await resend.emails.send({
      from: "VisionArc <onboarding@resend.dev>",
      to: email,
      subject: "Verify your Email",
      html: `
        <h2>Welcome to VisionArc</h2>

        <p>Your OTP is:</p>

        <h1>${otp}</h1>

        <p>This OTP is valid for 10 minutes.</p>
      `,
    });

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      error,
    };
  }
}