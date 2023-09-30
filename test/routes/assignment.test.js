import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import assignmentModel from "#models/assignment";
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
    assignmentModel.remove({ no: "123" }).then(() => {
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

describe("checking assignment functions", () => {
  it("create assignment", async () => {
    const response = await agent.post("/assignment/add").send({
        no: 123,
        title: "xyz",
        type: "FA",
        marks: 100,
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added assignment/);
  });
  let id;
  beforeEach(async () => {
    id = await agent.post("/assignment/add").send({
        no: "123",
        title: "xyz",
        type: "FA",
        marks: 100,
    });
    id = JSON.parse(id.res.text).id;
  });

  afterEach(async () => {
    await assignmentModel.remove({ no: "123" });
  });

  it("read assignment", async () => {
    const response = await agent
      .get("/assignment/list")
      .send({ no: "123" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update assignment", async () => {
    const response = await agent
      .post(`/assignment/update/${id}`)
      .send({ no: "123" }, { no: "345" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/updated assignment/);
  });
});
