import connector from "#models/databaseUtil";

const organizationSchema = {
  parent: {
    type: connector.Schema.Types.ObjectId,
    ref: "Organization",
  },
  startDate: { type: Date, required: true },
  name: { type: String, required: true },
  accreditations: [
    {
      type: connector.Schema.Types.ObjectId,
      ref: "Accreditation",
      required: "true",
    },
  ],
};

const Organization = connector.model("Organization", organizationSchema);

async function remove(filter) {
  const deleteResult = await Organization.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(organizationData) {
  const { parent, startDate, name, accreditations } = organizationData;
  const organization = new Organization({
    parent,
    startDate,
    name,
    accreditations,
  });
  const organizationDoc = await organization.save();
  return organizationDoc;
}

async function createMultiple(organizationDataArray) {
  const organizations = organizationDataArray.map(
    ({ parent, startDate, name, accreditations }) =>
      Organization({
        parent,
        startDate,
        name,
        accreditations,
      }),
  );

  const organizationDocs = await Organization.insertMany(organizations);
  return organizationDocs;
}

async function read(filter, limit = 0, page = 1) {
  const organizationDoc = await Organization.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Organization.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: organizationDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Organization.updateMany(
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
