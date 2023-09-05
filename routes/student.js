import express from "express";
import studentController from "#controller/student";

const router = express.Router();
router.post("/create", studentController.createStudent);
router.get("/list", studentController.StudentList);
router.post("/update", studentController.updateStudentById);
router.post("/delete/:studentId", studentController.deleteStudentById);

export default router;
