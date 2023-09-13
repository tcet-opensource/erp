import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import request from "supertest";
import app from "#app";
import connector from "#models/databaseUtil";
import groupModel from "#models/group";

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
  groupModel
    .remove({
      title: "Group 1",
      student: "64fdc67feca8a69f01b33614",
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

describe("group API", () => {
  it("should create group", async () => {
    const response = await agent.post("/group/add").send({
      title: "Group 1",
      student: "64fdc67feca8a69f01b33614",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added group/);
  });

  describe("after adding group", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/group/add").send({
        title: "Group 1",
        student: "64fdc67feca8a69f01b33614",
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await groupModel.remove({
        title: "Group 1",
        student: "64fdc67feca8a69f01b33614",
      });
    });

    it("should read group", async () => {
      const response = await agent
        .get("/group/list")
        .send({ name: "Building A" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update group", async () => {
      const response = await agent
        .post(`/group/update/${id}`)
        .send({ title: "Group 1" }, { title: "Group 2" });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated group/);
    });
  });
});
