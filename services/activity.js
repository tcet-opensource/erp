import Activity from "#models/activity";
import databaseError from "#error/database";

export async function createActivity(
  activityBlueprint,
  startTime,
  duration,
  course,
  faculty,
  type,
  task,
  group,
  students,
) {
  const newActivity = await Activity.create({
    activityBlueprint,
    startTime,
    duration,
    course,
    faculty,
    task,
    type,
    group,
    students,
  });
  if (newActivity) {
    return newActivity;
  }
  throw new databaseError.DataEntryError("actvity");
}

export async function updateActivityById(id, data) {
  const updated = await Activity.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("activity");
}

export async function activityList(filter, limit, page) {
  const activitylist = await Activity.read(filter, limit, page);
  return activitylist;
}

export async function deleteActivityById(id) {
  const deleted = await Activity.remove({ _id: id });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("activity");
}
