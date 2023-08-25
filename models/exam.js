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

async function remove(filter) {
  const res = await Exam.findOneAndDelete(filter);
  return res;
}

async function create(date, startTime, duration, supervisor, infrastructure, course) {
  const exam = new Exam({
    date,
    startTime,
    duration,
    supervisor,
    infrastructure,
    course,
  });
  const examDoc = await exam.save();
  return examDoc;
}

async function read(filter, limit = 1) {
  const examData = await Exam.find(filter).limit(limit);
  return examData;
}

async function update(filter, updateObject) {
  const exam = await Exam.findOneAndUpdate(filter, updateObject, { new: true });
  return exam;
}

export default {
  create, read, update, remove,
};