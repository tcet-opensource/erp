import express from "express";
import studentController from "#controller/student";

const router = express.Router();
router.post("/create", studentController.addStudent);
router.get("/list", studentController.getStudent);
router.post("/update/:id", studentController.updateStudent);
router.delete("/delete/:id", studentController.deleteStudent);

export default router;
