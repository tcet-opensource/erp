import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import moduleController from "#controller/module";

const router = express.Router();

router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  moduleController.showModule,
);
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  moduleController.addModule,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  moduleController.updateModule,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  moduleController.deleteModule,
);

export default router;
