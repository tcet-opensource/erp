import express from "express";
import examController from "#controller/exam";

const router = express.Router();
router.post("/add", examController.addExam);
router.get("/list", examController.getExam);
router.post("/update/:id", examController.updateExam);
router.delete("/delete/:id", examController.deleteExam);

export default router;
