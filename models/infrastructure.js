import connector from "#models/databaseUtil";

const infrastructureSchema = {
  name: { type: String, required: true },
  type: { type: String, required: true },
  wing: { type: String, required: true },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
};

const Infrastructure = connector.model("Infrastructure", infrastructureSchema);

async function remove(filter) {
  const deleteResult = await Infrastructure.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(infrastructureData) {
  const { name, type, wing, floor, capacity } = infrastructureData;
  const infrastructure = new Infrastructure({
    name,
    type,
    wing,
    floor,
    capacity,
  });
  const infrastructureDoc = await infrastructure.save();
  return infrastructureDoc;
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
};
