import express, { Router } from "express";
import { isAuth } from "../middleware/isAuth";
import { runZap } from "../controller/runZap";

const router: Router = express.Router();

router.route("/catch/:userId/:zapId").post(isAuth, runZap);

export default router;
