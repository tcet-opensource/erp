import express from "express";
import practicalController from "#controller/practical";

const router = express.Router();

// Create a new Practical
router.post("/create", practicalController.addPractical);

// List Practical entities with optional filters
router.get("/list", practicalController.getPractical);

// Update Practical entities based on filters and update data
router.post("/update/:id", practicalController.updatePractical);

// Delete Practical entities based on filters
router.delete("/delete/:id", practicalController.deletePractical);

export default router;
