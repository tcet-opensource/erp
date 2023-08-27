import connector from "#models/databaseUtil";

const groupSchema = {
  title: { type: String, required: true },
  students: [{ type: connector.Schema.Types.ObjectId, ref: "Student", required: true }],
};

const Group = connector.model("Group", groupSchema);

async function create(groupData) {
  const { title, students } = groupData;
  const groupDoc = await Group.create({ title, students });
  return groupDoc;
}

async function read(filter, limit = 1) {
  const groupDoc = await Group.find(filter).limit(limit);
  return groupDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Group.updateManyupdateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}
async function remove(groupId) {
  const deleteResult = await Group.deleteMany(groupId);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
