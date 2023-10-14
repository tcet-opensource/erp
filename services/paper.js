import Paper from "#models/paper";
import databaseError from "#error/database";

export async function createPaper(
  answerSheetID,
  exam,
  student,
  checkedBy,
  mark,
) {
  const newPaper = await Paper.create({
    answerSheetID,
    exam,
    student,
    checkedBy,
    mark,
  });
  if (newPaper) {
    return newPaper;
  }
  throw new databaseError.DataEntryError("paper");
}

export async function updatePaperById(id, data) {
  const updated = await Paper.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("paper");
}

export async function listPaper(filter) {
  const paper = await Paper.read(filter, 0);
  return paper;
}

export async function deletePaperById(paperId) {
  const deleted = await Paper.remove({ _id: paperId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("paper");
}
