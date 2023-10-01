import express from "express";
import tutorialController from "#controller/tutorial";

const router = express.Router();
router.post("/add", tutorialController.addTutorial);
router.get("/list", tutorialController.showTutorial);
router.post("/update/:id", tutorialController.updateTutorial);
router.delete("/delete/:id", tutorialController.deleteTutorial);

export default router;
