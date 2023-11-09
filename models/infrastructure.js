import connector from "#models/databaseUtil";

const infrastructureSchema = {
  name: { type: String, required: true },
  type: { type: String, required: true },
  wing: { type: String, required: true },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
  organization: {
    type: connector.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
};

const Infrastructure = connector.model("Infrastructure", infrastructureSchema);

async function remove(filter) {
  const deleteResult = await Infrastructure.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(infrastructureData) {
  const { name, type, wing, floor, capacity, organization } =
    infrastructureData;
  const infrastructure = new Infrastructure({
    name,
    type,
    wing,
    floor,
    capacity,
    organization,
  });
  const infrastructureDoc = await infrastructure.save();
  return infrastructureDoc;
}

async function createMultiple(infrastructureDataArray) {
  const infrastructures = infrastructureDataArray.map(
    ({ name, type, wing, floor, capacity, organization }) =>
      Infrastructure({
        name,
        type,
        wing,
        floor,
        capacity,
        organization,
      }),
  );

  const infrastructureDocs = await Infrastructure.insertMany(infrastructures);
  return infrastructureDocs;
}

async function read(filter, limit = 0, page = 1) {
  const infrastructureDoc = await Infrastructure.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Infrastructure.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: infrastructureDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Infrastructure.updateMany(
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
