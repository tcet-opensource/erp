import { jest } from "@jest/globals"; 
import request from "supertest";
import app from "#app"; // Update this import based on your app's structure
import connector from "#models/databaseUtil"; // Update this import
import PracticalModel from "#models/practical"; // Update this import

jest.mock("#util");

let server;
let agent;

beforeAll((done) => {
  server = app.listen(5000, () => {
    agent = request.agent(server);
    connector.set("debug", false);
    done();
  });
});

function cleanUp(callback) {
  PracticalModel
    .deleteMany({})
    .then(() => {
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

describe("Practical API", () => {
  it("should create a new practical", async () => {
    const response = await agent.post("/practical/create").send({
      no: 1,
      title: "Sample Practical",
      type: "Experiment",
      hours: 2,
      cognitiveLevels: ["L2", "L3"],
    });

    expect(response.status).toBe(201);
    expect(response.body.res).toMatch(/added user/);
  });

  describe("after creating a practical", () => {
    let practicalId;

    beforeEach(async () => {
      const response = await agent.post("/practical/create").send({
        no: 1,
        title: "Sample Practical",
        type: "Experiment",
        hours: 2,
        cognitiveLevels: ["L2", "L3"],
      });
      practicalId = response.body.res.match(/(\d+)/)[0];
    });

    afterEach(async () => {
      await PracticalModel.deleteOne({ _id: practicalId });
    });

    it("should list practical entities", async () => {
      const response = await agent.get("/practical/list");
      expect(response.status).toBe(200);
      expect(response.body.res).toHaveLength(1);
    });

    it("should update a practical entity", async () => {
      const response = await agent.post("/practical/update").send({
        id: practicalId,
        hours: 3,
      });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated practical/);
    });

    it("should delete a practical entity", async () => {
      const response = await agent.post(`/practical/delete/${practicalId}`);
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/Deleted practical/);
    });
  });
});
