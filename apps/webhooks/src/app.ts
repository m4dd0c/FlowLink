import error from "@flowlink/exres/error";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import zapRoute from "./routes";
import dotenv from "dotenv";
import FlowResponse from "@flowlink/exres/FlowResponse";
import path from "path";

// Setting .env.backend file as centralized .env file for all backend apps.
dotenv.config({ path: path.resolve(__dirname, "../../../.env.backend") });

export const app: Express = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/hooks", zapRoute);

// Default route.
app.get("/", (_req, res) => {
  new FlowResponse({
    res,
    status: 200,
    message: "Welcome to Flowlink Webhooks",
  }).send();
});

app.use(error);
