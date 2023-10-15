import Exam from "#models/exam";
import databaseError from "#error/database";

export async function createExam(
  date,
  startTime,
  duration,
  supervisor,
  infrastructure,
  course,
) {
  const newExam = await Exam.create({
    date,
    startTime,
    duration,
    supervisor,
    infrastructure,
    course,
  });
  if (Date(newExam.date) === Date(date)) {
    return newExam;
  }
  throw new databaseError.DataEntryError("exam");
}

export async function updateExamById(id, data) {
  const updated = await Exam.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("exam");
}

export async function examList(filter, limit, page) {
  const exams = await Exam.read(filter, limit, page);
  return exams;
}

export async function deleteExamById(examId) {
  const deleted = await Exam.remove({ _id: examId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("exam");
}
