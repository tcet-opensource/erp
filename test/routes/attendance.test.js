import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import attendanceModel from "#models/attendance";
import connector from "#models/databaseUtil";

jest.mock("#util");

let server;
let agent;
beforeAll((done) => {
  server = app.listen(null, () => {
    agent = request.agent(server);
    connector.set("debug", false);
    done();
  });
});

function cleanUp(callback) {
  attendanceModel.remove({ student: "xyz" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database dissconnnect error: ", DBerr);
      server.close((serverErr) => {
        if (serverErr) console.log(serverErr);
        callback();
      });
    });
  });
}

afterAll((done) => {
  cleanUp(done);
});

describe("checking attendance functions", () => {
  it("create attendance", async () => {
    const response = await agent.post("/attendance/add").send({  
      student: "xyz",
      course: "abc",
      monthlyAttended: "22",
      monthlyOccured: "42",
      cumulativeAttended: "32",
      cumulativeOccured:"41",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added attendance/);
  });

  beforeEach(async () => {
    agent.post("/attendance/add").send({
      student: "xyz",
      course: "abc",
      monthlyAttended: "22",
      monthlyOccured: "42",
      cumulativeAttended: "32",
      cumulativeOccured: "41",
    });
  });

  afterEach(async () => {
    await attendanceModel.remove({ student: "xyz" });
  });

  it("read attendance", async () => {
    const response = await agent
      .get("/attendance/list")
      .send({ student: "xyz" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update attendance", async () => {
    const response = await agent
      .post("/attendance/update")
      .send({ student: "xyz" }, { student: "123" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/attendance updated/);
  });
});
