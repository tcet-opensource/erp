import Attendance from "#models/attendance";
import databaseError from "#error/database";

export async function addNewAttendance(
  student,
  course,
  monthlyAttended,
  monthlyOccured,
  cumulativeAttended,
  cumulativeOccured,
) {
  const newAttendance = await Attendance.create({
    student,
    course,
    monthlyAttended,
    monthlyOccured,
    cumulativeAttended,
    cumulativeOccured,
  });
  if (String(newAttendance.student) === student) {
    return newAttendance;
  }
  throw new databaseError.DataEntryError("Add Attendance");
}

export async function getAttendances(filter, limit, page) {
  const attendances = await Attendance.read(filter, limit, page);
  if (attendances) {
    return attendances;
  }
  throw new databaseError.DataNotFoundError("Attendance");
}

export async function deleteAttendanceById(attendanceId) {
  const deleted = await Attendance.remove({ _id: attendanceId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Attendance");
}

export async function updateAttendanceById(id, data) {
  const updated = await Attendance.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Attendance");
}
