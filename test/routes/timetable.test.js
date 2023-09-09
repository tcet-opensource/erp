import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import timetableModel from "#models/timetable";
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
  timetableModel.remove({ startDate: "2023-06-18T14:11:30Z" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database disconnect error: ", DBerr);
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

describe("checking timetable functions", () => {
  it("create timetable", async () => {
    const response = await agent.post("/timetable/add").send({
      startDate: "2023-06-18T14:11:30Z",
      endDate: "2023-05-28T14:10:30Z",
      classIncharge: "60a0e7e9a09c3f001c834e06",
      group: "60a0e7e9a09c3f001c834e07",
      activityBlueprints: "60a0e7e9a09c3f001c834e08",
      lunchbreakStartTime: "01:45 PM",
      lunchbreakDuration: 45, // minutes
      teabreakStartTime: "11:30 AM",
      teabreakDuration: 15, // minutes
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added timetable/);
  });

  beforeEach(async () => {
    agent.post("/timetable/add").send({
      startDate: "2023-06-18T14:11:30Z",
      endDate: "2023-05-28T14:10:30Z",
      classIncharge: "60a0e7e9a09c3f001c834e06",
      group: "60a0e7e9a09c3f001c834e07",
      activityBlueprints: "60a0e7e9a09c3f001c834e08",
      lunchBreakStartTime: "01:45 PM",
      lunchBreakDuration: 45, // minutes
      teaBreakStartTime: "11:30 AM",
      teaBreakDuration: 15, // minutes
    });
  });

  afterEach(async () => {
    await timetableModel.remove({ startDate: "2023-06-18T14:11:30Z" });
  });

  it("read timetable", async () => {
    const response = await agent
      .get("/timetable/list")
      .send({ startDate: "2023-06-18T14:11:30Z" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update timetable", async () => {
    const response = await agent
      .post("/timetable/update")
      .send({ startDate: "2023-07-18T14:11:30Z" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/timetable updated/);
  });
});
