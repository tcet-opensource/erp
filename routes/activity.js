import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import activityController from "#controller/activity";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityController.addActivity,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityController.getActivity,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityController.updateActivity,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityController.deleteActivity,
);

export default router;
