import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters"),

  email: z.email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

  mobile: z
    .string()
    .length(10, "Mobile number must be 10 digits")
    .optional()
    .or(z.literal("")),
});

export const loginSchema = z.object({
  email: z.email("Invalid email"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<
  typeof registerSchema
>;

export type LoginFormData = z.infer<
  typeof loginSchema
>;