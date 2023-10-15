// Import the Notification model
import Notification from "#models/notification";
import databaseError from "#error/database";

// Service function to create a new Notification entity
export async function createNotification({ data, title, type, from, filter }) {
  try {
    const newNotification = await Notification.create({
      data,
      title,
      type,
      from,
      filter,
    });
    return newNotification;
  } catch (error) {
    throw new databaseError.DataEntryError("notification");
  }
}

// Service function to update a Notification entity by ID
export async function updateNotificationById(id, data) {
  try {
    const updated = await Notification.update({ _id: id }, data);
    if (updated) {
      return updated;
    }
    throw new databaseError.DataEntryError("notification");
  } catch (error) {
    throw new databaseError.DataEntryError("notification");
  }
}

// Service function to retrieve a list of Notification entities based on filters
export async function listNotifications(filter, limit, page) {
  try {
    const notificationList = await Notification.read(filter, limit, page);
    return notificationList;
  } catch (error) {
    throw new databaseError.DataEntryError("notification");
  }
}

// Service function to delete a Notification entity by ID
export async function deleteNotificationById(notificationId) {
  try {
    const deleted = await Notification.deleteOne({ _id: notificationId });
    if (deleted.deletedCount > 0) {
      return deleted;
    }
    throw new databaseError.DataDeleteError("notification");
  } catch (error) {
    throw new databaseError.DataDeleteError("notification");
  }
}
