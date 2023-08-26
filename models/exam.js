import connector from "#models/databaseUtil";

const examSchema = {
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  supervisor: { type: connector.Schema.Types.ObjectId, ref: "Faculty", required: "true" },
  infrastructure: { type: connector.Schema.Types.ObjectId, ref: "Infrastructure", required: "true" },
  course: { type: connector.Schema.Types.ObjectId, ref: "Course", required: "true" },
};

const exam = connector.model("Exam", examSchema);