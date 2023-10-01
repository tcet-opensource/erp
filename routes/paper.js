import express from "express";
import paperController from "#controller/paper";

const router = express.Router();

router.post("/add", paperController.addPaper);
router.get("/list", paperController.showPaper);
router.post("/update/:id", paperController.updatePaper);
router.delete("/delete/:id", paperController.deletePaper);

export default router;
