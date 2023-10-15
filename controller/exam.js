import {
  createExam,
  deleteExamById,
  examList,
  updateExamById,
} from "#services/exam";
import { logger } from "#util";

async function addExam(req, res) {
  const {
    date, startTime, duration, infrastructure, supervisor, course,
  } = req.body;
  try {
    const exam = await createExam(
      date,
      startTime,
      duration,
      supervisor,
      infrastructure,
      course,
    );
    res.json({ res: `added exam ${exam.id}`, id: exam.id });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateExam(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateExamById(id, data);
    res.json({ res: `updated exam with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getExam(req, res) {
  const filter = req.query;
  const exam = await examList(filter);
  res.json({ res: exam });
}

async function deleteExam(req, res) {
  const { id } = req.params;
  try {
    await deleteExamById(id);
    res.json({ res: `Deleted exam with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  addExam,
  deleteExam,
  getExam,
  updateExam,
};
