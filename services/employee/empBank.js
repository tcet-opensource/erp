import EmployeeBank from "#models/employee/empBank";
import databaseError from "#error/database";

export async function createEmployeeBank(
  uid,
  bankName,
  bankAcc,
  bankBranch,
  bankIfsc,
  bankMicr,
  appointmentApproveSgDte,
) {
  const newEmployeeBank = await EmployeeBank.create({
    uid,
    bankName,
    bankAcc,
    bankBranch,
    bankIfsc,
    bankMicr,
    appointmentApproveSgDte,
  });
  if (newEmployeeBank.uid === uid) {
    return newEmployeeBank;
  }
  throw new databaseError.DataEntryError("employee bank");
}

export async function updateEmployeeBankById(id, data) {
  const updated = await EmployeeBank.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("employee bank");
}

export async function employeeBankList(filter, limit, page) {
  const employeeBank = await EmployeeBank.read(filter, limit, page);
  return employeeBank;
}

export async function deleteEmployeeBankById(employeeBankId) {
  const deleted = await EmployeeBank.remove({ _id: employeeBankId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("employee bank");
}
