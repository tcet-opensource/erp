import express from "express";
import moduleController from "#controller/module";

const router = express.Router();

router.get("/list", moduleController.showModule);
router.get("/add", moduleController.addModule);

export default router;
