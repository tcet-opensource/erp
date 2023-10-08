import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import facultyModel from "#models/faculty";

jest.mock("#util");
const {agent} = global;

// test case for deletion
function cleanUp(callback) {
    facultyModel.remove(
        {
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
            department: ["5f7b75a5c69e2d4f0c285e52"],
            preferredSubjects: ["5f7b75a5c69e2d4f0c285e53"],
            designation: "Assistant Professor",
            natureOfAssociation: "Regular",
            additionalResponsibilities: "Teaching and Research",
        },
    )
        .then(() => {
            connector.disconnect((DBerr) => {
                if (DBerr) console.log("Database disconnect error: ", DBerr);
                callback();
                });
            });
}

afterAll((done) => {
    cleanUp(done);
});

describe("Faculty API", () => {
    it("should create faculty", async () => {
        const response = await agent.post("/faculty/create").send({
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
            department: ["5f7b75a5c69e2d4f0c285e52"],
            preferredSubjects: ["5f7b75a5c69e2d4f0c285e53"],
            designation: "Assistant Professor",
            natureOfAssociation: "Regular",
            additionalResponsibilities: "Teaching and Research",
        });

        expect(response.status).toBe(200);
        expect(response.body.res).toMatch(/added faculty/);
    });

    describe("after adding faculty", () => {
        let id;
        beforeEach(async () => {
            id = await agent.post("/faculty/create").send(
                {
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
                    department: ["5f7b75a5c69e2d4f0c285e52"],
                    preferredSubjects: ["5f7b75a5c69e2d4f0c285e53"],
                    designation: "Assistant Professor",
                    natureOfAssociation: "Regular",
                    additionalResponsibilities: "Teaching and Research",
                });

            id = JSON.parse(id.res.text).id;
        });

        afterEach(async () => {
            await facultyModel.remove(
                {
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
                    department: ["5f7b75a5c69e2d4f0c285e52"],
                    preferredSubjects: ["5f7b75a5c69e2d4f0c285e53"],
                    designation: "Assistant Professor",
                    natureOfAssociation: "Regular",
                    additionalResponsibilities: "Teaching and Research",
                });
        });

        it("should read faculty", async () => {
            const response = await agent
                .get("/faculty/list")
                .send({ERPID: "test123"});

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