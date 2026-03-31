"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import userSchema from "@/zodSchema/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner"

export default function page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(userSchema),
  });
  console.log(errors);

  const onSubmit = async (data) => {
    console.log("FORM DATA:", data); // 👈 add this
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
        alert(result.message);
      } else {
        toast.success("OTP sent successfully! Please check your email.");
        // ✅ redirect
        router.push(`/auth/verify-otp?email=${data.email}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onError = (errors) => {
    console.log("FORM ERRORS:", errors);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-white to-cyan-100">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-100"
      >
        <Card className="backdrop-blur-xl bg-white/60 shadow-2xl rounded-2xl">
          <CardContent className="p-6 space-y-5">
            <h2 className="text-2xl font-bold text-center">
              Create Account 🚀
            </h2>

            <form
              onSubmit={handleSubmit(onSubmit, onError)}
              className="space-y-4"
            >
              {/* First + Last Name */}
              <div className="flex gap-2">
                <div className="w-1/2">
                  <Input placeholder="First Name" {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="w-1/2">
                  <Input placeholder="Last Name" {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs">
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
                />
                {errors.email && (
                  <p className="text-red-500 text-xs">{errors.email.message}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <Input
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs">
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
                />
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Button */}
              <motion.div whileHover={{ scale: 1.03 }}>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700"
                >
                  {isSubmitting ? "Creating..." : "Sign Up"}
                </Button>
              </motion.div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
