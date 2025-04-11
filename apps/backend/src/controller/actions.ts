import catchAsync from "@flowlink/exres/catchAsync";
import FlowError from "@flowlink/exres/FlowError";
import prisma from "@flowlink/db";
import FlowResponse from "@flowlink/exres/FlowResponse";

export const availableActions = catchAsync(async (req, res) => {
  const flowError = new FlowError({ res });
  const user = (req as any).user;

  if (!user)
    return flowError.send({
      status: 401,
      message: "Unauthorized access.",
    });

  const availableActions = await prisma.availableActions.findMany({});
  return new FlowResponse({ res, data: availableActions }).send();
});
