import connector from "#models/databaseUtil";

const examSchema = {
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  supervisor: { type: connector.Schema.Types.ObjectId, ref: "Faculty", required: "true" },
  infrastructure: { type: connector.Schema.Types.ObjectId, ref: "Infrastructure", required: "true" },
  course: { type: connector.Schema.Types.ObjectId, ref: "Course", required: "true" },
};

const Exam = connector.model("Exam", examSchema);

async function create(examData) {
  const exam = new Exam(examData);
  const examDoc = await exam.save();
  return examDoc;
}

async function read(filter, limit = 1) {
  const examDoc = await Exam.find(filter).limit(limit);
  return examDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Exam.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Exam.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};