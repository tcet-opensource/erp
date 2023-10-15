import express from "express";

import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import infrastructureController from "#controller/infrastructure";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN"]),
  infrastructureController.addInfrastructure,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  infrastructureController.getInfrastructure,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  infrastructureController.updateInfrastructure,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  infrastructureController.deleteInfrastructure,
);

export default router;
