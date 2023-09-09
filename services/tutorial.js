import Tutorial from "#models/tutorial";
import databaseError from "#error/database";

export async function addNewTutorial(no, title, hours, cognitiveLevel) {
  const newTutorial = await Tutorial.create({
    no,
    title,
    hours,
    cognitiveLevel,
  });
  if (newTutorial.title === title) {
    return newTutorial;
  }
  throw new databaseError.DataEntryError("Add Tutorial");
}

export async function getTutorials(filter) {
  const tutorials = await Tutorial.read(filter);
  if (tutorials) {
    return tutorials;
  }
  throw new databaseError.DataNotFoundError("Tutorial");
}

export async function deleteTutorialById(tutorialId) {
  const deleted = await Tutorial.remove({ _id: tutorialId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Tutorial");
}

export async function updateTutorialById(id, data) {
  const updated = await Tutorial.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Tutorial");
}

export default {
  deleteTutorialById, addNewTutorial, updateTutorialById, getTutorials,
};
