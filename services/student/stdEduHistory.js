import StudentEducation from "#models/student/stdEduHistory";
import databaseError from "#error/database";

export async function createStudentEducation(
    uid,
    tenth,
    cetHscDetails,
    graduationDetails,
) {
  const newStudentEducation = await StudentEducation.create({
    uid,
    tenth: {
      marks: tenth.marks,
      percentage: tenth.percentage,
      seatNumber: tenth.seatNumber,
      examName: tenth.examName,
      examBoard: tenth.examBoard,
      msOms: tenth.msOms,
      meritNumberInQualifyingExam: tenth.meritNumberInQualifyingExam,
      admittedNumber: tenth.admittedNumber,
    },
    cetHscDetails: {
      cetRollNo: cetHscDetails.cetRollNo,
      cetMarks: cetHscDetails.cetMarks,
      qualifyingExamForAdmission: cetHscDetails.qualifyingExamForAdmission,
      stdType: cetHscDetails.stdType,
      streamOpted: cetHscDetails.streamOpted,
      mediumOfInstruction: cetHscDetails.mediumOfInstruction,
      aggTotalMarks: cetHscDetails.aggTotalMarks,
      totalMarksOutOf: cetHscDetails.totalMarksOutOf,
      percentOfMarks: cetHscDetails.percentOfMarks,
      attemptNo: cetHscDetails.attemptNo,
      passingMonth: cetHscDetails.passingMonth,
      passingYear: cetHscDetails.passingYear,
      institutionName: cetHscDetails.institutionName,
      educBoardName: cetHscDetails.educBoardName,
      pcmPercent: cetHscDetails.pcmPercent,
      pbmPercent: cetHscDetails.pbmPercent,
      stuQualifyingExam: cetHscDetails.stuQualifyingExam,
      marksObtained: cetHscDetails.marksObtained,
      stateRank: cetHscDetails.stateRank,
      prevExamSeatNumber: cetHscDetails.prevExamSeatNumber,
      prevTcNumber: cetHscDetails.prevTcNumber,
      hscPassedSchoolName: cetHscDetails.hscPassedSchoolName,
      boardPattern: cetHscDetails.boardPattern,
      scholarshipName: cetHscDetails.scholarshipName,
      scholarshipType: cetHscDetails.scholarshipType,
      dteSeatType: cetHscDetails.dteSeatType,
      dteUserPassword: cetHscDetails.dteUserPassword,
      dteUserId: cetHscDetails.dteUserId,
    },
    graduationDetails: {
      graduationInstitute: graduationDetails.graduationInstitute,
      graduationBranch: graduationDetails.graduationBranch,
      graduationDegree: graduationDetails.graduationDegree,
      graduationMarksPct: graduationDetails.graduationMarksPct,
      graduationsPassingYear: graduationDetails.graduationsPassingYear,
      urbanRural: graduationDetails.urbanRural,
      scholarshipNumber: graduationDetails.scholarshipNumber,
      lastSchoolCollegeAttended: graduationDetails.lastSchoolCollegeAttended,
    },
  });
  if (newStudentEducation.uid === uid) {
    return newStudentEducation;
  }
  throw new databaseError.DataEntryError("student education");
}

export async function updateStudentEducationById(id, data) {
  const updated = await StudentEducation.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("student education");
}

export async function studentEducationList(filter) {
  const studentEducationDetails = await StudentEducation.read(filter, 0);
  return studentEducationDetails;
}

export async function deleteStudentEducationById(studentEducationId) {
  const deleted = await StudentEducation.remove({ _id: studentEducationId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("student education");
}
