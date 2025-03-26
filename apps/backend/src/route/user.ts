import express from "express";

const router = express.Router();

router.route("/sign-up").post(signUp);
router.route("/sign-in").post(signIn);
router.route("/").get(isAuth, getUser);
