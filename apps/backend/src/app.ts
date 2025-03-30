import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { FRONTEND_URL } from ".";
import cookieParser from "cookie-parser";
import { setupRoutes } from "./route";
import error from "@flowlink/exres/error";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const app: Express = express();
console.log("prime cwd", process.cwd(), "seckk,", process.env.JWT_SECRET);

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

app.use(error);
