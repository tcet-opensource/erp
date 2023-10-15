import connector from "#models/databaseUtil";

const departmentSchema = {
  name: { type: String, required: true },
  acronym: { type: String, required: true, immutable: true },
  yearOfStarting: { type: Date, immutable: true, required: true },
  accreditations: [
    {
      type: connector.Schema.Types.ObjectId,
      ref: "Accreditation",
      required: true,
    },
  ],
  infrastructures: [
    {
      type: connector.Schema.Types.ObjectId,
      ref: "Infrastructure",
      required: true,
    },
  ],
};

const Department = connector.model("Department", departmentSchema);

// for creating
async function create(departmentData) {
  const { name, acronym, yearOfStarting, accreditations, infrastructures } =
    departmentData;
  const department = new Department({
    name,
    acronym,
    yearOfStarting,
    accreditations,
    infrastructures,
  });
  const departmentDoc = await department.save();
  return departmentDoc;
}

async function read(filter, limit = 0, page = 1) {
  const departmentDoc = await Department.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await Department.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: departmentDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Department.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Department.deleteMany(filter);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
