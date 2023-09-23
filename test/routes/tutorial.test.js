import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import tutorialModel from "#models/tutorial";
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
  tutorialModel.remove({ no: "123git" }).then(() => {
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

describe("checking tutorial functions", () => {
  it("create tutorial", async () => {
    const response = await agent.post("/tutorial/add").send({
      no: "123",
      title: "abc",
      hours: "3",
      cognitiveLevel: "abc",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added tutorial/);
  });

  beforeEach(async () => {
    agent.post("/tutorial/add").send({
      no: "123",
      title: "abc",
      hours: "3",
      cognitiveLevel: "abc",
    });
  });

  afterEach(async () => {
    await tutorialModel.remove({ no: "123" });
  });

  it("read tutorial", async () => {
    const response = await agent
      .get("/tutorial/list")
      .send({ name: "xyz" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update tutorial", async () => {
    const response = await agent
      .post("/tutorial/update")
      .send({ no: "123" }, { no: "123" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/tutorial updated/);
  });
});
