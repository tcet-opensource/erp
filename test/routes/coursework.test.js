import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import request from "supertest";
import app from "#app"; // Update this import based on your app"s structure
import connector from "#models/databaseUtil"; // Update this import
import courseworkModel from "#models/coursework"; // Update this import

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
  courseworkModel
    .remove({
      student: "64fc3c8bde9fa947ea1f412f",
      type: "onCampus",
      course: "64fc3c8bde9fa947ea1f412f",
      task: "64fc3c8bde9fa947ea1f412f",
      objectID: "Practical",
      activity: "64fc3c8bde9fa947ea1f412f",
      marks: 97,
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

describe("Coursework API", () => {
  it("should create coursework", async () => {
    const response = await agent.post("/coursework/add").send({
      student: "64fc3c8bde9fa947ea1f412f",
      type: "onCampus",
      course: "64fc3c8bde9fa947ea1f412f",
      task: "64fc3c8bde9fa947ea1f412f",
      objectID: "Practical",
      activity: "64fc3c8bde9fa947ea1f412f",
      marks: 97,
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/Added Coursework with ID \w+/);
  });

  describe("after adding coursework", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/coursework/add").send({
        student: "64fc3c8bde9fa947ea1f412f",
        type: "onCampus",
        course: "64fc3c8bde9fa947ea1f412f",
        task: "64fc3c8bde9fa947ea1f412f",
        objectID: "Practical",
        activity: "64fc3c8bde9fa947ea1f412f",
        marks: 97,
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await courseworkModel.remove({
        student: "64fc3c8bde9fa947ea1f412f",
      });
    });

    it("should read coursework", async () => {
      const response = await agent
        .get("/coursework/list")
        .send({ student: "64fc3c8bde9fa947ea1f412f" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update coursework", async () => {
      const response = await agent
        .post(`/coursework/update/${id}`)
        .send({ student: "64fc3c8bde9fa947ea1f412f" });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/Updated Coursework/);
    });
  });
});
