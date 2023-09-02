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

async function remove(filter) {
  const deleteResult = await Coursework.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(courseworkData) {
  const {
    student,type,course,task,objectID,activity,marks
  } = courseworkData;
  const coursework = new Coursework({
    student,
    type,
    course,
    task,
    objectID,
    activity,
    marks
  });
  const courseworkDoc = await coursework.save();
  return courseworkDoc;
}

async function read(filter, limit = 1) {
  const courseworkDoc = await Coursework.find(filter).limit(limit);
  return courseworkDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Coursework.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create, read, update, remove,
};