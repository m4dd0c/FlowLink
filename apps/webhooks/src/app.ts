import express, { Express } from "express";

export const app: Express = express();

app.get("/hooks/catch/:userId/:zapId", (req, res) => {
  const { userId, zapId } = req.params;
  console.log(`User ${userId} has Zap ${zapId}`);

  res.sendStatus(200);
});
