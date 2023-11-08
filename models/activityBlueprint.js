import connector from "#models/databaseUtil";

const activityBluePrintSchema = {
  day: {
    type: String,
    enum: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    required: true,
  },
  startTime: { type: String, required: true },
  duration: { type: Number, required: true },
  infra: {
    type: connector.Schema.Types.ObjectId,
    ref: "Infrastructure",
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
    enum: ["lecture", "practical", "tutorial"],
    required: true,
  },
  group: {
    type: connector.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
};

// eslint-disable-next-line  no-unused-vars
const ActivityBlueprint = connector.model(
  "ActivityBlueprint",
  activityBluePrintSchema,
);

async function remove(filter) {
  const deleteResult = await ActivityBlueprint.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(activityBlueprintData) {
  const {
    number,
    academicYear,
    day,
    startTime,
    duration,
    infra,
    course,
    faculty,
    type,
    group,
  } = activityBlueprintData;
  const activityBlueprint = new ActivityBlueprint({
    number,
    academicYear,
    day,
    startTime,
    duration,
    infra,
    course,
    faculty,
    type,
    group,
  });
  const activityBlueprintDoc = await activityBlueprint.save();
  return activityBlueprintDoc;
}

async function createMultiple(activityBlueprintDataArray) {
  const activityBlueprints = activityBlueprintDataArray.map(
    ({
      number,
      academicYear,
      day,
      startTime,
      duration,
      infra,
      course,
      faculty,
      type,
      group,
    }) =>
      ActivityBlueprint({
        number,
        academicYear,
        day,
        startTime,
        duration,
        infra,
        course,
        faculty,
        type,
        group,
      }),
  );

  const activityBlueprintDocs =
    await ActivityBlueprint.insertMany(activityBlueprints);
  return activityBlueprintDocs;
}

async function read(filter, limit = 0, page = 1) {
  const activityblueprintDoc = await ActivityBlueprint.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await ActivityBlueprint.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: activityblueprintDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await ActivityBlueprint.updateMany(
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
