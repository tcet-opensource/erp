import express from "express";
import assingmentController from "#controller/assignment";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  assingmentController.addAssignment,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  assingmentController.getAssignment,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  assingmentController.updateAssignment,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  assingmentController.deleteAssignment,
);

export default router;
