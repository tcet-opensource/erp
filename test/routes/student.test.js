import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import studentModel from "#models/student";
import courseModel from "#models/course"; // Update this import
import departmentModel from "#models/department";
import stdBank from "#models/student/stdBank";
import stdCollege from "#models/student/stdCollege";
import stdEduHistory from "#models/student/stdEduHistory";
import stdMedHistory from "#models/student/stdMedHistory";
import stdPersonal from "#models/student/stdPersonal";

jest.mock("#util");
const { agent } = global;

let courseIds;
let branchId;
function cleanUp(callback) {
  stdBank.remove({ uid: "USR25123456445" });
  stdCollege.remove({ uid: "USR25123456445" });
  stdEduHistory.remove({ uid: "USR25123456445" });
  stdMedHistory.remove({ uid: "USR25123456445" });
  stdPersonal.remove({ uid: "USR25123456445" });
  studentModel.remove({ branch: branchId }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database disconnect error : ", DBerr);
      callback();
    });
  });
}

/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  branchId = await departmentModel.read({});
  branchId = branchId.data[0]._id;
  courseIds = await courseModel.read({}, 3);
  courseIds = courseIds.data.flatMap((obj) => obj._id);
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("Student API", () => {
  it("should create student", async () => {
    const response = await agent.post("/student/create").send({
      ERPID: "ST14556245",
      name: "John",
      joiningYear: 2022,
      branch: branchId,
      division: "B",
      rollNo: 101,
      coursesOpted: courseIds,
      uid: "USR25123456445",
      bankName: "Example Bank",
      bankAccount: "001234567890",
      bankBranch: "Main Branch",
      bankIfsc: "ABCD0123456",
      bankMicr: "012345678",
      admissionYear: "2022",
      studentCode: "SC123",
      admissionStatus: "Admitted",
      admissionPattern: "Regular",
      admissionCategory: "General",
      seatDesc: "Engineering",
      quotaType: "Government",
      isBoarderStudent: true,
      seatType: "Regular",
      seatSubType: "Computer Science",
      eligibilityNo: "EL12345",
      enrollmentNo: "EN123456",
      marks: "500",
      percentage: 80.5,
      seatNumber: "S123",
      examName: "SSC",
      examBoard: "State Board",
      msOms: "OMS123",
      meritNumberInQualifyingExam: "M123",
      admittedNumber: "A123",
      cetRollNo: "CET123",
      cetMarks: "120",
      qualifyingExamForAdmission: "HSC",
      stdType: "Science",
      streamOpted: "Engineering",
      mediumOfInstruction: "English",
      aggTotalMarks: 450,
      totalMarksOutOf: 500,
      percentOfMarks: "90%",
      attemptNo: "1",
      passingMonth: "May",
      passingYear: "2022",
      institutionName: "XYZ School",
      educBoardName: "State Board",
      pcmPercent: "85%",
      pbmPercent: "88%",
      stuQualifyingExam: "HSC",
      marksObtained: "450",
      stateRank: "10",
      prevExamSeatNumber: "PREV123",
      prevTcNumber: "TC123",
      hscPassedSchoolName: "ABC College",
      boardPattern: "State Board",
      scholarshipName: "Merit Scholarship",
      scholarshipType: "Merit",
      dteSeatType: "Government",
      dteUserPassword: "password123",
      dteUserId: "user123",
      graduationInstitute: "XYZ University",
      graduationBranch: "Computer Science",
      graduationDegree: "B.Tech",
      graduationMarksPct: 75.5,
      graduationsPassingYear: "2026",
      urbanRural: "Urban",
      scholarshipNumber: "SCHOLAR123",
      lastSchoolCollegeAttended: "ABC School",
      bloodGroup: "A+",
      pastMedicalHistory: "No significant past medical history.",
      immunisationHistory: "Up-to-date immunizations.",
      chronicMedicalConditions: "None",
      parentsEmailId: "parent@example.com",
      parentsContact: 1234567890,
      relativeContacts: 9876543210,
      title: "Mr",
      firstName: "John",
      middleName: "Doe",
      motherName: "Jane Doe",
      gender: "Male",
      dob: "2023-05-07T06:10:19.426+00:00",
      age: 32,
      birthPlace: "Cityville",
      nationality: "Indian",
      motherTongue: "English",
      domicileState: "StateXYZ",
      religion: "Hindu",
      castCategory: "General",
      maharashtraKarnatakaBorderCandidate: true,
      castDescription: "CasteXYZ",
      subCasteDescription: "SubCasteXYZ",
      nonCreamyLayerCertificateAttached: true,
      hobby: "Reading",
      passportNo: 1234567890,
      physicallyHandicapped: false,
      studentMobNo: 9876543210,
      studentMail: "john.doe@example.com",
      parentMobNo: 7890123456,
      parentMail: "parent.doe@example.com",
      perAddrDescr: "Permanent Address",
      perPlotNo: 10,
      perStreetName: "StreetXYZ",
      perStuAddr1: "Address Line 1",
      perStuAddr2: "Address Line 2",
      city: "CityXYZ",
      percellphone: 9876543210,
      perpincode: 560001,
      perresiphone: 7890123456,
      permailaddress: "john.doe@home.com",
      country: "India",
      state: "StateXYZ",
      district: "DistrictXYZ",
      tahsil: "TahsilXYZ",
      correspondanceAddrDescr: "Correspondence Address",
      correspondancePlotNo: 20,
      correspondanceStreetName: "Correspondence Street",
      correspondanceStuAddr1: "Correspondence Address Line 1",
      correspondanceStuAddr2: "Correspondence Address Line 2",
      correspondanceCity: "Correspondence City",
      correspondanceCellPhone: 9876543210,
      correspondancePincode: 560002,
      correspondanceResiPhone: 7890123456,
      correspondanceMailAddress: "john.doe@correspondence.com",
      correspondanceCountry: "India",
      correspondanceState: "StateXYZ",
      correspondanceDistrict: "DistrictXYZ",
      correspondanceTahsil: "TahsilXYZ",
      fatherDetails: "FatherXYZ",
      fathersOccupation: "OccupationXYZ",
      parentsFirstName: "ParentFirst",
      parentsMiddleName: "ParentMiddle",
      parentsLastName: "ParentLast",
      guardianMobNo: 8765432109,
      guardianMailId: "guardian@example.com",
      nameAsPerTc: "John Doe",
      casteAsPerTc: "CasteXYZ",
      birthStatus: "Alive",
      maritalStatus: true,
      panCardNo: 987654321,
      passportExpiry: "2023-05-07T06:10:19.426+00:00",
      drivingLicNo: 123456789,
      drivingLicValidTo: "2023-05-07T06:10:19.426+00:00",
      aadharCardNo: 123456789012,
      electionCardNo: 9876543210,
      motherMobNo: 8765432109,
      motherEmailId: "mother.doe@example.com",
      parentIncome: 100000,
      photoUploaded: true,
      signUploaded: true,
      thumbUploaded: true,
      noOfDocumentsUploaded: 5,
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added user/);
    await Promise.all([
      stdBank.remove({ uid: "USR25123456445" }),
      stdCollege.remove({ uid: "USR25123456445" }),
      stdEduHistory.remove({ uid: "USR25123456445" }),
      stdMedHistory.remove({ uid: "USR25123456445" }),
      stdPersonal.remove({ uid: "USR25123456445" }),
    ]);
  }, 40000);

  describe("after adding student", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/student/create").send({
        ERPID: "ST14556245",
        name: "John",
        joiningYear: 2022,
        branch: branchId,
        division: "B",
        rollNo: 101,
        coursesOpted: courseIds,
        uid: "USR25123456445",
        bankName: "Example Bank",
        bankAccount: "001234567890",
        bankBranch: "Main Branch",
        bankIfsc: "ABCD0123456",
        bankMicr: "012345678",
        admissionYear: "2022",
        studentCode: "SC123",
        admissionStatus: "Admitted",
        admissionPattern: "Regular",
        admissionCategory: "General",
        seatDesc: "Engineering",
        quotaType: "Government",
        isBoarderStudent: true,
        seatType: "Regular",
        seatSubType: "Computer Science",
        eligibilityNo: "EL12345",
        enrollmentNo: "EN123456",
        marks: "500",
        percentage: 80.5,
        seatNumber: "S123",
        examName: "SSC",
        examBoard: "State Board",
        msOms: "OMS123",
        meritNumberInQualifyingExam: "M123",
        admittedNumber: "A123",
        cetRollNo: "CET123",
        cetMarks: "120",
        qualifyingExamForAdmission: "HSC",
        stdType: "Science",
        streamOpted: "Engineering",
        mediumOfInstruction: "English",
        aggTotalMarks: 450,
        totalMarksOutOf: 500,
        percentOfMarks: "90%",
        attemptNo: "1",
        passingMonth: "May",
        passingYear: "2022",
        institutionName: "XYZ School",
        educBoardName: "State Board",
        pcmPercent: "85%",
        pbmPercent: "88%",
        stuQualifyingExam: "HSC",
        marksObtained: "450",
        stateRank: "10",
        prevExamSeatNumber: "PREV123",
        prevTcNumber: "TC123",
        hscPassedSchoolName: "ABC College",
        boardPattern: "State Board",
        scholarshipName: "Merit Scholarship",
        scholarshipType: "Merit",
        dteSeatType: "Government",
        dteUserPassword: "password123",
        dteUserId: "user123",
        graduationInstitute: "XYZ University",
        graduationBranch: "Computer Science",
        graduationDegree: "B.Tech",
        graduationMarksPct: 75.5,
        graduationsPassingYear: "2026",
        urbanRural: "Urban",
        scholarshipNumber: "SCHOLAR123",
        lastSchoolCollegeAttended: "ABC School",
        bloodGroup: "A+",
        pastMedicalHistory: "No significant past medical history.",
        immunisationHistory: "Up-to-date immunizations.",
        chronicMedicalConditions: "None",
        parentsEmailId: "parent@example.com",
        parentsContact: 1234567890,
        relativeContacts: 9876543210,
        title: "Mr",
        firstName: "John",
        middleName: "Doe",
        motherName: "Jane Doe",
        gender: "Male",
        dob: "2023-05-07T06:10:19.426+00:00",
        age: 32,
        birthPlace: "Cityville",
        nationality: "Indian",
        motherTongue: "English",
        domicileState: "StateXYZ",
        religion: "Hindu",
        castCategory: "General",
        maharashtraKarnatakaBorderCandidate: true,
        castDescription: "CasteXYZ",
        subCasteDescription: "SubCasteXYZ",
        nonCreamyLayerCertificateAttached: true,
        hobby: "Reading",
        passportNo: 1234567890,
        physicallyHandicapped: false,
        studentMobNo: 9876543210,
        studentMail: "john.doe@example.com",
        parentMobNo: 7890123456,
        parentMail: "parent.doe@example.com",
        perAddrDescr: "Permanent Address",
        perPlotNo: 10,
        perStreetName: "StreetXYZ",
        perStuAddr1: "Address Line 1",
        perStuAddr2: "Address Line 2",
        city: "CityXYZ",
        percellphone: 9876543210,
        perpincode: 560001,
        perresiphone: 7890123456,
        permailaddress: "john.doe@home.com",
        country: "India",
        state: "StateXYZ",
        district: "DistrictXYZ",
        tahsil: "TahsilXYZ",
        correspondanceAddrDescr: "Correspondence Address",
        correspondancePlotNo: 20,
        correspondanceStreetName: "Correspondence Street",
        correspondanceStuAddr1: "Correspondence Address Line 1",
        correspondanceStuAddr2: "Correspondence Address Line 2",
        correspondanceCity: "Correspondence City",
        correspondanceCellPhone: 9876543210,
        correspondancePincode: 560002,
        correspondanceResiPhone: 7890123456,
        correspondanceMailAddress: "john.doe@correspondence.com",
        correspondanceCountry: "India",
        correspondanceState: "StateXYZ",
        correspondanceDistrict: "DistrictXYZ",
        correspondanceTahsil: "TahsilXYZ",
        fatherDetails: "FatherXYZ",
        fathersOccupation: "OccupationXYZ",
        parentsFirstName: "ParentFirst",
        parentsMiddleName: "ParentMiddle",
        parentsLastName: "ParentLast",
        guardianMobNo: 8765432109,
        guardianMailId: "guardian@example.com",
        nameAsPerTc: "John Doe",
        casteAsPerTc: "CasteXYZ",
        birthStatus: "Alive",
        maritalStatus: true,
        panCardNo: 987654321,
        passportExpiry: "2023-05-07T06:10:19.426+00:00",
        drivingLicNo: 123456789,
        drivingLicValidTo: "2023-05-07T06:10:19.426+00:00",
        aadharCardNo: 123456789012,
        electionCardNo: 9876543210,
        motherMobNo: 8765432109,
        motherEmailId: "mother.doe@example.com",
        parentIncome: 100000,
        photoUploaded: true,
        signUploaded: true,
        thumbUploaded: true,
        noOfDocumentsUploaded: 5,
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await Promise.all([
        stdBank.remove({ uid: "USR25123456445" }),
        stdCollege.remove({ uid: "USR25123456445" }),
        stdEduHistory.remove({ uid: "USR25123456445" }),
        stdMedHistory.remove({ uid: "USR25123456445" }),
        stdPersonal.remove({ uid: "USR25123456445" }),
        studentModel.remove({
          ERPID: "ST14556245",
          name: "John",
          joiningYear: 2022,
          branch: branchId,
          division: "B",
          rollNo: 101,
          coursesOpted: courseIds,
        }),
      ]);
    });

    it("should read student", async () => {
      const response = await agent.get("/student/list").send({ name: "Arya" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update student", async () => {
      const response = await agent
        .post(`/student/update/${id}`)
        .send({ ERPID: "S1032220999" }, { joiningYear: 2021 });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(`updated Student with id ${id}`);
    });
  });
});
