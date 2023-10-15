import connector from "#models/databaseUtil";

const assignmentSchema = {
  no: { type: Number, required: true },
  title: { type: String, required: true },
  type: { type: String, required: true, enum: ["FA", "RA"] },
  marks: { type: Number, required: true },
};

// eslint-disable-next-line  no-unused-vars
const Assignment = connector.model("Assignment", assignmentSchema);

/// CRUD Operations ///

async function create(assignmentData) {
  const assignment = new Assignment(assignmentData);
  const assignmentDoc = await assignment.save();
  return assignmentDoc;
}

async function read(filter, limit = 0, page = 1) {
  const assignmentDoc = await Assignment.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Assignment.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: assignmentDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Assignment.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Assignment.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
