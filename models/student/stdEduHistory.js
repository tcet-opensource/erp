import connector from "#models/databaseUtil";

const studentEducationSchema = {
  uid: { type: String, required: true },
  // tenth_details
  tenth: {
    marks: { type: String, required: true },
    percentage: { type: Number, required: true },
    seatNumber: { type: String, required: true },
    examName: { type: String, required: true },
    examBoard: { type: String, required: true },
    msOms: { type: String, required: true },
    meritNumberInQualifyingExam: { type: String, required: true },
    admittedNumber: { type: String, required: true },
  },
  cetHscDetails: {
    cetRollNo: { type: String, required: true },
    cetMarks: { type: String, required: true },
    qualifyingExamForAdmission: { type: String, required: true },
    stdType: { type: String, required: true },
    streamOpted: { type: String, required: true },
    mediumOfInstruction: { type: String, required: true },
    aggTotalMarks: { type: Number, required: true },
    totalMarksOutOf: { type: Number, required: true },
    percentOfMarks: { type: String, required: true },
    attemptNo: { type: String, required: true },
    passingMonth: { type: String, required: true },
    passingYear: { type: String, required: true },
    institutionName: { type: String, required: true },
    educBoardName: { type: String, required: true },
    pcmPercent: { type: String, required: true },
    pbmPercent: { type: String, required: true },
    stuQualifyingExam: { type: String, required: true },
    marksObtained: { type: String, required: true },
    stateRank: { type: String, required: true },
    prevExamSeatNumber: { type: String, required: false },
    prevTcNumber: { type: String, required: false },
    hscPassedSchoolName: { type: String, required: true },
    boardPattern: { type: String, required: true },
    scholarshipName: { type: String, required: false },
    scholarshipType: { type: String, required: false },
    dteSeatType: { type: String, required: true },
    dteUserPassword: { type: String, required: true },
    dteUserId: { type: String, required: true },
  },
  graduationDetails: {
    graduationInstitute: { type: String, required: true },
    graduationBranch: { type: String, required: true },
    graduationDegree: { type: String, required: true },
    graduationMarksPct: { type: Number, required: true },
    graduationsPassingYear: { type: String, required: true },
    urbanRural: { type: String, required: true },
    scholarshipNumber: { type: String, required: false },
    lastSchoolCollegeAttended: { type: String, required: true },
  },
};

const StudentEducation = connector.model("Student education", studentEducationSchema);

async function create(studentEducationData) {
  const {
    uid,
    tenth: {
      marks,
      percentage,
      seatNumber,
      examName,
      examBoard,
      msOms,
      meritNumberInQualifyingExam,
      admittedNumber,
    },
    cetHscDetails: {
      cetRollNo,
      cetMarks,
      qualifyingExamForAdmission,
      stdType,
      streamOpted,
      mediumOfInstruction,
      aggTotalMarks,
      totalMarksOutOf,
      percentOfMarks,
      attemptNo,
      passingMonth,
      passingYear,
      institutionName,
      educBoardName,
      pcmPercent,
      pbmPercent,
      stuQualifyingExam,
      marksObtained,
      stateRank,
      prevExamSeatNumber,
      prevTcNumber,
      hscPassedSchoolName,
      boardPattern,
      scholarshipName,
      scholarshipType,
      dteSeatType,
      dteUserPassword,
      dteUserId,
    },
    graduationDetails: {
      graduationInstitute,
      graduationBranch,
      graduationDegree,
      graduationMarksPct,
      graduationsPassingYear,
      urbanRural,
      scholarshipNumber,
      lastSchoolCollegeAttended,
    },
  } = studentEducationData;

  const stdEducation = new StudentEducation({
    uid,
    tenth: {
      marks,
      percentage,
      seatNumber,
      examName,
      examBoard,
      msOms,
      meritNumberInQualifyingExam,
      admittedNumber,
    },
    cetHscDetails: {
      cetRollNo,
      cetMarks,
      qualifyingExamForAdmission,
      stdType,
      streamOpted,
      mediumOfInstruction,
      aggTotalMarks,
      totalMarksOutOf,
      percentOfMarks,
      attemptNo,
      passingMonth,
      passingYear,
      institutionName,
      educBoardName,
      pcmPercent,
      pbmPercent,
      stuQualifyingExam,
      marksObtained,
      stateRank,
      prevExamSeatNumber,
      prevTcNumber,
      hscPassedSchoolName,
      boardPattern,
      scholarshipName,
      scholarshipType,
      dteSeatType,
      dteUserPassword,
      dteUserId,
    },
    graduationDetails: {
      graduationInstitute,
      graduationBranch,
      graduationDegree,
      graduationMarksPct,
      graduationsPassingYear,
      urbanRural,
      scholarshipNumber,
      lastSchoolCollegeAttended,
    },
  });
    const stdEducationDoc = await stdEducation.save();
    return stdEducationDoc;
  
}

async function read(filter, limit = 1) {
  const stdEducationDoc = studentEducationSchema.find(filter).limit(limit);
  return stdEducationDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await studentEducationSchema.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(stdEducationId) {
  const deleteResult = await studentEducationSchema.deleteMany(stdEducationId);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
