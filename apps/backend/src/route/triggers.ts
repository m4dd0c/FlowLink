import express from "express";
import { isAuth } from "../middleware/isAuth";
import { availableTriggers } from "../controller/triggers";

const router: express.Router = express.Router();

router.route("/").get(isAuth, availableTriggers);

export default router;
