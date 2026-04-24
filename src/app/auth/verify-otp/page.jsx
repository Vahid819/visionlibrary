"use client";

export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function VerifyOTPPage() {
  const params = useSearchParams();
  const router = useRouter();

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(60);

  // ⏱ Timer countdown
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
  const value = params.get("email");
  if (value) setEmail(value);
}, [params]);

  // ⚡ Auto submit when OTP complete
  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

  // ✅ Verify OTP
  const handleSubmit = async () => {
    if (otp.length !== 6 || loading) return;

    setLoading(true);
    setError("");

    if (!email) return;

    try {
      const res = await fetch("/api/auth/otpverification", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Invalid OTP ❌");
      } else {
        // ✅ success redirect
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Something went wrong ⚠️");
    } finally {
      setLoading(false);
    }
  };

  // 🔁 Resend OTP
  const handleResend = async () => {
    if (timer > 0) return;

    try {
      await fetch("/api/auth/resend-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      setTimer(60); // reset timer
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-white to-cyan-100">
      
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-95"
      >
        <Card className="backdrop-blur-xl bg-white/60 border border-white/30 shadow-2xl rounded-2xl">
          <CardContent className="p-6 space-y-6 text-center">

            {/* Title */}
            <h2 className="text-2xl font-bold">Verify OTP 🔐</h2>

            <p className="text-sm text-gray-600">
              Enter the 6-digit code sent to
              <br />
              <span className="font-medium text-indigo-600">{email}</span>
            </p>

            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, i) => (
                    <InputOTPSlot key={i} index={i} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* ❌ Error Message */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            {/* Button */}
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Button
                onClick={handleSubmit}
                disabled={loading || otp.length !== 6}
                className="w-full bg-indigo-600 hover:bg-indigo-700"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </Button>
            </motion.div>

            {/* Resend */}
            <p className="text-sm text-gray-500">
              Didn’t receive code?{" "}
              <span
                onClick={handleResend}
                className={`cursor-pointer hover:underline ${
                  timer > 0
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-indigo-600"
                }`}
              >
                {timer > 0 ? `Resend in ${timer}s` : "Resend"}
              </span>
            </p>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}