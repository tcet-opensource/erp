import express from "express";
import userController from "#controller/user";

const router = express.Router();

router.post("/add", userController.addUser);
router.get("/get", userController.getAllUser);

export default router;
