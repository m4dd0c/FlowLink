import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { errorMiddleware } from "./middleware/errorMiddleware";

dotenv.config({ path: ".env" });

export const app = express();

const FRONTED_URL = process.env.FRONTED_URL || "http://localhost:3000";
const PORT = process.env.PORT || 4000;

const corsOptions = {
  origin: FRONTED_URL,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

// Routes
setupRoutes();

app.use(errorMiddleware);
