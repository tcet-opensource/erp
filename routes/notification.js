import express from "express";
import notificationController from "#controller/notification";

const router = express.Router();

// Create a new Notification
router.post("/add", notificationController.addNotification);

// List Notification entities with optional filters
router.get("/list", notificationController.getNotifications);

// Update Notification entities based on filters and update data
router.post("/update/:id", notificationController.updateNotification);

// Delete Notification entities based on ID
router.delete("/delete/:id", notificationController.deleteNotification);

export default router;
