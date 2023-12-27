import EmployeeEducationHistory from "#models/employee/empEduHistory";
import databaseError from "#error/database";

export async function createEmployeeEducationHistory(
  empEduHistoryDetails,
  session,
) {
  const { uid, ssc, hsc, dip, iti, deg, pgd, phd, pdoc } = empEduHistoryDetails;
  const newEmployeeEducationHistory = await EmployeeEducationHistory.create({
    uid,
    ssc,
    hsc,
    dip,
    iti,
    deg,
    pgd,
    phd,
    pdoc,
    session,
  });
  if (newEmployeeEducationHistory.uid === uid) {
    return newEmployeeEducationHistory;
  }
  throw new databaseError.DataEntryError("Employee Education History");
}

export async function employeeEducationHistoryList(filter, limit, page) {
  const empEduHistory = await EmployeeEducationHistory.read(
    filter,
    limit,
    page,
  );
  return empEduHistory;
}

export async function updateEmployeeEducationHistoryById(id, data) {
  const updated = await EmployeeEducationHistory.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Employee Education History");
}

export async function deleteEmployeeEducationHistoryById(
  employeeEducationHistoryId,
) {
  const deleted = await EmployeeEducationHistory.remove({
    _id: employeeEducationHistoryId,
  });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Employee Education History");
}
