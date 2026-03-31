import { transporter } from "@/lib/mailer"
import { otpEmailTemplate } from "../../mail/sendotpemail";

export const sendOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: `"Study Room App" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Your OTP Code",
    html: otpEmailTemplate(otp),
  });
};