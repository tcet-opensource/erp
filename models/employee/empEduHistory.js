import connector from "#models/databaseUtil";

const Education = {
  educationType: { type: String, required: true },
  educationName: { type: String, required: true },
  specialization: { type: String, required: true },
  period: { type: String, required: true },
  institutionName: { type: String, required: true },
  university: { type: String, required: true },
  passingDivision: { type: String, required: true },
  fromYear: { type: String, required: true },
  uptoYear: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  aggregatePct: { type: String, required: true },
  finalYearPct: { type: String, required: true },
  numberOfAttempts: { type: Number, required: true },
  rank: { type: Number, required: true },
  passingYear: { type: String, required: true },
};
const employeeEducationHistorySchema = {
  uid: { type: String, require: true },
  ssc: { type: Education, required: true },
  hsc: { type: Education, required: true },
  dip: { type: Education },
  iti: { type: Education },
  deg: { type: Education },
  pgd: { type: Education },
  phd: { type: Education },
  pdoc: { type: Education },
};

// eslint-disable-next-line  no-unused-vars
const EmployeeEducationHistory = connector.model(
  "Employee Education",
  employeeEducationHistorySchema,
);

// CRUD Operations

async function create(employeeEducationHistoryData) {
  const { uid, ssc, hsc, dip, iti, deg, pgd, phd, pdoc } =
    employeeEducationHistoryData;

  const empEduHistory = new EmployeeEducationHistory({
    uid,
    ssc,
    hsc,
    dip,
    iti,
    deg,
    pgd,
    phd,
    pdoc,
  });

  const empEduHistoryDoc = await empEduHistory.save({
    session: employeeEducationHistoryData.session,
  });
  return empEduHistoryDoc;
}

async function read(filter, limit = 0, page = 1) {
  const empEduHistoryDoc = await EmployeeEducationHistory.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await EmployeeEducationHistory.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: empEduHistoryDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await EmployeeEducationHistory.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await EmployeeEducationHistory.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
