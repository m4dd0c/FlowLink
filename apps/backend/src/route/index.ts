import express from "express";
import { app } from "../app";
import FlowResponse from "@flowlink/exres/FlowResponse";

const router = express.Router();

const routes = {
  user: require("./user"),
};

export const setupRoutes = () => {
  app.use("/api");
  // default route
  // other imp routes
};
