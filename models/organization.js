import connector from "#models/databaseUtil";

const organizationSchema = {
  parent: { type: connector.Schema.Types.ObjectId, ref: "Organization", required: "true" },
  startDate: { type: Date, required: true },
  name: { type: String, required: true },
  accreditations: [{ type: connector.Schema.Types.ObjectId, ref: "Accrediation", required: "true" }],
};

const Organization = connector.model("Organization", organizationSchema);

async function remove(filter) {
  const deleteResult = await Organization.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(organizationData) {
  const {
    parent, startDate, name, accreditation,
  } = organizationData;
  const organization = new Organization({
    parent,
    startDate,
    name,
    accreditation,
  });
  const organizationDoc = await organization.save();
  return organizationDoc;
}

async function read(filter, limit = 1) {
  const organizationDoc = await Organization.find(filter).limit(limit);
  return organizationDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Organization.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create, read, update, remove,
};
