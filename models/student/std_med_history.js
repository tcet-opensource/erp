import connector from "#models/databaseUtil";

const studentMedicalSchema = {
  uid: { type: String, required: true },
  blood_group: { type: String, required: true },
  past_medical_history: { type: String, required: true },
  immunisation_history: { type: String, required: true },
  chronic_medical_conditions: { type: String },
  parents_emailId: { type: String, required: true },
  parents_contact: { type: Number, required: true },
  relative_contacts: { type: Number, required: true },
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
    blood_group: bloodGroup,
    past_medical_history: pastMedicalHistory,
    immunisation_history: immunisationHistory,
    chronic_medical_conditions: chronicMedicalConditions,
    parents_emailId: parentsEmailId,
    parents_contact: parentsContact,
    relative_contacts: relativeContacts,
  });
  const medicalHistoryDoc = await medicalHistory.save();
  return medicalHistoryDoc;
}

async function read(filter, limit = 1) {
  const medicalHistoryDoc = await MedicalHistory.find(filter).limit(limit);
  return medicalHistoryDoc;
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
