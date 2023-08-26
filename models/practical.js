import connector from "#models/databaseUtil";

const practicalSchema = {
  no: { type: Number, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  hours: { type: Number, required: true },
  cognitiveLevels: [{
    type: String,
    required: true,
    enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
  }],
};

// eslint-disable-next-line  no-unused-vars
const Practical = connector.model("Practical", practicalSchema);

//  CRUD operations
async function remove(filter) {
  const deleteResult = await Practical.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(practicalData) {
  const {
    no, type, title, hours, cognitiveLevels,
  } = practicalData;
  const practical = new Practical({
    no,
    type,
    title,
    hours,
    cognitiveLevels,
  });
  const practicalDoc = await practical.save();
  return practicalDoc;
}

async function read(filter, limit = 1) {
  const practicalDoc = await Practical.find(filter).limit(limit);
  return practicalDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Practical.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create, read, update, remove,
};
