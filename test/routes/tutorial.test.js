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
  tutorialModel.remove({ no: "123" }).then(() => {
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
      cognitiveLevel: ["L1"],
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added tutorial/);
  });
  
  describe("after creating a practical", () => {
    let tutorialId;
    beforeEach(async () => {
      const id = await agent.post("/tutorial/add").send({
        no: "456",
        title: "dfg",
        hours: "3",
        cognitiveLevel: ["L1", "L2"],
      });
      tutorialId = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await tutorialModel.remove();
    });

    it("read tutorial", async () => {
      const response = await agent
        .get("/tutorial/list")
        .send({ name: "dfg" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("update tutorial", async () => {
      const response = await agent
        .post(`/tutorial/update/${tutorialId}`)
        .send({ no: "456" });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/tutorial updated/);
    });
  });
});
