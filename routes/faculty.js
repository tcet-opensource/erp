import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import facultyController from "#controller/faculty";

const router = express.Router();
router.post(
  "/create",
  authenticateToken,
  authorization(["ADMIN"]),
  facultyController.addFaculty,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  facultyController.getFaculty,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  facultyController.updateFaculty,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  facultyController.deleteFaculty,
);

export default router;
