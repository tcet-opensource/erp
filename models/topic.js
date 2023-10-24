import connector from "#models/databaseUtil";

const topicSchema = {
  title: { type: String, required: true },
};
// eslint-disable-next-line  no-unused-vars
const Topic = connector.model("Topic", topicSchema);

//  CURD operations
async function create(topicData) {
  const { title } = topicData;
  const topic = new Topic({
    title,
  });
  const topicDoc = await topic.save();
  return topicDoc;
}

async function createMultiple(topicDataArray) {
  const topics = topicDataArray.map((title) =>
    Topic({
      title,
    }),
  );
  const topicDocs = await Topic.insertMany(topics);
  return topicDocs;
}

async function read(filter, limit = 0, page = 1) {
  const topicDoc = await Topic.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Topic.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: topicDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Topic.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Topic.deleteMany(filter);
  return deleteResult.acknowledged;
}
export default {
  create,
  remove,
  update,
  read,
  createMultiple,
};
