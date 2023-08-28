import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import connector from "#models/databaseUtil";

jest.mock("#util");

let server;
let agent;
beforeAll((done) => {
  server = app.listen(3000, () => {
    agent = request.agent(server);
    connector.set("debug", false);
    done();
  });
});

function cleanUp(callback) {
  connector.disconnect((DBerr) => {
    if (DBerr) console.log("Database dissconnnect error: ", DBerr);
    server.close((serverErr) => {
      if (serverErr) console.log(serverErr);
      callback();
    });
  });
}

afterAll((done) => {
  cleanUp(done);
});

describe("checking module functions", () => {
  it("read module", async () => {
    const response = await agent
      .post("/module/list")
      .send({ name: "Module123" });
    expect(response.body.res).not.toBeNull();
  });
});
