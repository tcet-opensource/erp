import express from "express";
import activityController from "#controller/activity";

const router=express.Router();
router.post ("/add",activityController.addActivity);
router.get("/list",activityController.getActivity);
router.post("/update",activityController.updateActivity);
router.post("/delete",activityController.deleteActivity);

export default router;