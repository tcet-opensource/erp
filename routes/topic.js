import express from "express";
import topicController from "#controller/topic";

const router = express.Router();
router.get("/list", topicController.showTopic);
router.post("/add", topicController.addTopic);
router.delete("/delete/:id", topicController.deleteTopic);
router.post("/update/:id", topicController.updateTopic);

export default router;
