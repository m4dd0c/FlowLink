import express from "express";
import { createZap, deleteZap, getSingleZap, getZaps } from "../controller/zap";
import { isAuth } from "../middleware/isAuth";

const router: express.Router = express.Router();

router.route("/").get(isAuth, getZaps).post(isAuth, createZap);
router.route("/:zapId").get(isAuth, getSingleZap).delete(isAuth, deleteZap);

export default router;
