import prisma from "@flowlink/db";
import catchAsync from "@flowlink/exres/catchAsync";
import bcrypt from "bcryptjs";
import FlowError from "@flowlink/exres/FlowError";
import { z } from "zod";
import FlowResponse from "@flowlink/exres/FlowResponse";
import { userDTO } from "@flowlink/utils";

const SignUpSchema = z.object({
  name: z.string().min(3).max(40),
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string().min(6).max(40),
});

const SignInSchema = z.object({
  email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  password: z.string().min(6).max(40),
});

// endpoint /sign-up
export const signUp = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });

  const { name, email, password } = req.body;
  const validation = SignUpSchema.safeParse({ name, email, password });
  if (!validation.success)
    return flowError.send({
      status: 422,
      message: "Invalid input",
    });

  // checking if user already exists
  const exists = await prisma.auth.findUnique({ where: { email } });
  if (exists)
    return flowError.send({
      status: 400,
      message: "Email is already in use. Please try signing-in.",
    });

  // hashing password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user
  const user = await prisma.auth.create({
    data: { name, email, password: hashedPassword },
  });

  // dto for safe user
  const safeUser = userDTO(user);

  // send response
  return new FlowResponse({
    res,
    status: 201,
    message: "User created successfully",
    data: safeUser,
  }).send({ auth: safeUser.id });
});

// endpoint /sign-in
export const signIn = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });
  const { email, password } = req.body;
  const validation = SignInSchema.safeParse({ email, password });
  if (!validation.success) {
    return flowError.send({
      status: 422,
      message: "Invalid input",
    });
  }
  // checking if user exists
  const user = await prisma.auth.findUnique({ where: { email } });
  if (!user)
    return flowError.send({
      status: 401,
      message: "Invalid Email or Password",
    });

  // checking password
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch)
    return flowError.send({
      status: 401,
      message: "Invalid Email or Password",
    });

  // dto for safe user
  const safeUser = userDTO(user);

  // send response
  return new FlowResponse({
    res,
    status: 200,
    message: "User logged in successfully",
    data: safeUser,
  }).send({ auth: safeUser.id });
});

// endpoint /user
export const getUser = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });
  const user = (req as any).user;

  if (!user) {
    return flowError.send({
      status: 401,
      message: "Unauthorized access.",
    });
  }

  // dto for safe user
  const safeUser = userDTO(user);

  // send response
  return new FlowResponse({
    res,
    status: 200,
    message: "Success",
    data: safeUser,
  }).send();
});
