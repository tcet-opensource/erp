import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import accreditationModel from "#models/accreditation";
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
  accreditationModel.remove({ name: "xyz" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database dissconnnect error: ", DBerr);
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

describe("checking accreditation functions", () => {
  it("create accreditation", async () => {
    const response = await agent.post("/accreditation/add").send({
      name: "xyz",
      agencyName: "abc",
      dateofAccreditation: "2023-06-18T14:11:30Z",
      dateofExpiry: "2023-05-28T14:10:30Z",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added accreditation/);
  });

  beforeEach(async () => {
    agent.post("/accreditation/add").send({
      name: "xyz",
      agencyName: "abc",
      dateofAccreditation: "2023-06-18T14:11:30Z",
      dateofExpiry: "2023-05-28T14:10:30Z",
    });
  });

  afterEach(async () => {
    await accreditationModel.remove({ name: "xyz" });
  });

  it("read accreditation", async () => {
    const response = await agent
      .get("/accreditation/list")
      .send({ name: "xyz" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update accreditation", async () => {
    const response = await agent
      .post("/accreditation/update")
      .send({ name: "xyz" }, { name: "123" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/accreditation updated/);
  });
});
