import Semester from "#models/semester";
import databaseError from "#error/database";

export async function createSemester(
  number,
  academicYear,
  type,
  startDate,
  endDate,
) {
  const newSemester = await Semester.create({
    number,
    academicYear,
    type,
    startDate,
    endDate,
  });
  if (newSemester.number === number) {
    return newSemester;
  }
  throw new databaseError.DataDeleteError("semster");
}

export async function updateSemesterById(id, data) {
  const update = await Semester.update({ _id: id }, data);

  if (update) {
    return update;
  }
  throw new databaseError.DataEntryError("semester");
}

export async function semesterList(filter, limit, page) {
  const semlist = await Semester.read(filter, limit, page);
  return semlist;
}

export async function deleteSemesterById(semesterId) {
  const deleted = await Semester.remove({ _id: semesterId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("semester");
}
