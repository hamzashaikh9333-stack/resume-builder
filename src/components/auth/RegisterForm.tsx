"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

import { registerSchema, RegisterFormData } from "@/schemas/auth.schema";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setApiError("");
      setSuccess("");

      const response = await authService.register(data);

      setSuccess(response.message);

      router.push("/dashboard");

      
    } catch (error: unknown) {
      const err = error as AxiosError<{
        message: string;
      }>;

      setApiError(err.response?.data?.message ?? "Something went wrong");
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white">Create Account</h2>

        <p className="mt-2 text-slate-400">
          Start building your professional resume.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
          <div>
            <input
              {...register("name")}
              placeholder="Full Name"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
            )}
          </div>

          <div>
            <input
              {...register("email")}
              placeholder="Email Address"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              placeholder="Password"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-white outline-none focus:border-blue-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3.5 text-slate-400"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>

            {errors.password && (
              <p className="mt-1 text-sm text-red-400">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <input
              {...register("mobile")}
              placeholder="Mobile Number"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-blue-500"
            />

            {errors.mobile && (
              <p className="mt-1 text-sm text-red-400">
                {errors.mobile.message}
              </p>
            )}
          </div>

          {success && <p className="text-green-400 text-sm">{success}</p>}

          {apiError && <p className="text-red-400 text-sm">{apiError}</p>}

          <button
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            {isSubmitting ? "Creating Account..." : "Create Account"}
          </button>

          <p className="text-center text-slate-400">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
