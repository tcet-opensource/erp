import connector from "#models/databaseUtil";

const timetableSchema = {
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  classIncharge: {
    type: connector.Schema.Types.ObjectId,
    ref: "Faculty",
    required: true,
  },
  group: {
    type: connector.Schema.Types.ObjectId,
    ref: "Group",
    required: true,
  },
  activityBlueprints: {
    type: connector.Schema.Types.ObjectId,
    ref: "ActivityBlueprint",
    required: true,
  },
  lunchbreakStartTime: { type: String, required: true },
  lunchbreakDuration: { type: Number, required: true },
  teabreakStartTime: { type: String, required: true },
  teabreakDuration: { type: Number, required: true },
};

const Timetable = connector.model("Timetable", timetableSchema);

async function remove(filter) {
  const deleteTimetable = await Timetable.deleteMany(filter);
  return deleteTimetable.acknowledged;
}

async function create(timetableData) {
  const {
    startDate,
    endDate,
    classIncharge,
    group,
    activityBlueprints,
    lunchbreakStartTime,
    lunchbreakDuration,
    teabreakStartTime,
    teabreakDuration,
  } = timetableData;
  const timetable = new Timetable({
    startDate,
    endDate,
    classIncharge,
    group,
    activityBlueprints,
    lunchbreakStartTime,
    lunchbreakDuration,
    teabreakStartTime,
    teabreakDuration,
  });
  const timetableDoc = await timetable.save();
  return timetableDoc;
}

async function read(filter, limit = 1) {
  const timetableDoc = await Timetable.find(filter).limit(limit);
  return timetableDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Timetable.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
