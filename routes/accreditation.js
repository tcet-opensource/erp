import express from "express";
import accreditationController from "#controller/accreditation";

const router = express.Router();
router.get("/list", accreditationController.showAccreditation);
router.post("/add", accreditationController.addAccreditation);
router.delete("/delete/:id", accreditationController.deleteAccreditation);
router.post("/update/:id", accreditationController.updateAccreditation);

export default router;
