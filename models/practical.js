import connector from "#models/databaseUtil";

const practicalSchema = {
  no: { type: Number, required: true },
  type: {
    type: String,
    required: true,
    enum: ["BASIC", "DESIGN", "PROJECT"],
  },
  title: { type: String, required: true },
  hours: { type: Number, required: true },
  cognitiveLevels: [
    {
      type: String,
      required: true,
      enum: ["L1", "L2", "L3", "L4", "L5", "L6"],
    },
  ],
};

// eslint-disable-next-line  no-unused-vars
const Practical = connector.model("Practical", practicalSchema);

//  CRUD operations
async function remove(filter) {
  const deleteResult = await Practical.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(practicalData) {
  const { no, type, title, hours, cognitiveLevels } = practicalData;
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

async function createMultiple(practicalDataArray) {
  const practicals = practicalDataArray.map(
    ({ no, type, title, hours, cognitiveLevels }) =>
      Practical({
        no,
        type,
        title,
        hours,
        cognitiveLevels,
      }),
  );

  const practicalDocs = await Practical.insertMany(practicals);
  return practicalDocs;
}

async function read(filter, limit = 0, page = 1) {
  const practicalDoc = await Practical.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Practical.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: practicalDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Practical.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

// create({no: 2, type: 'test4', title: 'test4', hours: 2, cognitiveLevels: ['L3']})
// read({title: 'test1'})

export default {
  create,
  read,
  update,
  remove,
  createMultiple,
};
