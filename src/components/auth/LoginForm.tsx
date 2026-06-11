"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AxiosError } from "axios";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

import {
  loginSchema,
  LoginFormData,
} from "@/schemas/auth.schema";

export default function LoginForm() {
  const [showPassword, setShowPassword] =
    useState(false);

  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (
    data: LoginFormData
  ) => {
    try {
      const response =
        await authService.login(data);

      setSuccess(response.message);

      router.push("/dashboard");
      setApiError("");
    } catch (error: unknown) {
      const err = error as AxiosError<{
        message: string;
      }>;

      setApiError(
        err.response?.data?.message ??
          "Something went wrong"
      );
    }
  };

  return (
    <div className="flex items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 shadow-2xl">
        <h2 className="text-3xl font-bold text-white">
          Welcome Back
        </h2>

        <p className="mt-2 text-slate-400">
          Login to continue building resumes.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 space-y-4"
        >
          <input
            {...register("email")}
            placeholder="Email Address"
            className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white"
          />

          {errors.email && (
            <p className="text-sm text-red-400">
              {errors.email.message}
            </p>
          )}

          <div className="relative">
            <input
              type={
                showPassword ? "text" : "password"
              }
              {...register("password")}
              placeholder="Password"
              className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-white"
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
              }
              className="absolute right-4 top-3.5 text-slate-400"
            >
              {showPassword ? (
                <EyeOff size={20} />
              ) : (
                <Eye size={20} />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-red-400">
              {errors.password.message}
            </p>
          )}

          {success && (
            <p className="text-green-400 text-sm">
              {success}
            </p>
          )}

          {apiError && (
            <p className="text-red-400 text-sm">
              {apiError}
            </p>
          )}

          <button
            disabled={isSubmitting}
            className="w-full rounded-lg bg-blue-600 py-3 font-medium text-white hover:bg-blue-700"
          >
            {isSubmitting
              ? "Logging In..."
              : "Login"}
          </button>

          <p className="text-center text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-500 hover:underline"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}