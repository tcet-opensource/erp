import express from "express";
import courseworkController from "#controller/coursework";

const router = express.Router();
router.post("/add", courseworkController.addCoursework);
router.get("/list", courseworkController.getCoursework);
router.post("/update", courseworkController.updateCoursework);
router.post("/delete/:courseworkId", courseworkController.deleteCoursework);

export default router;
