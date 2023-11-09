import connector from "#models/databaseUtil";

const activitySchema = {
  activityBlueprint: {
    type: connector.Schema.Types.ObjectId,
    ref: "ActivityBlueprint",
    required: true,
  },
  course: {
    type: connector.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  faculty: {
    type: connector.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  type: {
    type: String,
    enum: ["TUTORIAL", "PRACTICAL", "TOPIC", "LECTURE"],
    required: true,
  },
  task: [
    {
      type: connector.Schema.Types.ObjectId,
      required: true,
    },
  ],
  group: {
    type: connector.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  students: [
    { type: connector.Schema.Types.ObjectId, ref: "Student", required: true },
  ],
};

const Activity = connector.model("Activity", activitySchema);

/// crud operation///

// add a activity to the database
async function create(activityData) {
  const {
    activityBlueprint,
    startTime,
    course,
    faculty,
    type,
    task,
    group,
    students,
  } = activityData;
  const activity = new Activity({
    activityBlueprint,
    startTime,
    course,
    faculty,
    type,
    task,
    group,
    students,
  });
  const activityDoc = await activity.save();
  return activityDoc;
}

async function createMultiple(activityDataArray) {
  const activities = activityDataArray.map(
    ({
      activityBlueprint,
      startTime,
      course,
      faculty,
      type,
      task,
      group,
      students,
    }) =>
      Activity({
        activityBlueprint,
        startTime,
        course,
        faculty,
        type,
        task,
        group,
        students,
      }),
  );

  const activityDocs = await Activity.insertMany(activities);
  return activityDocs;
}

// Retrieve activity based on a given  filter and limit
async function read(filter, limit = 0, page = 1) {
  const activityDoc = await Activity.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Activity.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: activityDoc };
}

// update activity based on a given filter
async function update(filter, updateObject, options = { multi: true }) {
  const updateActivity = await Activity.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateActivity.acknowledged;
}

// Delete activity based on a given filter
async function remove(filter) {
  const deleteActivity = await Activity.deleteMany(filter).exec();
  return deleteActivity.acknowledged;
}

// export crud functions

export default {
  create,
  read,
  update,
  remove,
  createMultiple,
};
