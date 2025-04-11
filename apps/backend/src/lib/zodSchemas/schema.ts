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

const ZapCreateSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters.")
    .max(40, "Title must contain at most 40 characters."),
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    }),
  ),
});

export { SignUpSchema, SignInSchema, ZapIdSchema, ZapCreateSchema };
