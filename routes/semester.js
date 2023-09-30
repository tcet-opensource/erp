import express from "express";
import semesterController from "#controller/semester";

const router = express.Router();
router.post("/add", semesterController.addSemester);
router.get("/list", semesterController.getSemester);
router.post("/update/:id", semesterController.updateSemester);
router.delete("/delete/:id", semesterController.deleteSemester);

export default router;
