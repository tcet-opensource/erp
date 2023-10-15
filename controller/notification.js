import {
  createNotification,
  deleteNotificationById,
  listNotifications,
  updateNotificationById,
} from "#services/notification";
import { logger } from "#util";

async function addNotification(req, res) {
  const { data, title, type, from, filter } = req.body;
  try {
    const newNotification = await createNotification({
      data,
      title,
      type,
      from,
      filter,
    });
    res.json({
      res: `Added notification with ID: ${newNotification.id}`,
      id: newNotification.id,
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ error: "Error while inserting in DB" });
  }
}

async function updateNotification(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateNotificationById(id, data);
    res.json({ res: `Updated notification with ID: ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ error: "Error while updating in DB" });
  }
}

async function getNotifications(req, res) {
  const filter = req.body;
  const { limit, page } = req.query;
  const notificationList = await listNotifications(filter, limit, page);
  res.json({ res: notificationList });
}

async function deleteNotification(req, res) {
  const { id } = req.params;
  try {
    await deleteNotificationById(id);
    res.json({ res: `Deleted notification with ID: ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  addNotification,
  deleteNotification,
  getNotifications,
  updateNotification,
};
