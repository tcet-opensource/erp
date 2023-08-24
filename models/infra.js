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
  const res = await Infrastructure.findOneAndDelete(filter);
  return res;
}

async function create(name, type, wing, floor, capacity) {
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

async function read(filter, limit = 1) {
  const infrastructureData = await Infrastructure.find(filter).limit(limit);
  return infrastructureData;
}

async function update(filter, updateObject) {
  const infrastructure = await Infrastructure.findOneAndUpdate(filter, updateObject, { new: true });
  return infrastructure;
}

export default {
  create, read, update, remove,
};
