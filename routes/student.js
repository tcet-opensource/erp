import express from "express";
import studentController from "#controller/student";

const router = express.Router();
router.post("/create", studentController.addStudent);
router.get("/list", studentController.getStudent);
router.post("/update", studentController.updateStudent);
router.post("/delete/:studentId", studentController.deleteStudent);

export default router;
