import connector from "#models/databaseUtil";

const tutorialSchema = {
  no: { type: Number, required: true },
  title: { type: String, unique: true, required: true },
  hours: { type: Number, required: true },
  cognitiveLevel: [{
    type: String,
    enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
    default: "L1",
  }],
};

// eslint-disable-next-line  no-unused-vars
const Tutorial = connector.model("Tutorial", tutorialSchema);

/// CRUD Operations ///

// Add a new tutorial to the database
async function create(tutorialData) {
  const tutorial = new Tutorial(tutorialData);
  const tutorialDoc = await tutorial.save();
  return tutorialDoc;
}

// Retrieve tutorials based on a given filter and limit
async function read(filter, limit = 1) {
  const tutorialDoc = await Tutorial.find(filter).limit(limit);
  return tutorialDoc;
}

// Update tutorials based on a given filter and update data
async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Tutorial.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

// Delete tutorials based on a given filter
async function remove(filter) {
  const deleteResult = await Tutorial.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

// Export the CRUD functions
export default {
  create,
  read,
  update,
  remove,
};
