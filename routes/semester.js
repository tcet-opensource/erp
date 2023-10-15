import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import semesterController from "#controller/semester";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN"]),
  semesterController.addSemester,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  semesterController.getSemester,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  semesterController.updateSemester,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  semesterController.deleteSemester,
);

export default router;
