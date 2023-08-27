import connector from "#models/databaseUtil";

const accreditationSchema = {
  name: { type: String, required: true },
  agencyName: { type: String, required: true },
  dateofAccreditation: { type: Date, required: true },
  dateofExpiry: { type: Date, required: true },
};

const Accreditation = connector.model("Accreditation", accreditationSchema);

async function remove(filter) {
  const deleteResult = await Accreditation.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(accreditationData) {
  const {
    name, agencyName, dateofAccreditation, dateofExpiry,
  } = accreditationData;
  const accreditation = new Accreditation({
    name,
    agencyName,
    dateofAccreditation,
    dateofExpiry,
  });
  const accreditationDoc = await accreditation.save();
  return accreditationDoc;
}

async function read(filter, limit = 1) {
  const accreditationDoc = await Accreditation.find(filter).limit(limit);
  return accreditationDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const deleteResult = await Accreditation.updateMany(filter, { $set: updateObject }, options);
  return deleteResult.acknowledged;
}

export default {
  create, read, update, remove,
};
