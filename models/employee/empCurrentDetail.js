import connector from "#models/databaseUtil";

const employeeCurrentEmploymentSchema = {
  uid: { type: String, require: true },
  dateOfJoining: { type: Date, required: true },
  departmentName: { type: String, required: true },
  designation: { type: String, required: true },
  jobStatus: { type: String, required: true },
  jobProfile: { type: String, required: true },
  currentCtc: { type: Number, required: true },
};

// eslint-disable-next-line  no-unused-vars
const EmployeeCurrentEmployment = connector.model(
  "Employee Employment",
  employeeCurrentEmploymentSchema,
);

async function create(employeeCurrentEmploymentData) {
  const {
    uid,
    dateOfJoining,
    departmentName,
    designation,
    jobStatus,
    jobProfile,
    currentCtc,
  } = employeeCurrentEmploymentData;
  const empCurEmp = new EmployeeCurrentEmployment({
    uid,
    dateOfJoining,
    departmentName,
    designation,
    jobStatus,
    jobProfile,
    currentCtc,
  });

  const empCurrentEmploymentDoc = await empCurEmp.save({
    session: employeeCurrentEmploymentData.session,
  });
  return empCurrentEmploymentDoc;
}

async function read(filter, limit = 0, page = 1) {
  const empCurrentEmploymentDoc = await EmployeeCurrentEmployment.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await EmployeeCurrentEmployment.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: empCurrentEmploymentDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await EmployeeCurrentEmployment.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult =
    await EmployeeCurrentEmployment.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
