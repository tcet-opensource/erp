import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import organizationController from "#controller/organization";

const router = express.Router();
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  organizationController.showOrganization,
);
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN"]),
  organizationController.addOrganization,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  organizationController.deleteOrganization,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  organizationController.updateOrganization,
);

export default router;
