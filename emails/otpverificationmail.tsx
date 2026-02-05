import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
} from "@react-email/components";

type OtpEmailProps = {
  otp: string;
};

export default function OtpEmail({ otp }: OtpEmailProps) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>
            Your OTP Code
          </Heading>

          <Text style={text}>
            Use the OTP below to verify your account:
          </Text>

          <Text style={otpStyle}>
            {otp}
          </Text>

          <Text style={footer}>
            This OTP is valid for 5 minutes. Do not share it with anyone.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

/* styles */
const main = {
  backgroundColor: "#f4f4f4",
  fontFamily: "Arial, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  padding: "24px",
  borderRadius: "8px",
  textAlign: "center" as const,
};

const heading = {
  color: "#111",
};

const text = {
  color: "#555",
  fontSize: "14px",
};

const otpStyle = {
  fontSize: "28px",
  fontWeight: "bold",
  letterSpacing: "4px",
  margin: "20px 0",
  color: "#2563eb",
};

const footer = {
  fontSize: "12px",
  color: "#888",
};
