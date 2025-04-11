import { z } from "zod";

const SignupFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email address"),
  name: z.string().min(3, "Name must have at least 3 characters"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

const LoginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email address"),
  password: z.string().min(8, "Password must have at least 8 characters"),
});

const ContactFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email address"),
  name: z.string().min(3, "Name must have at least 3 characters"),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(1000, "Message length can not exceed 1,000 characters"),
});

export { LoginFormSchema, SignupFormSchema, ContactFormSchema };
