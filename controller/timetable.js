import {
  createTimetable, deleteTimetableById, timetableList, updateTimetableById,
} from "#services/timetable";
import { logger } from "#util";

async function addTimetable(req, res) {
  const {
    startDate, endDate, classIncharge, group, activityBlueprints, lunchbreakStartTime, lunchbreakDuration, teabreakStartTime, teabreakDuratoin,
  } = req.body;
  try {
    const newTimetable = await createTimetable(
      startDate, 
      endDate, 
      classIncharge, 
      group, 
      activityBlueprints, 
      lunchbreakStartTime, 
      lunchbreakDuration, 
      teabreakStartTime, 
      teabreakDuratoin,
    );
    res.json({ res: `added timetable for: ${newTimetable.startDate} to ${newTimetable.endDate}` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateTimetable(req, res) {
  const {
    id, ...data
  } = req.body;
  try {
    await updateTimetableById(id, data);
    res.json({ res: `updated timetable with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getTimetable(req, res) {
  const filter = req.query;
  const timetable = await timetableList(filter);
  res.json({ res: timetable });
}

async function deleteTimetable(req, res) {
  const { timetableId } = req.params;
  try {
    await deleteTimetableById(timetableId);
    res.json({ res: `Deleted timetable with ID ${infrastructureId}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  addTimetable, deleteTimetable, getTimetable, updateTimetable,
};
