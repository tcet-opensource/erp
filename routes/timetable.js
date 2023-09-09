import express from "express";
import timetableController from "#controller/timetable";

const router = express.Router();
router.post("/add", timetableController.addTimetable);
router.get("/list", timetableController.getTimetable);
router.post("/update", timetableController.updateTimetable);
router.post("/delete/:timetableId", timetableController.deleteTimetable);

export default router;
