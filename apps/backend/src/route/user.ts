import express from "express";
import { signUp, signIn, getUser } from "../controller/user";
import { isAuth } from "../middleware/isAuth";

const router: express.Router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/").get(isAuth, getUser);

export default router;
