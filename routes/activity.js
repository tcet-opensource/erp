import express from "express";
import activityController from "#controller/activity";

const router=express.Router();
router.post("/add",activityController.addActivity);
router.get("/list",activityController.getActivity);
router.post("/update/:id",activityController.updateActivity);
router.delete("/delete/:id",activityController.deleteActivity);

export default router;