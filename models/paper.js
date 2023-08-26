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
