import express from "express";
import tutorialController from "#controller/tutorial";

const router = express.Router();
router.post("/add", tutorialController.addTutorial);
router.get("/list", tutorialController.showTutorial);
router.post("/update", tutorialController.updateTutorial);
router.post("/delete", tutorialController.deleteTutorial);

export default router;
