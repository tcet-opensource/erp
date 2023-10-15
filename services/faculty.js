import Faculty from "#models/faculty";
import databaseError from "#error/database";

export async function createFaculty(
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
) {
  const newFaculty = await Faculty.create({
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
  });
  if (newFaculty.ERPID === ERPID) {
    return newFaculty;
  }
  throw new databaseError.DataEntryError("Faculty");
}

export async function facultyList(filter, limit, page) {
  const facList = await Faculty.read(filter, limit, page);
  if (facList) {
    return facList;
  }
  throw new databaseError.DataNotFoundError("Faculty");
}

export async function deleteFacultyById(facultyId) {
  const deleted = await Faculty.remove({ _id: facultyId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Faculty");
}

export async function updateFacultyById(id, data) {
  const updated = await Faculty.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Faculty");
}

export default {
  createFaculty,
  facultyList,
  deleteFacultyById,
  updateFacultyById,
};
