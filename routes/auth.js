import express from "express";
import authController from "#controller/auth";

const router = express.Router();
router.post("/", authController.login);
router.post("/validateUser", authController.validateUser);
router.post("/sendOTP", authController.sendOTP);
router.post("/resetPassword", authController.resetPassword);

export default router;
