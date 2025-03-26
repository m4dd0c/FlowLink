import express from "express";
import { app } from "../app";
import expressHandler from "@flowlink/express-response-handler";

const router = express.Router();

export const setupRoutes = () => {
  // default route
  app.use("/api", (req, res, next) => {});
  // other imp routes
};
