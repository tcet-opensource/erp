import mongoose from "mongoose";
import { commitWithRetry } from "#constant";
import {
  createFaculty,
  facultyList,
  deleteFacultyById,
  updateFacultyById,
} from "#services/faculty";
import {
  createEmployeeBank,
  // employeeBankList,
  // deleteEmployeeBankById,
  // updateEmployeeBankById,
} from "#services/employee/empBank";
import {
  addNewEmployeeCurrent,
  // getEmployeeCurrent,
  // deleteEmployeeCurrentById,
  // updateEmployeeCurrentById,
} from "#services/employee/empCurrentDetail";
import {
  createEmployeeEducationHistory,
  // employeeEducationHistoryList,
  // deleteEmployeeEducationHistoryById,
  // updateEmployeeEducationHistoryById,
} from "#services/employee/empEduHistory";
import {
  addNewEmployeePersonal,
  // getEmployeePersonal,
  // deleteEmployeePersonalById,
  // updateEmployeePersonalById,
} from "#services/employee/empPersonal";
import { logger } from "#util";

async function addFaculty(req, res) {
  const {
    dateOfJoining,
    dateOfLeaving,
    profileLink,
    qualifications,
    totalExperience,
    achievements,
    areaOfSpecialization,
    papersPublishedPG,
    papersPublishedUG,
    department,
    preferredSubjects,
    designation,
    natureOfAssociation,
    additionalResponsibilities,
    employeePersonalDetails,
    employeeBankDetails,
    employeeCurrentDetails,
    employeeEducationDetails,
  } = req.body;
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const randomIndex = Math.floor(Math.random() * alphabet.length);
    const randomLetter = alphabet[randomIndex];
    let randomNumber = Math.floor(Math.random() * 1000).toString();
    if (randomNumber.length === 2) {
      randomNumber = `0${randomNumber}`;
    }
    const ERPID = `F${randomLetter}${randomNumber}`;

    const newFaculty = await createFaculty(
      ERPID,
      dateOfJoining,
      dateOfLeaving,
      profileLink,
      qualifications,
      totalExperience,
      achievements,
      areaOfSpecialization,
      papersPublishedPG,
      papersPublishedUG,
      department,
      preferredSubjects,
      designation,
      natureOfAssociation,
      additionalResponsibilities,
      session,
    );
    await Promise.all([
      addNewEmployeePersonal(employeePersonalDetails, session),
      createEmployeeEducationHistory(employeeEducationDetails, session),
      addNewEmployeeCurrent(employeeCurrentDetails, session),
      createEmployeeBank(employeeBankDetails, session),
    ]);
    await commitWithRetry(session);
    res.json({
      res: `added faculty ${newFaculty.ERPID}`,
      id: newFaculty.ERPID,
    });
  } catch (error) {
    await session.abortTransaction();
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function getFaculty(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const facultylist = await facultyList(filter, limit, page);
    res.json({ res: facultylist });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    res.json({ err: "Error while fetching the data" });
  }
}

async function deleteFaculty(req, res) {
  const { facultyId } = req.params;
  try {
    await deleteFacultyById(facultyId);
    res.json({ res: "Faculty deleted successfully" });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500);
    res.json({ err: "Error while deleting from DB" });
  }
}

async function updateFaculty(req, res) {
  const { id, ...data } = req.body;
  try {
    await updateFacultyById(id, data);
    res.json({ res: `updated faculty with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updating in DB" });
  }
}

export default {
  addFaculty,
  getFaculty,
  deleteFaculty,
  updateFaculty,
};
