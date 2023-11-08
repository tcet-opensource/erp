import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import moduleModel from "#models/module";
import connector from "#models/databaseUtil";
import topicModel from "#models/topic";

jest.mock("#util");
const { agent } = global;

let topicIds;

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

/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  topicIds = await topicModel.read({}, 3);
  topicIds = topicIds.data.flatMap((obj) => obj._id);
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("checking module functions", () => {
  it("create module", async () => {
    const response = await agent.post("/module/add").send({
      no: 1,
      name: "Module 1",
      contents: topicIds,
      hrsPerModule: 3,
      cognitiveLevels: ["L1", "L2"],
    });
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added module/);
  });

  beforeEach(async () => {
    await agent.post("/module/add").send({
      no: 1,
      name: "Module 2",
      contents: topicIds,
      hrsPerModule: 3,
      cognitiveLevels: ["L1", "L2"],
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
