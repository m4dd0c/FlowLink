import prisma from "@flowlink/db";
import catchAsync from "@flowlink/exres/catchAsync";
import FlowError from "@flowlink/exres/FlowError";
import FlowResponse from "@flowlink/exres/FlowResponse";
import { ZapCreateSchema, ZapIdSchema } from "../lib/zodSchemas/schema";

export const createZap = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });

  const { title, availableTriggerId, triggerMetadata, actions } = req.body;

  const validation = ZapCreateSchema.safeParse({
    availableTriggerId,
    triggerMetadata,
    actions,
  });
  if (!validation.success)
    return flowError.send({
      status: 422,
      message: "Invalid input",
    });

  // availableTriggerId: z.string(),
  // triggerMetadata: z.any().optional(),
  // actions: z.array(
  //   z.object({
  //     availableActionId: z.string(),
  //     actionMetadata: z.any().optional(),
  //   }),
  // ),

  const user = (req as any).user;
  if (!user)
    return flowError.send({
      status: 401,
      message: "Unauthorized access.",
    });

  const zap = await prisma.$transaction(async (tx) => {
    const zap = await tx.zap.create({
      data: {
        userId: user.id,
        title,
        triggerId: "",
        actions: {
          create: validation.data.actions.map((action, idx) => ({
            actionId: action.availableActionId,
            sortingOrder: idx,
            metadata: action.actionMetadata,
          })),
        },
      },
    });
    const trigger = await tx.trigger.create({
      data: {
        triggerId: validation.data.availableTriggerId,
        zapId: zap.id,
      },
    });
    await tx.zap.update({
      where: { id: zap.id, userId: user.id },
      data: {
        triggerId: trigger.id,
      },
    });
    return zap.id;
  });

  return new FlowResponse({ res, data: zap }).send();
});

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
