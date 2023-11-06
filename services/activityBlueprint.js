import ActivityBlueprint from "#models/activityBlueprint";
import databaseError from "#error/database";

export async function createActivityBP(
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
) {
  const newActivityBP = await ActivityBlueprint.create({
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
  });
  if (newActivityBP) {
    return newActivityBP;
  }
  throw new databaseError.DataEntryError("actvity blueprint");
}

export async function updateActivityBlueprintById(id, data) {
  const updated = await ActivityBlueprint.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("activityBlueprint");
}

export async function activityBlueprintList(filter, limit, page) {
  const activityBlueprintlist = await ActivityBlueprint.read(
    filter,
    limit,
    page,
  );
  return activityBlueprintlist;
}

export async function deleteActivityBlueprintById(id) {
  const deleted = await ActivityBlueprint.remove({ _id: id });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("activityBlueprint");
}
