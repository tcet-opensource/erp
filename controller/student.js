import {
  createStudent,
  deleteStudentById,
  studentList,
  updateStudentById,
} from "#services/student";
import { logger } from "#util";
import { isEntityIdValid } from "#middleware/entityIdValidation";
import Department from "#models/department";
import Course from "#models/course";
import { departmentAbbrev, departmentNames } from "#constant";

async function addStudent(req, res) {
  const { name, joiningYear, branch, division, rollNo, coursesOpted } =
    req.body;
  try {
    const isBranchValid = await isEntityIdValid(branch, Department);
    const isCourseValid = await isEntityIdValid(coursesOpted, Course);
    if (isBranchValid && isCourseValid) {
      const departmentData = await Department.read({ _id: branch });
      const departmentName = departmentData.data[0].name;
      const abbrev = departmentAbbrev[departmentNames.indexOf(departmentName)];
      const year = joiningYear.toString().slice(-2);
      let randomNumber = Math.floor(Math.random() * 1000).toString();
      if (randomNumber.length === 2) {
        randomNumber = `0${  randomNumber}`;
      }
      const ERPID = `S${  abbrev  }${year  }${randomNumber}`;

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
    } else {
      let error = ""; // eslint-disable-line prefer-const
      if (!isBranchValid) error.concat("Invalid branch");
      if (!isCourseValid) error.concat(" Invalid course opted");
      res.status(400).json({ err: error });
    }
  } catch (caughtError) {
    logger.error("Error while inserting", caughtError);
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
