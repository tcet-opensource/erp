import {
  createSemester, updateSemesterById, semesterList, deleteSemesterById,
} from "#services/semester";
import { logger } from "#util";

async function addSemester(req, res) {
  const {
    number, academicYear, type, startDate, endDate,
  } = req.body;

  try {
    const newSemester = await createSemester(number, academicYear, type, startDate, endDate);
    res.json({ res: `added semester ${newSemester.id} `, id: newSemester.id });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateSemester(req, res) {
  const { id } = req.params;
  const {
    ...data
  } = req.body;
  try {
    await updateSemesterById(id, data);
    res.json({ res: `Updated Semester with id  ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updating in DB" });
  }
}

async function getSemester(req, res) {
  const filter = req.query;
  const semlist = await semesterList(filter);
  res.json({ res: semlist });
}

async function deleteSemester(req, res) {
  const { id } = req.params;
  try {
    await deleteSemesterById(id);
    res.json({ res: `Deleted Semster with id ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}
export default {
  addSemester, deleteSemester, getSemester, updateSemester,
};
