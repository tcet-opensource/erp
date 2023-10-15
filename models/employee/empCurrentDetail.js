import connector from "#models/databaseUtil";

const employeeCurrentEmploymentSchema = {
  uid: { type: String, require: true },
  date_of_joining: { type: Date, required: true },
  department_name: { type: String, required: true },
  designation: { type: String, required: true },
  job_status: { type: String, required: true },
  job_profile: { type: String, required: true },
  current_ctc: { type: Number, required: true },
};

// eslint-disable-next-line  no-unused-vars
const EmployeeCurrentEmployment = connector.model(
  "EmployeeCurrentEmployement",
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

  const empCurrentEmploymentDoc = await empCurEmp.save();
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
