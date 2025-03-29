import prisma from "@flowlink/db";
import catchAsync from "@flowlink/exres/catchAsync";
import FlowError from "@flowlink/exres/FlowError";
import FlowResponse from "@flowlink/exres/FlowResponse";
import express, { Express } from "express";

export const app: Express = express();

const isAuth = catchAsync(async (req, res, next) => {
  next();
});

const zapController = catchAsync(async (req, res, next) => {
  const { userId, zapId } = req.params;
  if (!userId || !zapId)
    return next(
      new FlowError({ res, status: 422, message: "Invalid request" }).send(),
    );

  const metadata = req.body;

  console.log(`User ${userId} has Zap ${zapId}`);

  await prisma.$transaction(async (tx) => {
    const run = await tx.zapRun.create({
      data: {
        zapId: zapId,
        metadata,
      },
    });
    await tx.zapRunOutbox.create({
      data: {
        zapRunId: run.id,
      },
    });
  });
  return new FlowResponse({
    res,
    status: 200,
    message: "Webhook received",
  }).send();
});

app.post("/hooks/catch/:userId/:zapId", isAuth, zapController);
