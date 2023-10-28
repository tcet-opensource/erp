import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import courseController from "#controller/course";

const router = express.Router();
router.post(
  "/create",
  authenticateToken,
  authorization(["ADMIN"]),
  courseController.addCourse,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  courseController.getCourse,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  courseController.updateCourse,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  courseController.deleteCourse,
);

export default router;
