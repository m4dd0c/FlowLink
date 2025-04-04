import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { FRONTEND_URL } from ".";
import cookieParser from "cookie-parser";
import { setupRoutes } from "./route";
import error from "@flowlink/exres/error";
import path from "path";
import FlowResponse from "@flowlink/exres/FlowResponse";

// Setting .env.backend file as centralized .env file for all backend apps.
dotenv.config({ path: path.resolve(__dirname, "../../../.env.backend") });

export const app: Express = express();

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

// Routes
setupRoutes();

// Default route.
app.get("/", (_req, res) => {
  new FlowResponse({
    res,
    status: 200,
    message: "Welcome to Flowlink Primary Backend",
  }).send();
});

app.use(error);
