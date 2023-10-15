import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import tutorialController from "#controller/tutorial";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  tutorialController.addTutorial,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  tutorialController.showTutorial,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  tutorialController.updateTutorial,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  tutorialController.deleteTutorial,
);

export default router;
