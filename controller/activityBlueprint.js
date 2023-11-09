import {
  createActivityBP,
  updateActivityBlueprintById,
  deleteActivityBlueprintById,
  activityBlueprintList,
} from "#services/activityBlueprint";
import { logger } from "#util";

async function addActivityBP(req, res) {
  const {
    number,
    academicYear,
    day,
    startTime,
    duration,
    infra,
    course,
    faculty,
    type,
    group,
  } = req.body;
  try {
    const newActivityBP = await createActivityBP(
      number,
      academicYear,
      day,
      startTime,
      duration,
      infra,
      course,
      faculty,
      type,
      group,
    );
    return res.json({
      res: `added activity ${newActivityBP.id}`,
      id: newActivityBP.id,
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    return res.json({ err: "Error while inserting in DB" });
  }
}

async function updateActivityBP(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateActivityBlueprintById(id, data);
    return res.json({ res: `updated activity with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    return res.json({ err: "Error while updating in DB" });
  }
}

async function getActivityBP(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const activitylist = await activityBlueprintList(filter, limit, page);
    return res.json({ res: activitylist });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

async function deleteActivityBP(res, req) {
  const { id } = req.params;
  try {
    await deleteActivityBlueprintById(id);
    return res.json({ res: `Deleted activity with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    return res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  addActivityBP,
  deleteActivityBP,
  getActivityBP,
  updateActivityBP,
};
