import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Button,
  Hr,
} from "@react-email/components";

export default function OtpEmailTemplate({
  otp,
}) {
  return (
    <Html>
      <Head />

      <Preview>Your Vision Library OTP is {otp}</Preview>

      <Body
        style={{
          backgroundColor: "#f4f4f5",
          fontFamily:
            "Arial, Helvetica, sans-serif",
          padding: "40px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            background: "#ffffff",
            borderRadius: "12px",
            overflow: "hidden",
            border: "1px solid #e5e7eb",
          }}
        >
          {/* Header */}

          <Section
            style={{
              background: "#2563eb",
              padding: "30px",
              textAlign: "center",
            }}
          >
            <Heading
              style={{
                color: "#ffffff",
                margin: 0,
              }}
            >
              Vision Library
            </Heading>

            <Text
              style={{
                color: "#dbeafe",
                marginTop: "8px",
              }}
            >
              Study Room Management System
            </Text>
          </Section>

          {/* Body */}

          <Section
            style={{
              padding: "40px",
            }}
          >
            <Heading
              style={{
                color: "#111827",
              }}
            >
              Verify Your Email
            </Heading>

            <Text
              style={{
                color: "#4b5563",
                fontSize: "16px",
                lineHeight: "26px",
              }}
            >
              Welcome to Vision Library.
              Use the verification code below
              to complete your registration.
            </Text>

            {/* OTP */}

            <Section
              style={{
                textAlign: "center",
                margin: "40px 0",
              }}
            >
              <Text
                style={{
                  display: "inline-block",
                  padding: "18px 40px",
                  background: "#eff6ff",
                  border: "2px dashed #2563eb",
                  borderRadius: "10px",
                  fontSize: "36px",
                  fontWeight: "bold",
                  letterSpacing: "8px",
                  color: "#2563eb",
                  margin: 0,
                }}
              >
                {otp}
              </Text>
            </Section>

            <Text
              style={{
                color: "#4b5563",
              }}
            >
              This OTP is valid for
              <strong> 10 minutes</strong>.
            </Text>

            <Text
              style={{
                color: "#4b5563",
              }}
            >
              Do not share this code with
              anyone.
            </Text>

            <Hr />

            <Text
              style={{
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              If you didn't request this
              email, you can safely ignore
              it.
            </Text>
          </Section>

          {/* Footer */}

          <Section
            style={{
              background: "#f9fafb",
              padding: "20px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                color: "#6b7280",
                fontSize: "13px",
                margin: 0,
              }}
            >
              © {new Date().getFullYear()} Vision
              Library. All rights reserved.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}