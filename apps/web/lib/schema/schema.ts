import { z } from "zod";

// User specific schemas
const SignupFormSchema = z.object({
  name: z
    .string()
    .min(3, "Name must have at least 3 characters")
    .max(40, "Name must have at most 40 characters."),
  email: z.string().min(1, "Email is required").email("Invalid Email address"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters.")
    .max(40, "Password must have at most 40 characters."),
});

const LoginFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email address"),
  password: z
    .string()
    .min(8, "Password must have at least 8 characters.")
    .max(40, "Password must have at most 40 characters."),
});

// Other schemas
const ContactFormSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid Email address"),
  name: z.string().min(3, "Name must have at least 3 characters"),
  message: z
    .string()
    .min(1, "Message is required.")
    .max(1000, "Message length can not exceed 1,000 characters"),
});

// Zaps specific schemas
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
      title: z
        .string()
        .min(3, "Title must contain at least 3 characters.")
        .max(40, "Title must contain at most 40 characters."),
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    }),
  ),
});

// TriggerNodeForm
const TriggerNodeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters.")
    .max(40, "Title must contain at most 40 characters."),
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
});

// ActionNodeForm
const ActionNodeSchema = z.object({
  title: z
    .string()
    .min(3, "Title must contain at least 3 characters.")
    .max(40, "Title must contain at most 40 characters."),
  availableActionId: z.string(),
  actionMetadata: z.any().optional(),
});

export {
  LoginFormSchema,
  SignupFormSchema,
  ContactFormSchema,
  ZapIdSchema,
  ZapCreateSchema,
  TriggerNodeSchema,
  ActionNodeSchema,
};
