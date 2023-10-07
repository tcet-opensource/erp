import EmployeeBank from "#models/employee/empBank";
import databaseError from "#error/database";

export async function createEmployeeBank(
  uid,
  bank_name,
  bank_acc,
  bank_branch,
  bank_ifsc,
  bank_micr,
  appointment_approve_sg_dte,
) {
  const newEmployeeBank = await EmployeeBank.create({
    uid,
    bank_name,
    bank_acc,
    bank_branch,
    bank_ifsc,
    bank_micr,
    appointment_approve_sg_dte,
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

export async function employeeBankList(filter) {
  const employeeBank = await EmployeeBank.read(filter, 0);
  return employeeBank;
}

export async function deleteEmployeeBankById(employeeBankId) {
  const deleted = await EmployeeBank.remove({ _id: employeeBankId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("employee bank");
}