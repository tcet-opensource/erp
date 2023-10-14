import connector from "#models/databaseUtil";

const studentCollegeSchema = {
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  admissionYear: {
    type: String,
    required: true,
  },
  studentCode: {
    type: String,
  },
  rollNo: {
    type: String,
  },
  admissionStatus: {
    type: String,
    required: true,
  },
  admissionPattern: {
    type: String,
  },
  admissionCategory: {
    type: String,
    required: true,
  },
  seatDesc: {
    type: String,
  },
  quotaType: {
    type: String,
    required: true,
  },
  isBoarderStudent: {
    type: Boolean,
  },
  seatType: {
    type: String,
    required: true,
  },
  seatSubType: {
    type: String,
    required: true,
  },
  eligibilityNo: {
    type: String,
    required: true,
  },
  enrollmentNo: {
    type: String,
    required: true,
    unique: true,
  },
};

const StudentCollege = connector.model("Student college", studentCollegeSchema);

async function create(studentCollegeData) {
  const {
    uid,
    admissionYear,
    studentCode,
    rollNo,
    admissionStatus,
    admissionPattern,
    admissionCategory,
    seatDesc,
    quotaType,
    isBoarderStudent,
    seatType,
    seatSubType,
    eligibilityNo,
    enrollmentNo,
  } = studentCollegeData;

  const stdCollege = new StudentCollege({
    uid,
    admissionYear,
    studentCode,
    rollNo,
    admissionStatus,
    admissionPattern,
    admissionCategory,
    seatDesc,
    quotaType,
    isBoarderStudent,
    seatType,
    seatSubType,
    eligibilityNo,
    enrollmentNo,
  });

  const stdCollegeDoc = await stdCollege.save();
  return stdCollegeDoc;
}

async function read(filter, limit = 1) {
  const stdCollegeDoc = studentCollegeSchema.find(filter).limit(limit);
  return stdCollegeDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await studentCollegeSchema.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(stdCollegeId) {
  const deleteResult = await studentCollegeSchema.deleteMany(stdCollegeId);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
