import Accreditation from "#models/accreditation";
import databaseError from "#error/database";

export async function addNewAccreditation(name, agencyName, dateofAccreditation, dateofExpiry) {
  const newAccreditation = await Accreditation.create({
    name,
    agencyName,
    dateofAccreditation,
    dateofExpiry,
  });
  if (newAccreditation.name === name) {
    return newAccreditation;
  }
  throw new databaseError.DataEntryError("Add Accreditation");
}

export async function getAccreditations(filter) {
  const accreditations = await Accreditation.read(filter);
  if (accreditations) {
    return accreditations;
  }
  throw new databaseError.DataNotFoundError("Accreditation");
}

export async function deleteAccreditationById(accredationId) {
  const deleted = await Accreditation.remove({ _id: accredationId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Accreditation");
}

export async function updateAccreditationById(id, data) {
  const updated = await Accreditation.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Accrediation");
}

export default {
  deleteAccreditationById, addNewAccreditation, updateAccreditationById,
};
