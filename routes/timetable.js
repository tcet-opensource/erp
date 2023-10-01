import express from "express";
import timetableController from "#controller/timetable";

const router = express.Router();
router.post("/add", timetableController.addTimetable);
router.get("/list", timetableController.getTimetable);
router.post("/update/:id", timetableController.updateTimetable);
router.delete("/delete/:id", timetableController.deleteTimetable);

export default router;
