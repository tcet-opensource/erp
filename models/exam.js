import connector from "#models/databaseUtil";

const examSchema = {
  date: { type: Date, required: true },
  startTime: { type: time, required: true },
  duration: { type: Number, required: true },
  supervisor: { type: connector.Schema.Types.ObjectId, ref: "Faculty", required: "true" },
  Infrastructure: { type: connector.Schema.Types.ObjectId, ref: "infrastructure", required: "true" },
  course: { type: connector.Schema.Types.ObjectId, ref: "Course", required: "true" },
};

const exam = connector.model("exam", examSchema);