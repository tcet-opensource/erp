import express from "express";
import assingmentController from "#controller/assignment";

const router = express.Router();
router.post("/add", assingmentController.addAssignment);
router.get("/list", assingmentController.getAssignment);
router.post("/update", assingmentController.updateAssignment);
router.post("/delete", assingmentController.deleteAssignment);

export default router;