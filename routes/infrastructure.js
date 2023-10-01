import express from "express";
import infrastructureController from "#controller/infrastructure";

const router = express.Router();
router.post("/add", infrastructureController.addInfrastructure);
router.get("/list", infrastructureController.getInfrastructure);
router.post("/update/:id", infrastructureController.updateInfrastructure);
router.delete("/delete/:id", infrastructureController.deleteInfrastructure);

export default router;
