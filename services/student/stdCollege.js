import StudentCollege from "#models/student/stdCollege";
import databaseError from "#error/database";

export async function createStudentCollege(
  uid,
  admissionYear,
  studentCode,
  rollNo,
  admissionStatus,
  admissionPattern,
  admissionCategory,
  seatDesc,
  quotaType,
  isBoarderStudent,
  seatType,
  seatSubType,
  eligibilityNo,
  enrollmentNo,
) {
  const newStudentCollege = await StudentCollege.create({
    uid,
    admissionYear,
    studentCode,
    rollNo,
    admissionStatus,
    admissionPattern,
    admissionCategory,
    seatDesc,
    quotaType,
    isBoarderStudent,
    seatType,
    seatSubType,
    eligibilityNo,
    enrollmentNo,
  });
  if (newStudentCollege.uid === uid) {
    return newStudentCollege;
  }
  throw new databaseError.DataEntryError("student college");
}

export async function updateStudentCollegeById(id, data) {
  const updated = await StudentCollege.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("student college");
}

export async function studentCollegeList(filter) {
  const studentColleges = await StudentCollege.read(filter, 0);
  return studentColleges;
}

export async function deleteStudentCollegeById(studentCollegeId) {
  const deleted = await StudentCollege.remove({ _id: studentCollegeId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("student college");
}
