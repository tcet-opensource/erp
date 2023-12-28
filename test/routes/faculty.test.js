import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import facultyModel from "#models/faculty";
import facultyEducationModel from "#models/employee/empEduHistory";
import facultyPersonalModel from "#models/employee/empPersonal";
import facultyBankModel from "#models/employee/empBank";
import facultyCurrentModel from "#models/employee/empCurrentDetail";
import courseModel from "#models/course";
import departmentModel from "#models/department";

jest.mock("#util");
const { agent } = global;
let departmentId;
let courseId;

// test case for deletion
function cleanUp(callback) {
  facultyBankModel.remove({ uid: "aaaaa" });
  facultyCurrentModel.remove({ uid: "aaaaa" });
  facultyEducationModel.remove({ uid: "aaaaa" });
  facultyPersonalModel.remove({ uid: "aaaaa" });
  facultyModel
    .remove({
      ERPID: "test123",
      dateOfJoining: "2023-06-18T14:11:30Z",
      dateOfLeaving: "2023-07-18T14:11:30Z",
      profileLink: "Sanika",
      qualifications: ["Ph.D.", "M.Sc."],
      totalExperience: 5,
      achievements: ["Award 1", "Award 2"],
      areaOfSpecialization: ["Specialization 1", "Specialization 2"],
      papersPublishedPG: 10,
      papersPublishedUG: 5,
      department: [departmentId],
      preferredSubjects: [courseId],
      designation: "Assistant Professor",
      natureOfAssociation: "Regular",
      additionalResponsibilities: "Teaching and Research",
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error: ", DBerr);
        callback();
      });
    });
}

