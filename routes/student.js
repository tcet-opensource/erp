import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import studentController from "#controller/student";

const router = express.Router();
router.post(
  "/create",
  authenticateToken,
  authorization(["ADMIN"]),
  studentController.addStudent,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  studentController.getStudent,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  studentController.updateStudent,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  studentController.deleteStudent,
);

export default router;
