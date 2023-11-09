import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil"; // Update this import
import PracticalModel from "#models/practical"; // Update this import

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  PracticalModel.remove({}).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database disconnect error: ", DBerr);
      callback();
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
      type: "BASIC",
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
        type: "BASIC",
        hours: 5,
        cognitiveLevels: ["L1", "L4"],
      });
      practicalId = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await PracticalModel.remove();
    });

    it("should list practical entities", async () => {
      const response = await agent.get("/practical/list");
      expect(response.status).toBe(200);
    });

    it("should update a practical entity", async () => {
      const response = await agent
        .post(`/practical/update/${practicalId}`)
        .send({
          hours: 3,
        });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/Updated Practical/);
    });
  });
});
