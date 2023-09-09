import connector from "#models/databaseUtil";

const paperSchema = {
  answerSheetID: { type: String, required: true },
  exam: [{ type: connector.Schema.Types.ObjectId, ref: "Exam", required: true }],
  student: [{ type: connector.Schema.Types.ObjectId, ref: "Student", required: true }],
  checkedBy: [{ type: connector.Schema.Types.ObjectId, ref: "Faculty", required: true }],
  mark: { type: Number, required: true },
};

// eslint-disable-next-line  no-unused-vars
const Paper = connector.model("Paper", paperSchema);

// CRUD OPERATIONS

async function remove(filter) {
  const deleteResult = await Paper.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(paperData) {
  const {
    answerSheetID, exam, student, checkedBy, mark,
  } = paperData;
  const paper = new Paper({
    answerSheetID,
    exam,
    student,
    checkedBy,
    mark,
  });
  const paperDoc = await paper.save();
  return paperDoc;
}

async function read(filter, limit = 1) {
  const paperDoc = await Paper.find(filter).limit(limit);
  return paperDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Paper.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create, read, update, remove,
};
