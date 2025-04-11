import prisma from "@flowlink/db";
import catchAsync from "@flowlink/exres/catchAsync";
import FlowError from "@flowlink/exres/FlowError";
import FlowResponse from "@flowlink/exres/FlowResponse";
import { ZapIdSchema } from "../lib/zodSchemas/schema";

export const createZap = catchAsync(async (req, res) => {});

export const getZaps = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });
  const user = (req as any).user;
  if (!user)
    return flowError.send({
      status: 401,
      message: "Unauthorized access.",
    });

  const zaps = await prisma.zap.findMany({
    where: { userId: user.id },
    include: {
      trigger: {
        select: { type: true },
      },
      actions: {
        select: { type: true },
      },
    },
  });

  return new FlowResponse({ res, data: zaps }).send();
});

export const getSingleZap = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });

  const { zapId } = req.params;

  const validation = ZapIdSchema.safeParse(zapId);
  if (!validation.success)
    return flowError.send({
      status: 422,
      message: "Invalid input",
    });

  const user = (req as any).user;
  if (!user)
    return flowError.send({
      status: 401,
      message: "Unauthorized access.",
    });

  const zap = await prisma.zap.findFirst({
    where: { id: zapId, userId: user.id },
    include: {
      trigger: {
        select: { type: true },
      },
      actions: {
        select: { type: true },
      },
    },
  });

  return new FlowResponse({ res, data: zap }).send();
});

export const deleteZap = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });

  const { zapId } = req.params;

  const validation = ZapIdSchema.safeParse(zapId);
  if (!validation.success)
    return flowError.send({
      status: 422,
      message: "Invalid input",
    });

  const user = (req as any).user;
  if (!user)
    return flowError.send({
      status: 401,
      message: "Unauthorized access.",
    });

  await prisma.zap.delete({
    where: { id: zapId, userId: user.id },
  });

  return new FlowResponse({ res, message: "Zap deleted successfully." }).send();
});
