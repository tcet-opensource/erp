import express from "express";
import attendanceController from "#controller/attendance";

const router = express.Router();
router.get("/list", attendanceController.showAttendance);
router.post("/add", attendanceController.addAttendance);
router.delete("/delete/:attendanceId", attendanceController.deleteAttendance);
router.post("/update", attendanceController.updateAttendance);

export default router;