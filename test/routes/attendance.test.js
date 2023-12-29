import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import attendanceModel from "#models/attendance";
import connector from "#models/databaseUtil";
import courseModel from "#models/course";
import studentModel from "#models/student";

jest.mock("#util");
const { agent } = global;
let courseId;
let studentId;

/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  courseId = await courseModel.read({}, 1);
  courseId = courseId.data[0]._id;
  studentId = await studentModel.read({}, 1);
  studentId = studentId.data[0]._id;
  callback();
}

beforeAll((done) => {
  getIds(done);
});

function cleanUp(callback) {
  attendanceModel.remove({ monthlyAttended: 123456 }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database dissconnnect error: ", DBerr);
      callback();
    });
  });
}

afterAll((done) => {
  cleanUp(done);
});

describe("checking attendance functions", () => {
  it("create attendance", async () => {
    const response = await agent.post("/attendance/add").send({
      student: studentId,
      course: courseId,
      monthlyAttended: 123456,
      monthlyOccured: 123,
      cumulativeAttended: 123,
      cumulativeOccured: 123,
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added attendance/);
  });
  let id;
  beforeEach(async () => {
    id = await agent.post("/attendance/add").send({
      student: studentId,
      course: courseId,
      monthlyAttended: 123456,
      monthlyOccured: 123,
      cumulativeAttended: 123,
      cumulativeOccured: 123,
    });
    id = JSON.parse(id.res.text).id;
  });

  afterEach(async () => {
    await attendanceModel.remove({ student: studentId });
  });

  it("read attendance", async () => {
    const response = await agent
      .get("/attendance/list")
      .send({ student: studentId });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update attendance", async () => {
    const response = await agent
      .post(`/attendance/update/${id}`)
      .send({ student: studentId });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/attendance updated/);
  });
});
