import connector from "#models/databaseUtil";

const tutorialSchema = {
  no: { type: Number, required: true },
  title: { type: String, unique: true, required: true },
  hours: { type: Number, required: true },
  cognitiveLevel: [
    {
      type: String,
      enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
      default: "L1",
    },
  ],
};

// eslint-disable-next-line  no-unused-vars
const Tutorial = connector.model("Tutorial", tutorialSchema);

/// CRUD Operations ///

// Add a new tutorial to the database
async function create(tutorialData) {
  const { no, title, hours, cognitiveLevel } = tutorialData;
  const tutorial = new Tutorial({
    no,
    title,
    hours,
    cognitiveLevel,
  });
  const tutorialDoc = await tutorial.save();
  return tutorialDoc;
}

async function createMultiple(tutorialDataArray) {
  const tutorials = tutorialDataArray.map(
    ({ no, title, hours, cognitiveLevel }) =>
      Tutorial({
        no,
        title,
        hours,
        cognitiveLevel,
      }),
  );

  const tutorialDocs = await Tutorial.insertMany(tutorials);
  return tutorialDocs;
}
// Retrieve tutorials based on a given filter and limit
async function read(filter, limit = 0, page = 1) {
  const tutorialDoc = await Tutorial.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Tutorial.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: tutorialDoc };
}

// Update tutorials based on a given filter and update data
async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Tutorial.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
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
  createMultiple,
};
