import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import moduleModel from "#models/module";
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
  moduleModel.remove({ startDate: "2023-06-18T14:11:30Z" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) {
        console.log("Database disconnnect error: ", DBerr);
      }
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

describe("checking module functions", () => {
  it("create module", async () => {
    const response = await agent
      .get("/module/add")
      .send({
        no: 1,
        name: "Module 1",
        outcome: "I am good at debugging",
        contents: ["i", "ii", "iii", "iv", "v", "vi",],
        hrsPerModule: 3,
        cognitiveLevels: "L1",
      });
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added module/);
  });

  beforeEach(async () => {
    agent.post("/module/add").send({
      no: 1,
      name: "Module 1",
      outcome: "I am good at debugging",
      contents: ["i", "ii", "iii", "iv", "v", "vi",],
      hrsPerModule: 3,
      cognitiveLevels: "L1",
    });
  });

  afterEach(async () => {
    await moduleModel.remove({ no: 1 });
  });

  it("read module", async () => {
    const response = await agent
      .get("/module/list")
      .send({ name: "xyz" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });
});
