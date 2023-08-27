import connector from "#models/databaseUtil";

const courseworkSchema = {
  student: { type: connector.Schema.Types.ObjectId, ref: "Student", required: true },
  type: { type: String, enum: ["onCampus", "offCampus"], required: true },
  course: { type: connector.Schema.Types.ObjectId, ref: "Course", required: true },
  task: { type: connector.Schema.Types.ObjectId, refPath: "objectID", required: true },
  objectID: { type: String, enum: ["Practical", "Tutorial", "Assignment"], required: true },
  activity: { type: connector.Schema.Types.ObjectId, ref: "Activity", required: true },
  marks: { type: Number, required: true },
};

// eslint-disable-next-line  no-unused-vars
const Coursework = connector.model("Coursework", courseworkSchema);
