import Student from "#models/student";
import databaseError from "#error/database";
import stdBank from "#models/student/stdBank";
import stdCollege from "#models/student/stdCollege";
import stdEduHistory from "#models/student/stdEduHistory";
import stdMedHistory from "#models/student/stdMedHistory";
import stdPersonal from "#models/student/stdPersonal";

export async function createStudent(studentDetails, session) {
  const { ERPID, name, joiningYear, branch, division, rollNo, coursesOpted } =
    studentDetails;
  const newStudent = await Student.create({
    ERPID,
    name,
    joiningYear,
    branch,
    division,
    rollNo,
    coursesOpted,
    session,
  });
  if (newStudent.name === name) {
    return newStudent;
  }
  throw new databaseError.DataEntryError("student");
}

export async function createStdBank(studentBankdetails, session) {
  const { uid, bankName, bankAccount, bankBranch, bankIfsc, bankMicr } =
    studentBankdetails;
  const newStdBank = await stdBank.create({
    uid,
    bankName,
    bankAccount,
    bankBranch,
    bankIfsc,
    bankMicr,
    session,
  });
  if (newStdBank.uid === uid) {
    return newStdBank;
  }
  throw new databaseError.DataEntryError("stdBank");
}

export async function createStdCollege(studentCollegeDetails, session) {
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
  } = studentCollegeDetails;
  const newstdCollege = await stdCollege.create({
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
    session,
  });
  if (newstdCollege.uid === uid) {
    return newstdCollege;
  }
  throw new databaseError.DataEntryError("stdCollege");
}

export async function createStdEduHistory(studentEducationHistory, session) {
  const {
    uid,
    marks,
    percentage,
    seatNumber,
    examName,
    examBoard,
    msOms,
    meritNumberInQualifyingExam,
    admittedNumber,
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
    graduationInstitute,
    graduationBranch,
    graduationDegree,
    graduationMarksPct,
    graduationsPassingYear,
    urbanRural,
    scholarshipNumber,
    lastSchoolCollegeAttended,
  } = studentEducationHistory;
  const newStdEduHistory = await stdEduHistory.create({
    uid,
    // tenth: {
    marks,
    percentage,
    seatNumber,
    examName,
    examBoard,
    msOms,
    meritNumberInQualifyingExam,
    admittedNumber,
    // },
    // cetHscDetails: {
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
    // },
    // graduationDetails: {
    graduationInstitute,
    graduationBranch,
    graduationDegree,
    graduationMarksPct,
    graduationsPassingYear,
    urbanRural,
    scholarshipNumber,
    lastSchoolCollegeAttended,
    // },
    session,
  });
  if (newStdEduHistory.uid === uid) {
    return newStdEduHistory;
  }
  throw new databaseError.DataEntryError("stdEduHistory");
}

export async function createStdMedHistory(studentMedicalHistory, session) {
  const {
    uid,
    bloodGroup,
    pastMedicalHistory,
    immunisationHistory,
    chronicMedicalConditions,
    parentsEmailId,
    parentsContact,
    relativeContacts,
  } = studentMedicalHistory;
  const newStdMedHistory = await stdMedHistory.create({
    uid,
    bloodGroup,
    pastMedicalHistory,
    immunisationHistory,
    chronicMedicalConditions,
    parentsEmailId,
    parentsContact,
    relativeContacts,
    session,
  });
  if (newStdMedHistory.uid === uid) {
    return newStdMedHistory;
  }
  throw new databaseError.DataEntryError("stdMedHistory");
}

export async function createStdPersonal(studentPersonalDetails, session) {
  const {
    uid,
    title,
    firstName,
    middleName,
    motherName,
    gender,
    dob,
    age,
    birthPlace,
    nationality,
    motherTongue,
    domicileState,
    religion,
    castCategory,
    maharashtraKarnatakaBorderCandidate,
    castDescription,
    subCasteDescription,
    nonCreamyLayerCertificateAttached,
    hobby,
    passportNo,
    bloodGroup,
    physicallyHandicapped,
    studentMobNo,
    studentMail,
    parentMobNo,
    parentMail,
    perAddrDescr,
    perPlotNo,
    perStreetName,
    perStuAddr1,
    perStuAddr2,
    city,
    percellphone,
    perpincode,
    perresiphone,
    permailaddress,
    country,
    state,
    district,
    tahsil,
    correspondanceAddrDescr,
    correspondancePlotNo,
    correspondanceStreetName,
    correspondanceStuAddr1,
    correspondanceStuAddr2,
    correspondanceCity,
    correspondanceCellPhone,
    correspondancePincode,
    correspondanceResiPhone,
    correspondanceMailAddress,
    correspondanceCountry,
    correspondanceState,
    correspondanceDistrict,
    correspondanceTahsil,
    fatherDetails,
    fathersOccupation,
    parentsFirstName,
    parentsMiddleName,
    parentsLastName,
    guardianMobNo,
    guardianMailId,
    nameAsPerTc,
    casteAsPerTc,
    birthStatus,
    maritalStatus,
    panCardNo,
    passportExpiry,
    drivingLicNo,
    drivingLicValidTo,
    aadharCardNo,
    electionCardNo,
    motherMobNo,
    motherEmailId,
    parentIncome,
    photoUploaded,
    signUploaded,
    thumbUploaded,
    noOfDocumentsUploaded,
  } = studentPersonalDetails;
  const newStdPersonal = await stdPersonal.create({
    uid,
    title,
    firstName,
    middleName,
    motherName,
    gender,
    dob,
    age,
    birthPlace,
    nationality,
    motherTongue,
    domicileState,
    religion,
    castCategory,
    maharashtraKarnatakaBorderCandidate,
    castDescription,
    subCasteDescription,
    nonCreamyLayerCertificateAttached,
    hobby,
    passportNo,
    bloodGroup,
    physicallyHandicapped,
    studentMobNo,
    studentMail,
    parentMobNo,
    parentMail,
    perAddrDescr,
    perPlotNo,
    perStreetName,
    perStuAddr1,
    perStuAddr2,
    city,
    percellphone,
    perpincode,
    perresiphone,
    permailaddress,
    country,
    state,
    district,
    tahsil,
    correspondanceAddrDescr,
    correspondancePlotNo,
    correspondanceStreetName,
    correspondanceStuAddr1,
    correspondanceStuAddr2,
    correspondanceCity,
    correspondanceCellPhone,
    correspondancePincode,
    correspondanceResiPhone,
    correspondanceMailAddress,
    correspondanceCountry,
    correspondanceState,
    correspondanceDistrict,
    correspondanceTahsil,
    fatherDetails,
    fathersOccupation,
    parentsFirstName,
    parentsMiddleName,
    parentsLastName,
    guardianMobNo,
    guardianMailId,
    nameAsPerTc,
    casteAsPerTc,
    birthStatus,
    maritalStatus,
    panCardNo,
    passportExpiry,
    drivingLicNo,
    drivingLicValidTo,
    aadharCardNo,
    electionCardNo,
    motherMobNo,
    motherEmailId,
    parentIncome,
    photoUploaded,
    signUploaded,
    thumbUploaded,
    noOfDocumentsUploaded,
    session,
  });
  if (newStdPersonal.uid === uid) {
    return newStdPersonal;
  }
  throw new databaseError.DataEntryError("stdPersonal");
}

export async function updateStudentById(id, data) {
  const updated = await Student.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("student");
}

export async function studentList(filter, limit, page) {
  const studlist = await Student.read(filter, limit, page);
  return studlist;
}

export async function deleteStudentById(StudentId) {
  const deleted = await Student.remove({ _id: StudentId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("student");
}
