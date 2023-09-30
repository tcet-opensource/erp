import express from "express";
import moduleController from "#controller/module";

const router = express.Router();

router.get("/list", moduleController.showModule);
router.post("/add", moduleController.addModule);
router.post("/update/:id",moduleController.updateModule);
router.delete("/delete/:id",moduleController.deleteModule);

export default router;
