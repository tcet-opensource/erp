import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import attendanceModel from "#models/attendance";
import connector from "#models/databaseUtil";

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  attendanceModel.remove({ student: "64fc3c8bde9fa947ea1f412f" }).then(() => {
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
      student: "64fc3c8bde9fa947ea1f412f",
      course: "64fc3c8bde9fa947ea1f412f",
      monthlyAttended: 123,
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
      student: "64fc3c8bde9fa947ea1f412f",
      course: "64fc3c8bde9fa947ea1f412f",
      monthlyAttended: 123,
      monthlyOccured: 123,
      cumulativeAttended: 123,
      cumulativeOccured: 123,
    });
    id = JSON.parse(id.res.text).id;
  });

  afterEach(async () => {
    await attendanceModel.remove({ student: "64fc3c8bde9fa947ea1f412f" });
  });

  it("read attendance", async () => {
    const response = await agent
      .get("/attendance/list")
      .send({ student: "64fc3c8bde9fa947ea1f412f" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update attendance", async () => {
    const response = await agent
      .post(`/attendance/update/${id}`)
      .send({ student: "64fc3c8bde9fa947ea1f412f" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/attendance updated/);
  });
});
