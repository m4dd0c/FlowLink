import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(3).max(40),
  email: z.string().min(1, "Email is required").email("Invalid email."),
  password: z.string().min(6).max(40),
});

export const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email."),
  password: z.string().min(6).max(40),
});
