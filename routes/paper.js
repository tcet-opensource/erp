import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import paperController from "#controller/paper";

const router = express.Router();

router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  paperController.addPaper,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  paperController.showPaper,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  paperController.updatePaper,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  paperController.deletePaper,
);

export default router;
