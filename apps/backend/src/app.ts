import express, { type Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware";
import { FRONTEND_URL } from ".";

dotenv.config({ path: ".env" });

export const app: Express = express();

const corsOptions = {
  origin: FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
setupRoutes();

app.use(errorMiddleware);
