import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import organizationModel from "#models/organization";
import connector from "#models/databaseUtil";
import accreditationModel from "#models/accreditation";

jest.mock("#util");
const { agent } = global;
let accreditationIds;
let parentId;

function cleanUp(callback) {
  organizationModel.remove({ startDate: "2023-06-18T14:11:30Z" }).then(() => {
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
  accreditationIds = await accreditationModel.read({}, 1);
  accreditationIds = accreditationIds.data[0]._id;
  parentId = await organizationModel.read({}, 1);
  parentId = parentId.data[0]._id;
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("Organization API", () => {
  it("should create organization", async () => {
    const response = await agent.post("/organization/add").send({
      parent: parentId,
      startDate: "2023-06-18T14:11:30Z",
      name: "my org",
      accreditations: accreditationIds,
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added organization/);
  });

  describe("after adding organization", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/organization/add").send({
        parent: parentId,
        startDate: "2023-06-18T14:11:30Z",
        name: "my org",
        accreditations: accreditationIds,
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await organizationModel.remove({
        parent: parentId,
        startDate: "2023-06-18T14:11:30Z",
        name: "my org",
        accreditations: accreditationIds,
      });
    });

    it("should read organization", async () => {
      const response = await agent
        .get("/organization/list")
        .send({ name: "my org" });
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
