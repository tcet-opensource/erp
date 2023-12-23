import Application from "#models/application";
import databaseError from "#error/database";

export async function addNewApplication(
  ERPID,
  type,
  data,
  collection,
) {
  const newApplication = await Application.create({
    ERPID,
    type,
    data,
    collection,
  });
  if (String(newApplication.ERPID) === ERPID) {
    return newApplication;
  }
  throw new databaseError.DataEntryError("Add Application");
}

export async function getApplication(filter, limit, page) {
  const applications = await Application.read(filter, limit, page);
  if (applications) {
    return applications;
  }
  throw new databaseError.DataNotFoundError("Application");
}

export async function deleteAppliactionById(applicationId) {
  const deleted = await Application.remove({ _id: applicationId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Application");
}

export async function updateApplicationById(id, data) {
  const updated = await Application.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Application");
}
