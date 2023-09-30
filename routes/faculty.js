import express from "express";
import facultyController from "#controller/faculty";

const router = express.Router();
router.post("/create", facultyController.addFaculty);
router.get("/list", facultyController.getFaculty);
router.post("/update/:id", facultyController.updateFaculty);
router.delete("/delete/:id", facultyController.deleteFaculty);

export default router;
