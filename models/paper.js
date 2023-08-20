import mongooseLong from "mongoose-long";
import connector from "#models/databaseUtil";

mongooseLong(connector);
const { Long } = connector.Schema.Types;

const paperSchema = {
  answerSheetID: { type: Long, required: true },
  exam: [{ type: connector.Schema.Types.ObjectId, ref: "Exam", required: true }],
  student: [{ type: connector.Schema.Types.ObjectId, ref: "Student", required: true }],
  checkedBy: [{ type: connector.Schema.Types.ObjectId, ref: "Faculty", required: true }],
  mark: { type: Number, required: true },
};

const Paper = connector.model("Paper", paperSchema);
