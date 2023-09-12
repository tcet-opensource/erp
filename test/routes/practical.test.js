import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import request from "supertest";
import app from "#app"; // Update this import based on your app's structure
import connector from "#models/databaseUtil"; // Update this import
import PracticalModel from "#models/practical"; // Update this import

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
  PracticalModel
    .remove({})
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

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/Added Practical/);
  });

  describe("after creating a practical", () => {
    let practicalId;

    beforeEach(async () => {
      const id = await agent.post("/practical/create").send({
        no: 2,
        title: "new practical",
        type: "fun experiment",
        hours: 5,
        cognitiveLevels: ["L1", "L4"],
      });
      practicalId = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await PracticalModel.remove();
    });

    it("should list practical entities", async () => {
      const response = await agent.get("/practical/list")
        .send({ title: "new practical" });
      expect(response.status).toBe(200);
      expect(response.body.res).toHaveLength(1);
    });

    it("should update a practical entity", async () => {
      const response = await agent.post(`/practical/update/${practicalId}`).send({
        hours: 3,
      });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/Updated Practical/);
    });
  });
});
