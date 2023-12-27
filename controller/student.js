import mongoose from "mongoose";
import {
  createStdBank,
  createStdCollege,
  createStdEduHistory,
  createStdMedHistory,
  createStdPersonal,
  createStudent,
  deleteStudentById,
  studentList,
  updateStudentById,
} from "#services/student";
import { logger } from "#util";
import { isEntityIdValid } from "#middleware/entityIdValidation";
import Department from "#models/department";
import Course from "#models/course";
import { departmentAbbrev, departmentNames } from "#constant";

async function addStudent(req, res) {
  const {
    name,
    joiningYear,
    branch,
    division,
    rollNo,
    coursesOpted,
    uid,
    /* Model stdBAnkdetails */
    bankName,
    bankAccount,
    bankBranch,
    bankIfsc,
    bankMicr,
    /* Model  stdCollege */
    /* uid, */
    admissionYear,
    studentCode,
    /* rollNo,
    //it rollNo is repeated as uid is being repeated */
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
    /* Model stdEduHistory */
    /* uid, */
    //  tenth: {
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
    /* Model stdMedHistory */
    /* uid, */
    bloodGroup,
    pastMedicalHistory,
    immunisationHistory,
    chronicMedicalConditions,
    parentsEmailId,
    parentsContact,
    relativeContacts,
    /* Model stdPersonal */
    /* uid, */
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
    /* bloodGroup, */
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
  } = req.body;
  try {
    const isBranchValid = await isEntityIdValid(branch, Department);
    const isCourseValid = await isEntityIdValid(coursesOpted, Course);
    if (isBranchValid && isCourseValid) {
      const departmentData = await Department.read({ _id: branch });
      const departmentName = departmentData.data[0].name;
      const abbrev = departmentAbbrev[departmentNames.indexOf(departmentName)];
      const year = joiningYear.toString().slice(-2);
      let randomNumber = Math.floor(Math.random() * 1000).toString();
      if (randomNumber.length === 2) {
        randomNumber = `0${randomNumber}`;
      }
      const ERPID = `S${abbrev}${year}${randomNumber}`;

      const session = await mongoose.startSession();
      session.startTransaction();

      try {
        const newStudent = await createStudent(
          { ERPID, name, joiningYear, branch, division, rollNo, coursesOpted },
          session,
        );
        const newStdBank = await createStdBank(
          {
            uid,
            bankName,
            bankAccount,
            bankBranch,
            bankIfsc,
            bankMicr,
          },
          session,
        );
        const newstdCollege = await createStdCollege(
          {
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
          },
          session,
        );
        const newStdEduHistory = await createStdEduHistory(
          {
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
          },
          session,
        );
        const newStdMedHistory = await createStdMedHistory(
          {
            uid,
            bloodGroup,
            pastMedicalHistory,
            immunisationHistory,
            chronicMedicalConditions,
            parentsEmailId,
            parentsContact,
            relativeContacts,
          },
          session,
        );
        const newStdPersonal = await createStdPersonal(
          {
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
          },
          session,
        );
        await session.commitTransaction();
        res.status(200).json({
          res: `added user ${newStudent.id} ${newStdBank.bankAccount} ,${newstdCollege.enrollmentNo}, ${newStdEduHistory.uid},${newStdMedHistory.uid},${newStdPersonal.uid}`,
          id: newStudent.id,
        });
      } catch (err) {
        console.log(err);
        await session.abortTransaction();
      } finally {
        session.endSession();
      }
    } else {
      let error = ""; // eslint-disable-line prefer-const
      if (!isBranchValid) error = error.concat("Invalid branch");
      if (!isCourseValid) error = error.concat(" Invalid course opted");
      res.status(400).json({ err: error });
    }
  } catch (caughtError) {
    logger.error("Error while inserting", caughtError);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateStudent(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateStudentById(id, data);
    res.json({ res: `updated Student with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getStudent(req, res) {
  const filter = req.body;
  const { limit, page } = req.query;
  const StudList = await studentList(filter, limit, page);
  res.json({ res: StudList });
}

async function deleteStudent(req, res) {
  const { id } = req.params;
  try {
    await deleteStudentById(id);

    res.json({ res: `Deleted Student with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}
export default {
  addStudent,
  deleteStudent,
  getStudent,
  updateStudent,
};
