import {
  createStudent,
  deleteStudentById,
  studentList,
  updateStudentById,
} from "#services/student";
import { logger } from "#util";

async function addStudent(req, res) {
  const { ERPID, name, joiningYear, branch, division, rollNo, coursesOpted } =
    req.body;
  try {
    const newStudent = await createStudent(
      ERPID,
      name,
      joiningYear,
      branch,
      division,
      rollNo,
      coursesOpted,
    );
    res.json({ res: `added user ${newStudent.id}`, id: newStudent.id });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateStudentById(id, data);
    res.json({ res: `updated Student with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getStudent(req, res) {
  const filter = req.body;
  const { limit, page } = req.query;
  const StudList = await studentList(filter, limit, page);
  res.json({ res: StudList });
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  try {
    await deleteStudentById(id);

    res.json({ res: `Deleted Student with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}
export default {
  addStudent,
  deleteStudent,
  getStudent,
  updateStudent,
};
