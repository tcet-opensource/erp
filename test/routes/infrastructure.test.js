import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import request from "supertest";
import app from "#app"; // Update this import based on your app"s structure
import connector from "#models/databaseUtil"; // Update this import
import infrastructureModel from "#models/infrastructure"; // Update this import

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
  infrastructureModel
    .remove({
      name: "Building A",
      type: "Office",
      wing: "East",
      floor: 3,
      capacity: 100,
    })
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

describe("Infrastructure API", () => {
  it("should create infrastructure", async () => {
    const response = await agent.post("/infrastructure/add").send({
      name: "Building A",
      type: "Office",
      wing: "East",
      floor: 3,
      capacity: 100,
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added user/);
  });

  describe("after adding infrastructure", () => {
    beforeEach(async () => {
      await agent.post("/infrastructure/add").send({
        name: "Building A",
        type: "Office",
        wing: "East",
        floor: 3,
        capacity: 100,
      });
    });

    afterEach(async () => {
      await infrastructureModel.remove({
        name: "Building A",
        type: "Office",
        wing: "East",
        floor: 3,
        capacity: 100,
      });
    });

    it("should read infrastructure", async () => {
      const response = await agent
        .post("/infrastructure/list")
        .send({ name: "Building A" });
      expect(response.body.res).not.toBeNull();
    });

    it("should update infrastructure", async () => {
      const response = await agent
        .post("/infrastructure/update")
        .send({ name: "Building A" }, { capacity: 150 });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated infrastructure/);
    });
  });
});
