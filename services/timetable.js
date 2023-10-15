import Timetable from "#models/timetable";
import databaseError from "#error/database";

export async function createTimetable(
  startDate,
  endDate,
  classIncharge,
  group,
  activityBlueprints,
  lunchbreakStartTime,
  lunchbreakDuration,
  teabreakStartTime,
  teabreakDuration,
) {
  const newTimetable = await Timetable.create({
    startDate,
    endDate,
    classIncharge,
    group,
    activityBlueprints,
    lunchbreakStartTime,
    lunchbreakDuration,
    teabreakStartTime,
    teabreakDuration,
  });
  if (newTimetable) {
    return newTimetable;
  }
  throw new databaseError.DataEntryError("timetable");
}

export async function updateTimetableById(id, data) {
  const updated = await Timetable.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("timetable");
}

export async function timetableList(filter, limit, page) {
  const timetable = await Timetable.read(filter, limit, page);
  return timetable;
}

export async function deleteTimetableById(timetableId) {
  const deleted = await Timetable.remove({ _id: timetableId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("timetable");
}
