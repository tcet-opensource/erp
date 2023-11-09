import {
  createActivity,
  deleteActivityById,
  activityList,
  updateActivityById,
} from "#services/activity";
import { logger } from "#util";

async function addActivity(req, res) {
  const {
    activityBlueprint,
    startTime,
    course,
    faculty,
    type,
    task,
    group,
    students,
  } = req.body;
  try {
    const newActivity = await createActivity(
      activityBlueprint,
      startTime,
      course,
      faculty,
      type,
      task,
      group,
      students,
    );
    return res.json({
      res: `added activity ${newActivity.id}`,
      id: newActivity.id,
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    return res.json({ err: "Error while inserting in DB" });
  }
}

async function updateActivity(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateActivityById(id, data);
    return res.json({ res: `updated activity with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    return res.json({ err: "Error while updating in DB" });
  }
}

async function getActivity(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const activitylist = await activityList(filter, limit, page);
    return res.json({ res: activitylist });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

async function deleteActivity(res, req) {
  const { id } = req.params;
  try {
    await deleteActivityById(id);
    return res.json({ res: `Deleted activity with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    return res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  addActivity,
  deleteActivity,
  getActivity,
  updateActivity,
};
