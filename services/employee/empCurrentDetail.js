import databaseError from "#error/database";
import EmployeeCurrent from "#models/employee/empCurrentDetail";

export async function addNewEmployeeCurrent(basicEmpDetails, session) {
  const {
    uid,
    dateOfJoining,
    departmentName,
    designation,
    jobStatus,
    jobProfile,
    currentCtc,
  } = basicEmpDetails;
  const newEmployeeCurrent = await EmployeeCurrent.create({
    uid,
    dateOfJoining,
    departmentName,
    designation,
    jobStatus,
    jobProfile,
    currentCtc,
    session,
  });
  if (newEmployeeCurrent.uid === uid) {
    return newEmployeeCurrent;
  }
  throw new databaseError.DataEntryError("Add EmployeeCurrent");
}

export async function getEmployeeCurrent(filter, limit, page) {
  const employeeCurrent = await EmployeeCurrent.read(filter, limit, page);
  if (employeeCurrent) {
    return employeeCurrent;
  }
  throw new databaseError.DataNotFoundError("EmployeeCurrent");
}

export async function deleteEmployeeCurrentById(EmployeeCurrentId) {
  const deleted = await EmployeeCurrent.remove({ _id: EmployeeCurrentId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("EmployeeCurrent");
}

export async function updateEmployeeCurrentById(id, data) {
  const updated = await EmployeeCurrent.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("EmployeeCurrent");
}
