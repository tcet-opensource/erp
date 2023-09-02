import express from "express";
import practicalController from "#controller/practical";

const router = express.Router();

// Create a new Practical
router.post("/practical/create", practicalController.createPractical);

// List Practical entities with optional filters
router.get("/practical/list", practicalController.listPractical);

// Update Practical entities based on filters and update data
router.post("/practical/update", practicalController.updatePractical);

// Delete Practical entities based on filters
router.post("/practical/delete", practicalController.deletePractical);

export default router;
