"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  const res = await signIn("credentials", {
    email: form.email,
    password: form.password,
    redirect: false,
  });

  // console.log("SignIn Response:", res);
  setLoading(false);

  if (res?.error) {
    setError("Invalid email or password");
  } else if (res?.ok) {
    window.location.href = "/dashboard"; // ← replace router.push with this
  }
};

  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4 relative overflow-hidden">

      {/* 🌈 Soft Glow Background */}
      <div className="absolute w-100 h-100 bg-indigo-500/20 blur-3xl rounded-full -top-25 -left-25" />
      <div className="absolute w-75 h-75 bg-cyan-400/20 blur-3xl rounded-full -bottom-25 -right-25" />

      {/* 🔥 Card */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-8 text-white"
      >

        {/* Title */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold">Welcome Back 👋</h2>
          <p className="text-gray-400 text-sm">
            Login to your account
          </p>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-red-400 text-sm mb-3 text-center"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            className="bg-white/10 border-white/10 text-white placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500"
          />

          {/* Password */}
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="bg-white/10 border-white/10 text-white pr-10 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-400"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Forgot */}
          <div className="text-right text-sm text-gray-400">
            <Link href="/auth/forgot-password" className="hover:underline">
              Forgot Password?
            </Link>
          </div>

          {/* Button */}
          <motion.div whileHover={{ scale: 1.03 }}>
            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/30"
            >
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </motion.div>

        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-6 text-gray-400 text-sm">
          <div className="flex-1 h-px bg-white/10" />
          or
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Social */}
        <div className="space-y-2">
          <Button
            onClick={() => signIn("google")}
            className="w-full bg-white text-black"
          >
            Continue with Google
          </Button>

          <Button
            onClick={() => signIn("facebook")}
            className="w-full bg-blue-600"
          >
            Continue with Facebook
          </Button>
        </div>

        {/* Signup */}
        <p className="text-center text-sm text-gray-400 mt-6">
          Don’t have an account?{" "}
          <Link
            href="/auth/signup"
            className="text-indigo-400 hover:underline"
          >
            Create Account
          </Link>
        </p>

      </motion.div>
    </div>
  );
}