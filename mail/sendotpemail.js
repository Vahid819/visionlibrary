export const otpEmailTemplate = (otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>OTP Verification</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, sans-serif;">

  <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; margin:auto; background:#ffffff; border-radius:10px; overflow:hidden;">
    
    <!-- Header -->
    <tr>
      <td style="background:#4F46E5; padding:20px; text-align:center; color:#ffffff;">
        <h1 style="margin:0;">Study Room App</h1>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding:30px; text-align:center;">
        <h2 style="color:#111827;">Verify Your Email</h2>
        <p style="color:#6B7280; font-size:16px;">
          Use the OTP below to complete your signup process.
        </p>

        <!-- OTP Box -->
        <div style="margin:30px 0;">
          <span style="
            display:inline-block;
            background:#EEF2FF;
            color:#4F46E5;
            font-size:32px;
            font-weight:bold;
            padding:15px 30px;
            border-radius:8px;
            letter-spacing:5px;
          ">
            ${otp}
          </span>
        </div>

        <p style="color:#6B7280;">
          This OTP will expire in <b>10 minutes</b>.
        </p>

        <p style="color:#9CA3AF; font-size:12px;">
          If you didn’t request this, you can ignore this email.
        </p>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background:#f9fafb; padding:15px; text-align:center; font-size:12px; color:#9CA3AF;">
        © ${new Date().getFullYear()} Study Room App. All rights reserved.
      </td>
    </tr>

  </table>

</body>
</html>
`;