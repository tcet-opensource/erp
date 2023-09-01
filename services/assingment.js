import Assignment from "#models/assingment";
import databaseError from "#error/database";

export async function createAssignment(no, title, type, marks) {
  const newAssignment = await Assignment.create({
    no, title, type, marks,
  });
  if (newAssignment.name === name) {
    return newAssignment;
  }
  throw new databaseError.DataEntryError("assingment");
}

export async function updateAssingmentById(id, data) {
  const updated = await Assignment.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("assingment");
}

export async function assignmentList(filter) {
  const assignmentlist = await Assignment.read(filter, 0);
  return assignmentList;
}

export async function deleteAssingmentById(assignmentId) {
  const deleted = await Assignment.remove({ _id: assignmentId});
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("assingment");
}
