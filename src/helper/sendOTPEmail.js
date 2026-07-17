import { resend } from "./resend";
import OtpEmailTemplate from "@/components/emails/OtpEmailTemplate";

export async function sendOTPEmail(email, otp) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Vision Library <onboarding@resend.dev>", // Replace with your verified domain later
      to: email,
      subject: "Verify Your Email",
      react: (
        <OtpEmailTemplate
          otp={otp}
        />
      ),
    });

    if (error) {
      return {
        success: false,
        error,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
}