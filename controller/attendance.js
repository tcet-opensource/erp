import {
  addNewAttendance,
  deleteAttendanceById,
  updateAttendanceById,
  getAttendances,
} from "#services/attendance";
import { logger } from "#util";
import { isEntityIdValid } from "#middleware/entityIdValidation";
import Student from "#models/attendance";
import Course from "#models/course";

async function addAttendance(req, res) {
  const {
    student,
    course,
    monthlyAttended,
    monthlyOccured,
    cumulativeAttended,
    cumulativeOccured,
  } = req.body;
  const isStudentValid = await isEntityIdValid(student, Student);
  const isCourseValid = await isEntityIdValid(course, Course);
  try {
    // eslint-disable-next-line max-len
    if (!isStudentValid || !isCourseValid) {
      res.status(400).json({
        error: "Invalid Id",
      });
    }
    const attendance = await addNewAttendance(
      student,
      course,
      monthlyAttended,
      monthlyOccured,
      cumulativeAttended,
      cumulativeOccured,
    );
    res.json({
      res: `added attendance ${attendance.student}`,
      id: attendance.id,
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}
async function deleteAttendance(req, res) {
  const { id } = req.params;
  try {
    await deleteAttendanceById(id);
    res.json({ res: "Attendance deleted successfully" });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500);
    res.json({ err: "Error while deleting from DB" });
  }
}

async function updateAttendance(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;

  try {
    await updateAttendanceById(id, data);
    res.json({ res: `${id} attendance updated` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function showAttendance(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const attendance = await getAttendances(filter, limit, page);
    return res.json({ res: attendance });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

export default {
  addAttendance,
  updateAttendance,
  deleteAttendance,
  showAttendance,
};
