// Import coursework model and databaseError module
import Coursework from "#models/coursework";
import databaseError from "#error/database";

// Service function to create a new Coursework entity
export async function createCoursework({
  student,
  type,
  course,
  task,
  objectID,
  activity,
  marks,
}) {
  try {
    const newCoursework = await Coursework.create({
      student,
      type,
      course,
      task,
      objectID,
      activity,
      marks,
    });
    return newCoursework;
  } catch (error) {
    throw new databaseError.DataEntryError("coursework");
  }
}

// Service function to update a Coursework entity by ID
export async function updateCourseworkById(id, data) {
  try {
    const updated = await Coursework.update({ _id: id }, data);
    if (updated) {
      return updated;
    }
    throw new databaseError.DataEntryError("coursework");
  } catch (error) {
    throw new databaseError.DataEntryError("coursework");
  }
}

// Service function to retrieve a list of Coursework entities based on filters
export async function listCoursework(filter, limit, page) {
  try {
    const courseworkList = await Coursework.read(filter, limit, page);
    return courseworkList;
  } catch (error) {
    throw new databaseError.DataRetrievalError("coursework");
  }
}

// Service function to delete a Coursework entity by ID
export async function deleteCourseworkById(courseworkId) {
  try {
    const deleted = await Coursework.deleteOne({ _id: courseworkId });
    if (deleted.deletedCount > 0) {
      return deleted;
    }
    throw new databaseError.DataDeleteError("coursework");
  } catch (error) {
    throw new databaseError.DataDeleteError("coursework");
  }
}
