import express from "express";
import { isAuth } from "../middleware/isAuth";
import { availableActions } from "../controller/actions";

const router: express.Router = express.Router();

router.route("/available").get(isAuth, availableActions);

export default router;
