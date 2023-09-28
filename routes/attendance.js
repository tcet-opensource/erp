import express from "express";
import attendanceController from "#controller/attendance";

const router = express.Router();
router.get("/list", attendanceController.showAttendance);
router.post("/add", attendanceController.addAttendance);
router.delete("/delete/:id", attendanceController.deleteAttendance);
router.post("/update/:id", attendanceController.updateAttendance);

export default router;