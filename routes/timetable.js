import express from "express";

import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import timetableController from "#controller/timetable";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN"]),
  timetableController.addTimetable,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  timetableController.getTimetable,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  timetableController.updateTimetable,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  timetableController.deleteTimetable,
);

export default router;
