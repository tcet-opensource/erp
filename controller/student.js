import {
    createStudent, deleteStudentById, StudentList, updateStudentById,
  } from "#services/student";
  import { logger } from "#util";
  
  async function addStudent(req, res) {
    const {
      ERPID, name, joiningYear,  branch, division, rollNo, coursesOpted
    } = req.body;
    try {
      const newStudent = await createStudent(ERPID, name, joiningYear,  branch, division, rollNo, coursesOpted);
      res.json({ res: `added user ${newStudent.id}` });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  
  async function updateStudentById(req, res) {
    const {
      id, ...data
    } = req.body;
    try {
      await updateStudentById(id, data);
      res.json({ res: `updated Student with id ${id}` });
    } catch (error) {
      logger.error("Error while updating", error);
      res.status(500);
      res.json({ err: "Error while updaing in DB" });
    }
  }
  
  async function StudentList(req, res) {
    const filter = req.query;
    const StudentList = await StudentList(filter);
    res.json({ res: StudentList });
  }
  
  async function deleteStudentById(req, res) {
    const { StudentId } = req.params;
    try {
      await deleteStudentById(StudentId);
  
      res.json({ res: `Deleted Student with ID ${StudentId}` });
    } catch (error) {
      logger.error("Error while deleting", error);
      res.status(500).json({ error: "Error while deleting from DB" });
    }
  }
  export default {
    addStudent, deleteStudentById, StudentList, updateStudentById,
  };
  