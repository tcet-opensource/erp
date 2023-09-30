import {
  createFaculty, facultyList, deleteFacultyById, updateFacultyById,
} from "#services/faculty";
import { logger } from "#util";

async function addFaculty(req, res) {
  const {
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
  } = req.body;
  try {
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
    );
    res.json({ res: `added faculty ${newFaculty.ERPID}` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function getFaculty(req, res) {
  const filter = req.query;
  const facultylist = await facultyList(filter);
  res.json({ res: facultylist });
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
  const {
    id, ...data
  } = req.body;
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
  addFaculty, getFaculty, deleteFaculty, updateFaculty,
};
