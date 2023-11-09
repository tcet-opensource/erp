import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import timetableModel from "#models/timetable";
import connector from "#models/databaseUtil";
import facultyModel from "#models/faculty";
import groupModel from "#models/group";
import activityBPMode from "#models/activityBlueprint";

jest.mock("#util");
const { agent } = global;

let facultyId;
let groupId;
let activityBPId;

function cleanUp(callback) {
  timetableModel.remove({ lunchbreakStartTime: "test:45 PM" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database disconnect error: ", DBerr);
      callback();
    });
  });
}
/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  facultyId = await facultyModel.read({}, 1);
  facultyId = facultyId.data[0]._id;
  groupId = await groupModel.read({}, 1);
  groupId = groupId.data[0]._id;
  activityBPId = await activityBPMode.read({}, 1);
  activityBPId = activityBPId.data[0]._id;
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("checking timetable functions", () => {
  it("create timetable", async () => {
    const response = await agent.post("/timetable/add").send({
      startDate: "2023-06-18T14:11:30Z",
      endDate: "2023-05-28T14:10:30Z",
      classIncharge: facultyId,
      group: groupId,
      activityBlueprints: activityBPId,
      lunchbreakStartTime: "test:45 PM",
      lunchbreakDuration: 45, // minutes
      teabreakStartTime: "11:30 AM",
      teabreakDuration: 15, // minutes
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added timetable/);
  });
  let id;
  beforeEach(async () => {
    id = await agent.post("/timetable/add").send({
      startDate: "2023-06-18T14:11:30Z",
      endDate: "2023-05-28T14:10:30Z",
      classIncharge: facultyId,
      group: groupId,
      activityBlueprints: activityBPId,
      lunchbreakStartTime: "test:45 PM",
      lunchbreakDuration: 45, // minutes
      teabreakStartTime: "11:30 AM",
      teabreakDuration: 15, // minutes
    });
    id = JSON.parse(id.res.text).id;
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
      .post(`/timetable/update/${id}`)
      .send({ startDate: "2023-07-18T14:11:30Z" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/timetable updated/);
  });
});
