import connector from "#models/databaseUtil";

const paperSchema = {
  answerSheetID: { type: String, required: true },
  exam: { type: connector.Schema.Types.ObjectId, ref: "Exam", required: true },
  student: {
    type: connector.Schema.Types.ObjectId,
    ref: "Student",
    required: true,
  },
  checkedBy: {
    type: connector.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  mark: { type: Number, required: true },
};

const Paper = connector.model("Paper", paperSchema);

// CRUD OPERATIONS

async function remove(filter) {
  const deleteResult = await Paper.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(paperData) {
  const { answerSheetID, exam, student, checkedBy, mark } = paperData;
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

async function createMultiple(paperDataArray) {
  const papers = paperDataArray.map(
    ({ answerSheetID, exam, student, checkedBy, mark }) =>
      Paper({
        answerSheetID,
        exam,
        student,
        checkedBy,
        mark,
      }),
  );

  const paperDocs = await Paper.insertMany(papers);
  return paperDocs;
}

async function read(filter, limit = 0, page = 1) {
  const paperDoc = await Paper.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Paper.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: paperDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Paper.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
  createMultiple,
};
