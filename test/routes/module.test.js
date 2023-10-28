import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import moduleModel from "#models/module";
import connector from "#models/databaseUtil";

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  moduleModel.remove({ startDate: "2023-06-18T14:11:30Z" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) {
        console.log("Database disconnnect error: ", DBerr);
      }
      callback();
    });
  });
}

afterAll((done) => {
  cleanUp(done);
});

describe("checking module functions", () => {
  it("create module", async () => {
    const response = await agent.post("/module/add").send({
      no: 1,
      name: "Module 1",
      contents: [
        "64fc3c8bde9fa947ea1f412f",
        "64fc3c8bde9fa947ea1f412f",
        "64fc3c8bde9fa947ea1f412f",
      ],
      hrsPerModule: 3,
      cognitiveLevels: "L1",
    });
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added module/);
  });

  beforeEach(async () => {
    await agent.post("/module/add").send({
      no: 1,
      name: "Module 1",
      contents: [
        "64fc3c8bde9fa947ea1f412f",
        "64fc3c8bde9fa947ea1f412f",
        "64fc3c8bde9fa947ea1f412f",
      ],
      hrsPerModule: 3,
      cognitiveLevels: "L1",
    });
  });

  afterEach(async () => {
    await moduleModel.remove({ no: 1 });
  });

  it("read module", async () => {
    const response = await agent.get("/module/list").send({ name: "xyz" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });
});
