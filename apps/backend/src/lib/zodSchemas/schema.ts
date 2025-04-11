import { z } from "zod";

const SignUpSchema = z.object({
  name: z.string().min(3).max(40),
  email: z.string().min(1, "Email is required").email("Invalid email."),
  password: z.string().min(6).max(40),
});

const SignInSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email."),
  password: z.string().min(6).max(40),
});

const ZapIdSchema = z.object({
  zapId: z.string().min(1, "ZapId is required").cuid("Invalid zap id."),
});

export { SignUpSchema, SignInSchema, ZapIdSchema };
