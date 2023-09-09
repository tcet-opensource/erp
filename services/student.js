import Student from "#models/student";
import databaseError from "#error/database";

export async function createStudent(
  ERPID,
  name,
  joiningYear,
  branch,
  division,
  rollNo,
  coursesOpted,
) {
  const newStudent = await Student.create({
    ERPID, name, joiningYear, branch, division, rollNo, coursesOpted,
  });
  if (newStudent.name === name) {
    return newStudent;
  }
  throw new databaseError.DataEntryError("student");
}

export async function updateStudentById(id, data) {
  const updated = await Student.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("student");
}

export async function studentList(filter) {
  const studlist = await Student.read(filter, 0);
  return studlist;
}

export async function deleteStudentById(StudentId) {
  const deleted = await Student.remove({ _id: StudentId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("student");
}
