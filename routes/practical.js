import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import practicalController from "#controller/practical";

const router = express.Router();

// Create a new Practical
router.post(
  "/create",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  practicalController.addPractical,
);

// List Practical entities with optional filters
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  practicalController.getPractical,
);

// Update Practical entities based on filters and update data
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  practicalController.updatePractical,
);

// Delete Practical entities based on filters
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  practicalController.deletePractical,
);

export default router;
