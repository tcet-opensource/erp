import { jest } from "@jest/globals"; //eslint-disable-line-import/no-extraneous-dependencies
import request from "supertest";
import app from "#app";//Update this import based on your app's 
import connector from "#models/databaseUtil"; //Update this import
import activityModel from "#models/activity"; //Update this import

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
  activityModel
    .remove({
      startTime: "2023-06-18T14:11:30Z",
      duration: 2,
      course: "64fc3c8bde9fa947ea1f412f",
      faculty: "64fc3c8bde9fa947ea1f412f",
      type: "LECTURE",
      task: ["64fc3c8bde9fa947ea1f412f"],
      group: "64fc3c8bde9fa947ea1f412f",
      students: ["64fc3c8bde9fa947ea1f412f"]
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error : ", DBerr);
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

describe("Activity API", () => {
  it("should create activity", async () => {
    const response = await agent.post("/activity/add").send({
      activityBlueprint: "5f8778b54b553439ac49a03a",
      startTime: "2023-06-18T14:11:30Z",
      duration: 2,
      course: "5f8778b54b553439ac49a03a",
      faculty: "5f8778b54b553439ac49a03a",
      type: "LECTURE",
      task: ["5f8778b54b553439ac49a03a"],
      group: "5f8778b54b553439ac49a03a",
      students: ["5f8778b54b553439ac49a03a"]
    });
    
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added activity/);
  });

  describe("after adding activity", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/activity/add").send({
        activityBlueprint: "64fc3c8bde9fa947ea1f412f",
        startTime: "2023-06-18T14:11:30Z",
        duration: 2,
        course: "64fc3c8bde9fa947ea1f412f",
        faculty: "64fc3c8bde9fa947ea1f412f",
        type: "LECTURE",
        task: ["64fc3c8bde9fa947ea1f412f"],
        group: "64fc3c8bde9fa947ea1f412f",
        students: ["64fc3c8bde9fa947ea1f412f"]
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await activityModel.remove({
        activityBlueprint: "64fc3c8bde9fa947ea1f412f",
        startTime: "2023-06-18T14:11:30Z",
        duration: 2,
        course: "64fc3c8bde9fa947ea1f412f",
        faculty: "64fc3c8bde9fa947ea1f412f",
        type: "LECTURE",
        task: ["64fc3c8bde9fa947ea1f412f"],
        group: "64fc3c8bde9fa947ea1f412f",
        students: ["64fc3c8bde9fa947ea1f412f"]
      });
    });

    it("should read activity", async () => {
      const response = await agent
        .get("/activity/list")
        .send({ startTime: "2023-06-18T14:11:30Z" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update activity", async () => {
      const response = await agent
        .post(`/activity/update/${id}`)
        .send({
          duration: 5,
        });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated activity/);
    });
  });
});
