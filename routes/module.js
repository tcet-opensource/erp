import express from "express";
import moduleController from "#controller/module";

const router = express.Router();

router.get("/list", moduleController.showModule);
router.post("/add", moduleController.addModule);
router.post("/update/:Id",moduleController.updateModule);
router.delete("/delete/:Id",moduleController.deleteModule);

export default router;
