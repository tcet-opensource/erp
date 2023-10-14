import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import courseworkController from "#controller/coursework";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  courseworkController.addCoursework,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  courseworkController.getCoursework,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  courseworkController.updateCoursework,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  courseworkController.deleteCoursework,
);

export default router;