/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  courseId = await courseModel.read({}, 1);
  courseId = courseId.data[0]._id;
  departmentId = await departmentModel.read({}, 1);
  departmentId = departmentId.data[0]._id;
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("Faculty API", () => {
  it("should create faculty", async () => {
    const response = await agent.post("/faculty/create").send({
      dateOfJoining: "2023-06-18T14:11:30Z",
      dateOfLeaving: "2023-07-18T14:11:30Z",
      profileLink: "xyz",
      qualifications: ["Ph.D.", "M.Sc."],
      totalExperience: 5,
      achievements: ["Award 1", "Award 2"],
      areaOfSpecialization: ["Specialization 1", "Specialization 2"],
      papersPublishedPG: 10,
      papersPublishedUG: 5,
      department: [departmentId],
      preferredSubjects: [courseId],
      designation: "Assistant Professor",
      natureOfAssociation: "Regular",
      additionalResponsibilities: "Teaching and Research",
      employeePersonalDetails: {
        uid: "aaaaa",
        title: "Mr",
        empFirstName: "Tejas",
        empMiddleName: "Ajit",
        empLastName: "Nair",
        bloodGroup: "A+",
        dob: "2023-06-18T14:11:30Z",
        birthPlace: "Bangalore",
        motherTongue: "Malayalam",
        gender: "Male",
        religion: "Hindu",
        numOfChildren: 0,
        originalCastCategory: "General",
        caste: "General",
        subCaste: "General",
        emrgContactNo: 90123108,
        emrgContactPersonName: "Me",
        empMobileNo: 900123213,
        panNumber: 12414125125,
        aadharCardNo: 512512421312312,
        identificationMark: "on my left cheek",
        addressTypePermanant: "Rooftop",
        permanantPlotNo: "1323",
        permanantStreet: "123123",
        permanantAddress: "123123",
        permanantCity: "Mumbai",
        permanantTahshil: "123213",
        permanantDistrict: "123123",
        permanantState: "123123",
        permanantCountry: "123213",
        permanantPincode: 123132,
        addressTypeCorrespondance: "12321321",
        correspondancePlotNo: "123123",
        correspondanceStreet: "123123",
        correspondanceAddress: "123123123",
        correspondanceCity: "123213",
        correspondanceTahshil: "12321312",
        correspondanceDistrict: "12321321",
        correspondanceState: "3212312",
        correspondanceCountry: "12312312",
        correspondancePincode: 1231232,
        maritalStatus: "123213213",
        isNameChangedBefore: false,
      },
      employeeEducationDetails: {
        uid: "aaaaa",
        ssc: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
        hsc: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
        dip: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
        iti: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
        deg: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
        pgd: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
        phd: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
        pdoc: {
          educationType: "12321312",
          educationName: "123123",
          specialization: "13213123",
          period: "2133",
          institutionName: "Mithibia",
          university: "MU",
          passingDivision: "A",
          fromYear: "123213",
          uptoYear: "213213",
          registrationNumber: "123213213",
          aggregatePct: "2923",
          finalYearPct: "2021",
          numberOfAttempts: 3,
          rank: 3,
          passingYear: "2020",
        },
      },
      employeeCurrentDetails: {
        uid: "aaaaa",
        dateOfJoining: "2023-06-18T14:11:30Z",
        departmentName: "COMP",
        designation: "Loser",
        jobStatus: "jobless",
        jobProfile: "none",
        currentCtc: 69420,
      },
      employeeBankDetails: {
        uid: "aaaaa",
        bankName: "Bank of Baroda",
        bankAcc: "123214215123",
        bankBranch: "Kandivali",
        bankIfsc: "13212312312",
        bankMicr: "123123123",
        appointmentApproveSgDte: "12321321",
      },
    });
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added faculty/);

    await Promise.all([
      facultyBankModel.remove({ uid: "aaaaa" }),
      facultyCurrentModel.remove({ uid: "aaaaa" }),
      facultyEducationModel.remove({ uid: "aaaaa" }),
      facultyPersonalModel.remove({ uid: "aaaaa" }),
    ]);
  });


  describe("after adding faculty", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/faculty/create").send({
        ERPID: "test123",
        dateOfJoining: "2023-06-18T14:11:30Z",
        dateOfLeaving: "2023-07-18T14:11:30Z",
        profileLink: "xyz",
        qualifications: ["Ph.D.", "M.Sc."],
        totalExperience: 5,
        achievements: ["Award 1", "Award 2"],
        areaOfSpecialization: ["Specialization 1", "Specialization 2"],
        papersPublishedPG: 10,
        papersPublishedUG: 5,
        department: [departmentId],
        preferredSubjects: [courseId],
        designation: "Assistant Professor",
        natureOfAssociation: "Regular",
        additionalResponsibilities: "Teaching and Research",
        employeePersonalDetails: {
          uid: "aaaaa",
          title: "Mr",
          empFirstName: "Tejas",
          empMiddleName: "Ajit",
          empLastName: "Nair",
          bloodGroup: "A+",
          dob: "2023-06-18T14:11:30Z",
          birthPlace: "Bangalore",
          motherTongue: "Malayalam",
          gender: "Male",
          religion: "Hindu",
          numOfChildren: 0,
          originalCastCategory: "General",
          caste: "General",
          subCaste: "General",
          emrgContactNo: 90123108,
          emrgContactPersonName: "Me",
          empMobileNo: 900123213,
          panNumber: 12414125125,
          aadharCardNo: 512512421312312,
          identificationMark: "on my left cheek",
          addressTypePermanant: "Rooftop",
          permanantPlotNo: "1323",
          permanantStreet: "123123",
          permanantAddress: "123123",
          permanantCity: "Mumbai",
          permanantTahshil: "123213",
          permanantDistrict: "123123",
          permanantState: "123123",
          permanantCountry: "123213",
          permanantPincode: 123132,
          addressTypeCorrespondance: "12321321",
          correspondancePlotNo: "123123",
          correspondanceStreet: "123123",
          correspondanceAddress: "123123123",
          correspondanceCity: "123213",
          correspondanceTahshil: "12321312",
          correspondanceDistrict: "12321321",
          correspondanceState: "3212312",
          correspondanceCountry: "12312312",
          correspondancePincode: 1231232,
          maritalStatus: "123213213",
          isNameChangedBefore: false,
        },
        employeeEducationDetails: {
          uid: "aaaaa",
          ssc: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
          hsc: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
          dip: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
          iti: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
          deg: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
          pgd: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
          phd: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
          pdoc: {
            educationType: "12321312",
            educationName: "123123",
            specialization: "13213123",
            period: "2133",
            institutionName: "Mithibia",
            university: "MU",
            passingDivision: "A",
            fromYear: "123213",
            uptoYear: "213213",
            registrationNumber: "123213213",
            aggregatePct: "2923",
            finalYearPct: "2021",
            numberOfAttempts: 3,
            rank: 3,
            passingYear: "2020",
          },
        },
        employeeCurrentDetails: {
          uid: "aaaaa",
          dateOfJoining: "2023-06-18T14:11:30Z",
          departmentName: "COMP",
          designation: "Loser",
          jobStatus: "jobless",
          jobProfile: "none",
          currentCtc: 69420,
        },
        employeeBankDetails: {
          uid: "aaaaa",
          bankName: "Bank of Baroda",
          bankAcc: "123214215123",
          bankBranch: "Kandivali",
          bankIfsc: "13212312312",
          bankMicr: "123123123",
          appointmentApproveSgDte: "12321321",
        },
      });

      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await Promise.all([
        facultyBankModel.remove({ uid: "aaaaa" }),
        facultyCurrentModel.remove({ uid: "aaaaa" }),
        facultyEducationModel.remove({ uid: "aaaaa" }),
        facultyPersonalModel.remove({ uid: "aaaaa" }),
        facultyModel.remove({
          ERPID: "test123",
          dateOfJoining: "2023-06-18T14:11:30Z",
          dateOfLeaving: "2023-07-18T14:11:30Z",
          profileLink: "xyz",
          qualifications: ["Ph.D.", "M.Sc."],
          totalExperience: 5,
          achievements: ["Award 1", "Award 2"],
          areaOfSpecialization: ["Specialization 1", "Specialization 2"],
          papersPublishedPG: 10,
          papersPublishedUG: 5,
          department: [departmentId],
          preferredSubjects: [courseId],
          designation: "Assistant Professor",
          natureOfAssociation: "Regular",
          additionalResponsibilities: "Teaching and Research",
        }),
      ]);
    });

    it("should read faculty", async () => {
      const response = await agent
        .get("/faculty/list")
        .send({ ERPID: "test123" });

      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update faculty", async () => {
      const response = await agent
        .post(`/faculty/update/${id}`)
        .send({ ERPID: "test123" }, { totalExperience: 10 });
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated faculty/);
    });
  });
});
