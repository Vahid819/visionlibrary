import { OtpEmailTemplate } from "@/components/emails/OtpEmailTemplate"
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({otp, email}) {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: email,
      subject: 'Verification email ',
      react: OtpEmailTemplate(otp),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}