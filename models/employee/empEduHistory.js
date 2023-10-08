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
const EmployeeEducationHistory = 
connector.model("Employee education history", 
employeeEducationHistorySchema);

// CRUD Operations

async function create(employeeEducationHistoryData) {
  const {
    educationType,
    educationName,
    specialization,
    period,
    institutionName,
    university,
    passingDivision,
    fromYear,
    uptoYear,
    registrationNumber,
    aggregatePct,
    finalYearPct,
    numberOfAttempts,
    rank,
    passingYear,
    uid,
    ssc,
    hsc,
    dip,
    iti,
    deg,
    pgd,
    phd,
    pdoc,
  } = employeeEducationHistoryData;

  const empEduHistory = new EmployeeEducationHistory({
    educationType,
    educationName,
    specialization,
    period,
    institutionName,
    university,
    passingDivision,
    fromYear,
    uptoYear,
    registrationNumber,
    aggregatePct,
    finalYearPct,
    numberOfAttempts,
    rank,
    passingYear,
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

  const empEduHistoryDoc =  await empEduHistory.save();
  return empEduHistoryDoc;
}


async function read(filter, limit=1) {
  const empEduHistoryDoc = employeeEducationHistorySchema.find(filter).limit(limit);
  return empEduHistoryDoc;
}


async function update(filter, updateObject, options={ multi: true }) {
  const updateResult = await employeeEducationHistorySchema.updateMany(
    filter,
    {$set: updateObject},
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult= await employeeEducationHistorySchema.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

export default{
  create, read, update, remove,
};