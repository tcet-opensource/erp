import StudentBank from "#models/student/stdBank";
import databaseError from "#error/database";

export async function createStudentBank(
    uid,
    bankName,
    bankAccount,
    bankBranch,
    bankIfsc,
    bankMicr,
) {
  const newStudentBank = await StudentBank.create({
    uid,
    bankName,
    bankAccount,
    bankBranch,
    bankIfsc,
    bankMicr,
  });
  if (newStudentBank.uid === uid) {
    return newStudentBank;
  }
  throw new databaseError.DataEntryError("student bank");
}

export async function updateStudentBankById(id, data) {
  const updated = await StudentBank.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("student bank");
}

export async function studentBankList(filter) {
  const studentBank = await StudentBank.read(filter, 0);
  return studentBank;
}

export async function deleteStudentBankById(studentBankId) {
  const deleted = await StudentBank.remove({ _id: studentBankId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("student bank");
}