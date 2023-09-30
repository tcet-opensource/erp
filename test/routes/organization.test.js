import request from "supertest";
import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import app from "#app";
import organizationModel from "#models/organization";
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
  organizationModel.remove({ startDate: "2023-06-18T14:11:30Z" }).then(() => {
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

describe("Organization API", () => {
    it("should create organization", async () => {
      const response = await agent.post("/organization/add").send({
        parent: "60a0e7e9a09c3f001c834e06",
        startDate:"2023-06-18T14:11:30Z",
        name:"my org",
        accreditations: "60a0e7e9a09c3f001c834e06",
      });
  
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/added organization/);
    });
  
    describe("after adding organization", () => {
      let id;
      beforeEach(async () => {
        id = await agent.post("/organization/add").send({
        parent: "60a0e7e9a09c3f001c834e06",
        startDate:"2023-06-18T14:11:30Z",
        name:"my org",
        accreditations: "60a0e7e9a09c3f001c834e06",
        });
        id = JSON.parse(id.res.text).id;
      });
  
      afterEach(async () => {
        await organizationModel.remove({
        parent: "60a0e7e9a09c3f001c834e06",
        startDate:"2023-06-18T14:11:30Z",
        name:"my org",
        accreditations: "60a0e7e9a09c3f001c834e06",
        });
      });
  
      it("should read organization", async () => {
        const response = await agent
          .get("/organization/list")
          .send({ name:"my org" });
        expect(response.status).toBe(200);
        expect(response.body.res).toBeDefined();
      });
  
      it("should update organization", async () => {
        const response = await agent
          .post(`/organization/update/${id}`)
          .send({ name: "your org" });
  
        expect(response.status).toBe(200);
        expect(response.body.res).toMatch(/organization updated/);
      });
    });
  });