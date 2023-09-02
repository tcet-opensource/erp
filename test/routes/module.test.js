import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
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

describe("checking accreditation functions", () => {
  it("read module", async () => {
    const response = await agent
      .get("/module/list")
      .send({ name: "xyz" });
    expect(response.status).toBe(200);
  });
});
