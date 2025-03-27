import prisma from "@flowlink/db";
import catchAsync from "@flowlink/exres/catchAsync";
import FlowError from "@flowlink/exres/FlowError";
import { verifySession } from "@flowlink/exres/jwt";

export const isAuth = catchAsync(async (req, res, next) => {
  const flowError = new FlowError({ res });

  const { token } = req.cookies;

  if (!token)
    return flowError.send({ status: 400, message: "You are not authorized" });

  const userId = verifySession(token);
  if (!userId)
    return flowError.send({ status: 400, message: "You are not authorized" });

  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user)
    return flowError.send({ status: 400, message: "You are not authorized" });

  (req as any).user = user;
  next();
});
