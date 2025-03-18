import express from "express";
import { app } from "../app";
import FlowResponse from "../services/FlowResponse";

const router = express.Router();

export const setupRoutes = () => {
  // default route
  app.use("/api", (req, res, next) => {
    new FlowResponse({ res }).send({
      message: "Welcome to the API",
    });
  });
  // other imp routes
};
