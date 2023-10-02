import MedicalHistory from "#models/student/std_med_history";
import databaseError from "#error/database";

export async function createMedicalHistory(
  uid,
  bloodGroup,
  pastMedicalHistory,
  immunisationHistory,
  chronicMedicalConditions,
  parentsEmailId,
  parentsContact,
  relativeContacts,
) {
  const newMedicalHistory = await MedicalHistory.create({
    uid,
    bloodGroup,
    pastMedicalHistory,
    immunisationHistory,
    chronicMedicalConditions,
    parentsEmailId,
    parentsContact,
    relativeContacts,
  });
  if (newMedicalHistory.uid === uid) {
    return newMedicalHistory;
  }
  throw new databaseError.DataEntryError("medicalHistory");
}

export async function updateMedicalHistoryById(id, data) {
  const updated = await MedicalHistory.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("medicalHistory");
}

export async function medicalHistoryList(filter) {
  const medHistoryList = await MedicalHistory.read(filter, 0);
  return medHistoryList;
}

export async function deleteMedicalHistoryById(medicalHistoryId) {
  const deleted = await MedicalHistory.remove({ _id: medicalHistoryId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("medicalHistory");
}
