import error from "@flowlink/exres/error";
import cors from "cors";
import cookieParser from "cookie-parser";
import express, { Express } from "express";
import zapRoute from "./routes";
import dotenv from "dotenv";
import FlowResponse from "@flowlink/exres/FlowResponse";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, "../../../.env") });

export const app: Express = express();

console.log("webhook cwd", process.cwd(), "seckk,", process.env.JWT_SECRET);

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use("/hooks", zapRoute);
app.get("/", (_req, res) => {
  new FlowResponse({
    res,
    status: 200,
    message: "Welcome to Flowlink Webhooks",
  }).send();
});
app.use(error);
