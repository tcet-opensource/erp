import Topic from "#models/topic";
import databaseError from "#error/database";

export async function addNewAopic(title) {
  const newTopic = await Topic.create({
    title,
  });
  if (newTopic.name === name) {
    return newAopic;
  }
  throw new databaseError.DataEntryError("Add Topic");
}

export async function getTopics(filter) {
  const topics = await Topic.read(filter);
  if (topics) {
    return topics;
  }
  throw new databaseError.DataNotFoundError("Topic");
}

export async function deleteTopicById(topicId) {
  const deleted = await Topic.remove({ _id: topicId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("Topic");
}

export async function updateTopicById(id, data) {
  const updated = await Topic.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("Topic");
}
