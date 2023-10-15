// Import Practical-related model and databaseError module
import Practical from "#models/practical";
import databaseError from "#error/database";

// Service function to create a new Practical entity
export async function createPractical({
  no,
  title,
  type,
  hours,
  cognitiveLevels,
}) {
  try {
    const newPractical = await Practical.create({
      no,
      title,
      type,
      hours,
      cognitiveLevels,
    });
    return newPractical;
  } catch (error) {
    throw new databaseError.DataEntryError("practical");
  }
}

// Service function to update a Practical entity by ID
export async function updatePracticalById(id, data) {
  try {
    const updated = await Practical.update({ _id: id }, data);
    if (updated) {
      return updated;
    }
    throw new databaseError.DataEntryError("practical");
  } catch (error) {
    throw new databaseError.DataEntryError("practical");
  }
}

// Service function to retrieve a list of Practical entities based on filters
export async function listPractical(filter, limit, page) {
  try {
    const practicalList = await Practical.read(filter, limit, page);
    return practicalList;
  } catch (error) {
    throw new databaseError.DataEntryError("practical");
  }
}

// Service function to delete a Practical entity by ID
export async function deletePracticalById(practicalId) {
  try {
    const deleted = await Practical.deleteOne({ _id: practicalId });
    if (deleted.deletedCount > 0) {
      return deleted;
    }
    throw new databaseError.DataDeleteError("practical");
  } catch (error) {
    throw new databaseError.DataDeleteError("practical");
  }
}
