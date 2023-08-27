import express from "express";
import infrastructureController from "#controller/infrastructure";

const router = express.Router();
router.post("/add", infrastructureController.addInfrastructure);
router.get("/list", infrastructureController.getInfrastructure);
router.post("/update", infrastructureController.updateInfrastructure);
router.post("/delete/:infrastructureId", infrastructureController.deleteInfrastructure);

export default router;
