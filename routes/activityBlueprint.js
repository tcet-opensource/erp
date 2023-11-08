import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import activityBlueprintController from "#controller/activityBlueprint";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityBlueprintController.addActivityBP,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityBlueprintController.getActivityBP,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityBlueprintController.updateActivityBP,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  activityBlueprintController.deleteActivityBP,
);

export default router;
