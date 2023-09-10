import connector from "#models/databaseUtil";

const activitySchema = {
  activityBlueprint: { type: connector.Schema.Types.ObjectId, ref: "ActivityBlueprint", required: true },
  startTime: { type: Date, required: true },
  duration: { type: Number, required: true },
  course: { type: connector.Schema.Types.ObjectId, ref: "Course", required: true },
  faculty: { type: connector.Schema.Types.ObjectId, ref: "Faculty", required: true },
  type: {
    type: String,
    required: true,
    enum: ["LECTURE", "PRACTICAL", "TUTORIAL"],
  },
  task: [{
    type: connector.Schema.Types.ObjectId,
    ref: ["Topic", "Practical", "Tutorial"],
    required: true,
  }],
  group: { type: connector.Schema.Types.ObjectId, ref: "Group", required: true },
  students: [{ type: connector.Schema.Types.ObjectId, ref: "Student", required: true }],
};

const Activity = connector.model("Activity", activitySchema);

// crud

async function create(activityData) {
  const {
    activityBlueprint, startTime, duration, course, faculty, type, task, group, students,
  } = activityData;
  const activity = new Activity({
    activityBlueprint, startTime, duration, course, faculty, type, task, group, students,
  });
  const activityDoc = await activity.save();
  return activityDoc;
}

async function read(filter, limit = 1) {
  const activityDoc = await Activity.find(filter).limit(limit);
  return activityDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Activity.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Activity.deleteMany(filter);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
