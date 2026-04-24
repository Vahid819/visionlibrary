"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import userSchema from "@/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export default function Page() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message);
      } else {
        toast.success("OTP sent successfully 📧");
        router.push(`/auth/verify-otp?email=${data.email}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-[#0f172a] via-[#1e293b] to-[#020617] text-white">

      {/* Glow Background */}
      <div className="absolute w-100 h-100 bg-indigo-600/30 blur-3xl rounded-full top-10 left-10"></div>

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-100"
      >
        <Card className="backdrop-blur-xl bg-white/10 border border-white/10 shadow-2xl rounded-2xl">
          <CardContent className="p-6 space-y-5">

            {/* Title */}
            <h2 className="text-2xl font-bold text-center">
              Create Account 🚀
            </h2>

            {/* Form */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >

              {/* First + Last Name */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <Input
                    placeholder="First Name"
                    {...register("firstName")}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  {errors.firstName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <Input
                    placeholder="Last Name"
                    {...register("lastName")}
                    className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  />
                  {errors.lastName && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <Input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                {errors.password && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
                >
                  {isSubmitting ? "Creating..." : "Sign Up"}
                </Button>
              </motion.div>

            </form>

            {/* Login Link */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-center text-gray-300"
            >
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="text-indigo-400 hover:underline font-medium"
              >
                Login
              </Link>
            </motion.p>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}