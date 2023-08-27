import connector from "#models/databaseUtil";

const departmentSchema = {
  name: { type: Number, required: true },
  acronym: { type: String, required: true, immutable: true },
  yearOfStarting: { type: Date, immutable: true, required: true },
  accreditations: [{
    type: connector.Schema.Types.ObjectId,
    ref: "Accreditation",
    required: true,
  }],
  infrastructures: [{
    type: connector.Schema.Types.ObjectId,
    ref: "Infrastructure",
    required: true,
  }],
};

const Department = connector.model("Department", departmentSchema);

// for creating
async function create(departmentData) {
  const {
    name, acronym, yearOfStarting, accreditions, infrastructures,
  } = departmentData;
  const department = new Department({
    name,
    acronym,
    yearOfStarting,
    accreditions,
    infrastructures,
  });
  const departmentDoc = await department.save();
  return departmentDoc;
}

async function read(filter, limit = 1) {
  const departmentDoc = await Department.find(filter).limit(limit);
  return departmentDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await Department.findOneAndUpdate(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await Department.findOneAndDelete(filter);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
