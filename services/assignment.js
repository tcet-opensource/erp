import Assignment from "#models/assignment";
import databaseError from "#error/database";

export async function createAssignment(no, title, type, marks) {
  const newAssignment = await Assignment.create({
    no, title, type, marks,
  });
  if (newAssignment.title === title) {
    return newAssignment;
  }
  throw new databaseError.DataEntryError("assignment");
}

export async function updateAssignmentById(id, data) {
  const updated = await Assignment.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("assignment");
}

export async function assignmentList(filter) {
  const assignmentlist = await Assignment.read(filter, 0);
  return assignmentlist;
}

export async function deleteAssignmentById(assignmentId) {
  const deleted = await Assignment.remove({ _id: assignmentId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("assingment");
}
