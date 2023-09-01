import express from "express";
import assingmentController from "#controller/assingment";

const router = express.Router();
router.post("/add", assingmentController.addAssingment);
router.get("/list", assingmentController.getAssingment);
router.post("/update", assingmentController.updateAssingment);
router.post("/delete", assingmentController.deleteAssingment);

export default router;