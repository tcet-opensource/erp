import express from "express";
import organizationController from "#controller/organization";

const router = express.Router();
router.get("/list", organizationController.showOrganization);
router.post("/add", organizationController.addOrganization);
router.delete("/delete/:organizationId", organizationController.deleteOrganization);
router.post("/update", organizationController.updateOrganization);

export default router;
