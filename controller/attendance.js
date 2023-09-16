import {
  addNewAttendance, deleteAttendanceById, updateAttendanceById, getAttendance,
} from "#services/attendance";
import { logger } from "#util";
  
  async function addAttendance(req, res) {
    const {
      student, course,  monthlyAttended, monthlyOccured,cumulativeAttended,cumulativeOccured
    } = req.body;
    try {
      // eslint-disable-next-line max-len
      const attendance  = await addNewAttendance(student, course,  monthlyAttended, monthlyOccured,cumulativeAttended,cumulativeOccured);
      res.json({ res: `added attendance ${attendance.name}` });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  async function deleteAttendance(req, res) {
    const { attendanceId } = req.params;
    try {
      await deleteAttendanceById(attendanceId);
      res.json({ res: "Attedance deleted successfully" });
    } catch (error) {
      logger.error("Error while deleting", error);
      res.status(500);
      res.json({ err: "Error while deleting from DB" });
    }
  }
  
  async function updateAttendance(req, res) {
    const {
      id, ...data
    } = req.body;
    try {
      await updateAttendanceById(id, data);
      res.json({ res: "attendance updated" });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  
  async function showAttendance(req, res) {
    try {
      const attendance = await getAttendance(req.query);
      return res.json({ res: attendance });
    } catch (error) {
      logger.error("Error while fetching", error);
      res.status(500);
      return res.json({ err: "Error while fetching the data" });
    }
  }
  
  export default {
    addAttendance, updateAttendanceById, deleteAttendance, showAttendance, getAttendance
  };
  