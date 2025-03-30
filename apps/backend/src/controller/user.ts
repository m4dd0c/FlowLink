import prisma from "@flowlink/db";
import catchAsync from "@flowlink/exres/catchAsync";
import bcrypt from "bcryptjs";
import FlowError from "@flowlink/exres/FlowError";
import FlowResponse from "@flowlink/exres/FlowResponse";
import { userDTO } from "@flowlink/utils";
import { SignInSchema, SignUpSchema } from "../lib/zodSchemas/user";

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

  // transaction to create auth and user
  const tx = await prisma.$transaction(async (tx) => {
    const auth = await tx.auth.create({
      data: { name, email, password: hashedPassword },
    });
    await tx.user.create({
      data: {
        authId: auth.id,
      },
    });
    return auth;
  });

  // dto for safe user
  const safeUser = userDTO(tx);

  // send response
  return new FlowResponse({
    res,
    status: 201,
    message: "User signed-up successfully",
    data: safeUser,
  }).authenticate({ auth: safeUser.id });
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
    message: "User logged-in successfully",
    data: safeUser,
  }).authenticate({ auth: safeUser.id });
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

  // NOTE: May want to send user instead of auth. Since user contain zaps

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

// endpoint /sign-out
export const signOut = catchAsync(async (_req, res) => {
  // const user = (req as any).user;
  return new FlowResponse({
    res,
    status: 200,
    message: "User logged-out successfully",
  }).unauthenticate();
});
