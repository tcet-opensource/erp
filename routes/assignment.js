import express from "express";
import assingmentController from "#controller/assignment";

const router = express.Router();
router.post("/add", assingmentController.addAssignment);
router.get("/list", assingmentController.getAssignment);
router.post("/update/:id", assingmentController.updateAssignment);
router.delete("/delete/:id", assingmentController.deleteAssignment);

export default router;
