import connector from "#models/databaseUtil";

const studentMedicalSchema = {
  uid: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  pastMedicalHistory: { type: String, required: true },
  immunisationHistory: { type: String, required: true },
  chronicMedicalConditions: { type: String },
  parentsEmailId: { type: String, required: true },
  parentsContact: { type: Number, required: true },
  relativeContacts: { type: Number, required: true },
};

const MedicalHistory = connector.model("StudentMedical", studentMedicalSchema);

// CRUD OPERATIONS

async function remove(filter) {
  const deleteResult = await MedicalHistory.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(studentMedicalData) {
  const {
    uid,
    bloodGroup,
    pastMedicalHistory,
    immunisationHistory,
    chronicMedicalConditions,
    parentsEmailId,
    parentsContact,
    relativeContacts,
  } = studentMedicalData;
  const medicalHistory = new MedicalHistory({
    uid,
    bloodGroup,
    pastMedicalHistory,
    immunisationHistory,
    chronicMedicalConditions,
    parentsEmailId,
    parentsContact,
    relativeContacts,
  });
  const medicalHistoryDoc = await medicalHistory.save({
    session: studentMedicalData.session,
  });
  return medicalHistoryDoc;
}

async function read(filter, limit = 0, page = 1) {
  const medicalHistoryDoc = await MedicalHistory.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await MedicalHistory.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: medicalHistoryDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await MedicalHistory.updateMany(
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
};
