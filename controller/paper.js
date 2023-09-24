import {
  createPaper, updatePaperById, listPaper, deletePaperById,
} from "#services/paper";
import { logger } from "#util";

async function addPaper(req, res) {
  const {
    answerSheetID,
    exam,
    student,
    checkedBy,
    mark,
  } = req.body;
  try {
    const newPaper = await createPaper(
      answerSheetID,
      exam,
      student,
      checkedBy,
      mark,
    );
    res.json({ res: `added paper for: ${newPaper.answerSheetID}`, id: newPaper.id });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updatePaper(req, res) {
  const { id } = req.params;
  const { 
    ...data
   } = req.body;
  try {
    await updatePaperById(id, data);
    res.json({ res: "Paper updated" });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updating in DB" });
  }
}

async function showPaper(req, res) {
  const filter = req.query;
  const paper = await listPaper(filter);
  res.json({ res: paper });
}

async function deletePaper(req, res) {
  const { id } = req.params;
  try {
    await deletePaperById(id);
    res.json({ res: `Deleted paper with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  addPaper, updatePaper, showPaper, deletePaper,
};
