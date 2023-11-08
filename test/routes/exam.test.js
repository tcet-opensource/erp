import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import examModel from "#models/exam";
import facultyModel from "#models/faculty";
import courseModel from "#models/course";
import infraModel from "#models/infrastructure";

/* eslint-disable no-underscore-dangle */
jest.mock("#util");
const { agent } = global;
let supervisorId;
let infraId;
let courseId;
function cleanUp(callback) {
  examModel
    .remove({
      supervisor: supervisorId,
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error: ", DBerr);
        callback();
      });
    });
}

async function getIds(callback) {
  supervisorId = await facultyModel.read({}, 1);
  supervisorId = supervisorId.data[0]._id;
  infraId = await infraModel.read({}, 1);
  infraId = infraId.data[0]._id;
  courseId = await courseModel.read({}, 1);
  courseId = courseId.data[0]._id;
  callback();
}

afterAll((done) => {
  cleanUp(done);
});

beforeAll((done) => {
  getIds(done);
});

describe("exam API", () => {
  it("should create exam", async () => {
    const response = await agent.post("/exam/add").send({
      date: "2023-06-18T14:11:30Z",
      startTime: "2023-06-18T14:11:30Z",
      duration: 5,
      supervisor: supervisorId,
      infrastructure: infraId,
      course: courseId,
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added exam/);
  });

  describe("after adding exam", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/exam/add").send({
        date: "2023-06-18T14:11:30Z",
        startTime: "2023-06-18T14:11:30Z",
        duration: 5,
        supervisor: supervisorId,
        infrastructure: infraId,
        course: courseId,
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await examModel.remove({ supervisor: supervisorId });
    });

    it("should read exam", async () => {
      const response = await agent
        .get("/exam/list")
        .send({ supervisor: supervisorId });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update exam", async () => {
      const response = await agent
        .post(`/exam/update/${id}`)
        .send({ duration: 10 });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated exam/);
    });
  });
});
