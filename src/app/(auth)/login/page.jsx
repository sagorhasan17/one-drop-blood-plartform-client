"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button, toast } from "@heroui/react";

import { authClient } from "@/lib/auth-client";
import { FiEye, FiEyeOff, FiLock, FiMail, FiShield } from "react-icons/fi";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const inputData = Object.fromEntries(formData.entries());
    console.log("Form Data:", inputData);

    const { data, error } = await authClient.signIn.email({
      email: inputData.email, // required
      password: inputData.password, // required
      rememberMe: inputData.remember === "on", // optional
      callbackURL: "/",
    });
    if (!error) {
      toast.success("Login successful!");
      console.log("Login successful:", data);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center px-4 py-8">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-3xl bg-content1 shadow-2xl border border-default-100 lg:grid-cols-2">
        {/* Left Side */}
        <div className="hidden bg-linear-to-br from-red-600 via-red-500 to-red-700 p-8 lg:flex">
          <div className="flex h-full flex-col justify-between text-white">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <Image
                  src="/oneDropLogo.png"
                  alt="One Drop Blood"
                  width={50}
                  height={50}
                />

                <h2 className="text-2xl font-bold">One Drop Blood</h2>
              </div>

              <span className="rounded-full border border-white/20 px-3 py-1 text-xs">
                Save Lives Together
              </span>
            </div>

            <div className="text-center">
              <Image
                src="/oneDropLogo.png"
                alt="Blood Donation"
                width={180}
                height={180}
                className="mx-auto mb-6"
              />

              <h2 className="text-3xl font-bold leading-tight">
                Donate Blood
                <br />
                Save Lives
              </h2>

              <p className="mt-4 text-sm text-white/80">
                One donation can save up to three lives. Join our growing
                community of heroes.
              </p>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <FiShield />
              Trusted & Secure Platform
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 md:p-10">
          {/* Mobile Logo */}
          <div className="mb-6 flex justify-center lg:hidden">
            <Image
              src="/oneDropLogo.png"
              alt="One Drop Blood"
              width={70}
              height={70}
            />
          </div>

          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-black">Welcome Back</h1>

            <p className="mt-2 text-default-500">
              Please enter your details to access your donor dashboard.
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-semibold">
                Email Address
              </label>

              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-lg" />

                <input
                  type="email"
                  name="email"
                  placeholder="user@example.com"
                  className="h-14 w-full rounded-2xl border border-default-200 bg-transparent pl-12 pr-4 text-sm outline-none transition-all focus:border-red-500"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-semibold">Password</label>

                <Link
                  href="/forgot-password"
                  className="text-sm font-medium text-red-500 hover:text-red-400"
                >
                  Forgot Password?
                </Link>
              </div>

              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-lg" />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="h-14 w-full rounded-2xl border border-default-200 bg-transparent pl-12 pr-12 text-sm outline-none transition-all focus:border-red-500"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <FiEyeOff className="text-gray-400 text-lg" />
                  ) : (
                    <FiEye className="text-gray-400 text-lg" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                name="remember"
                className="accent-red-500"
              />
              <span>Remember me</span>
            </div>

            {/* Login Button */}
            <Button
              fullWidth
              type="submit"
              className="h-14 rounded-2xl bg-red-600 text-base font-semibold text-white hover:bg-red-700"
            >
              Log In
            </Button>
          </form>

          {/* Register */}
          <p className="mt-6 text-center text-sm text-default-500">
            {" Don't have an account? "}
            <Link
              href="/signup"
              className="font-semibold text-red-500 hover:text-red-400"
            >
              Register to Donate
            </Link>
          </p>

          {/* Security */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-default-400">
            <FiShield />
            Secure 256-bit Encryption
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
