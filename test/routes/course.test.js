import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import course from "#models/course";
import semesterModel from "#models/semester";
import departmentModel from "#models/department";
import moduleModel from "#models/module";
import practicalModel from "#models/practical";
import tutorialModel from "#models/tutorial";

jest.mock("#util");
const { agent } = global;
let semesterId;
let departmentId;
let moduleIds;
let practicalIds;
let tutorialIds;

function cleanUp(callback) {
  course
    .remove({
      semester: semesterId,
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error: ", DBerr);
      });
      callback();
    });
}
/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  semesterId = await semesterModel.read({}, 1);
  semesterId = semesterId.data[0]._id;
  departmentId = await departmentModel.read({}, 1);
  departmentId = departmentId.data[0]._id;
  moduleIds = await moduleModel.read({}, 3);
  moduleIds = moduleIds.data.flatMap((obj) => obj._id);
  practicalIds = await practicalModel.read({}, 3);
  practicalIds = practicalIds.data.flatMap((obj) => obj._id);
  tutorialIds = await tutorialModel.read({}, 3);
  tutorialIds = tutorialIds.data.flatMap((obj) => obj._id);
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("Course API", () => {
  it("should create course", async () => {
    const response = await agent.post("/course/create").send({
      name: "my favourite course",
      code: "DDSABUB123",
      theoryHours: 12,
      tutorialHours: 4,
      practicalHours: 3,
      ISAMarks: 60,
      ESEMarks: 60,
      tutorialMarks: 20,
      practicalMarks: 20,
      semester: semesterId,
      department: departmentId,
      subType: "open",
      prerequisites: ["prereq"], // array of strings
      objective: "objective",
      outcomes: [
        {
          outcome: "outcome 1",
          RBTLevel: ["L1", "L2"],
        },
      ], // this is the modules from syllabus
      modules: moduleIds,
      practicals: practicalIds,
      tutorials: tutorialIds,
      reccTextbooks: ["random book"],
      refBooks: ["random book"],
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added course/);
  });

  describe("after adding course", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/course/create").send({
        name: "my second favourite course",
        code: "EEEABUB123",
        theoryHours: 12,
        tutorialHours: 4,
        practicalHours: 3,
        ISAMarks: 60,
        ESEMarks: 60,
        tutorialMarks: 20,
        practicalMarks: 20,
        semester: semesterId,
        department: departmentId,
        subType: "open",
        prerequisites: ["prereq"], // array of strings
        objective: "objective",
        outcomes: [
          {
            outcome: "outcome 1",
            RBTLevel: ["L1", "L2"],
          },
        ], // this is the modules from syllabus
        modules: moduleIds,
        practicals: practicalIds,
        tutorials: tutorialIds,
        reccTextbooks: ["random book"],
        refBooks: ["random book"],
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await course.remove({
        code: "EEEABUB123",
      });
    });

    it("should read course", async () => {
      const response = await agent.get("/course/list");
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update course", async () => {
      const response = await agent
        .post(`/course/update/${id}`)
        .send({ subType: "professional" });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated course with id/);
    });
  });
});
