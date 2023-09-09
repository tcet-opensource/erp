import connector from "#models/databaseUtil";

const activityBluePrintSchema = {
  number: { type: Number, required: true },
  academicYear: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^20\d{2}$/.test(value), // changed the valid year format starting from "20" !!
      message: (props) => `${props.value} is not a valid year format starting with "2"!`,
    },
  },
  type: { enum: ["ODD", "EVEN"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
};

// eslint-disable-next-line  no-unused-vars
const ActivityBlueprint = connector.model("ActivityBlueprint", activityBluePrintSchema);

async function remove(filter) {
  const deleteResult = await ActivityBlueprint.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(activityBlueprintData) {
  const {
    number, academicYear, type, startDate, endDate,
  } = activityBlueprintDataData;
  const activityblueprint = new ActivityBlueprint({
    number,
    academicYear,
    type,
    startDate,
    endDate,
  });
  const activityblueprintDoc = await activityblueprint.save();
  return activityblueprintDoc;
}

async function read(filter, limit = 1) {
  const activityblueprintDoc = await ActivityBlueprint.find(filter).limit(limit);
  return activityblueprintDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const deleteResult = await ActivityBlueprint.updateMany(filter, { $set: updateObject }, options);
  return deleteResult.acknowledged;
}

export default {
  create, read, update, remove,
};
