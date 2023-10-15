import connector from "#models/databaseUtil";

const activityBluePrintSchema = {
  number: { type: Number, required: true },
  academicYear: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^20\d{2}$/.test(value), // changed the valid year format starting from "20" !!
      message: (props) =>
        `${props.value} is not a valid year format starting with "2"!`,
    },
  },
  type: { enum: ["ODD", "EVEN"], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
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
  const { number, academicYear, type, startDate, endDate } =
    activityBlueprintData;
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
};
