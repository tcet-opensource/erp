import express from "express";
import organizationController from "#controller/organization";

const router = express.Router();
router.get("/list", organizationController.showOrganization);
router.post("/add", organizationController.addOrganization);
router.delete("/delete/:id", organizationController.deleteOrganization);
router.post("/update/:id", organizationController.updateOrganization);

export default router;
