import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import departmentmodel from "#models/department";
import connector from "#models/databaseUtil";
import accreditationModel from "#models/accreditation";
import infrastructureModel from "#models/infrastructure";
import organizationModel from "#models/organization";

jest.mock("#util");
const { agent } = global;

let accreditationIds;
let infrastructureIds;
let organizationIds;

// test case for deletion

function cleanUp(callback) {
  departmentmodel
    .remove({
      name: "Electronics",
      acronym: "COMPS",
      yearOfStarting: "2020-09-01T00:00:00.000Z",
      accreditations: [accreditationIds],
      infrastructures: [infrastructureIds],
      organization: [organizationIds],
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error: ", DBerr);
        callback();
      });
    });
}

/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  accreditationIds = await accreditationModel.read({}, 1);
  accreditationIds = accreditationIds.data[0]._id;
  infrastructureIds = await infrastructureModel.read({}, 1);
  infrastructureIds = infrastructureIds.data[0]._id;
  organizationIds = await organizationModel.read({}, 1);
  organizationIds = organizationIds.data[0]._id;
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("Department CRUD", () => {
  it("should create a department with associated accreditations and infrastructure", async () => {
    const response = await agent.post("/department/create").send({
      name: "Computer",
      acronym: "COMPS",
      yearOfStarting: "2020-09-01T00:00:00.000Z",
      accreditations: [accreditationIds],
      infrastructures: [infrastructureIds],
      organization: [organizationIds],
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added Department/);
  });

  describe("after adding department", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/department/create").send({
        name: "Computer",
        acronym: "COMPS",
        yearOfStarting: "2020-09-01T00:00:00.000Z",
        accreditations: [accreditationIds],
        infrastructures: [infrastructureIds],
        organization: [organizationIds],
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await departmentmodel.remove({
        name: "Computer",
        acronym: "COMPS",
        yearOfStarting: "2020-09-01T00:00:00.000Z",
        accreditations: [accreditationIds],
        infrastructures: [infrastructureIds],
        organization: [organizationIds],
      });
    });

    it("should read a department", async () => {
      const response = await agent.get("/department/list").send({
        name: "Computer",
        acronym: "COMPS",
        yearOfStarting: "2020-09-01T00:00:00.000Z",
        accreditations: [accreditationIds],
        infrastructures: [infrastructureIds],
        organization: [organizationIds],
      });
      expect(response.body.res).not.toBeNull();
    });

    it("should update department", async () => {
      const response = await agent.post(`/department/update/${id}`).send({
        name: "Electronics",
        acronym: "COMPS",
        yearOfStarting: "2020-09-01T00:00:00.000Z",
        accreditations: [accreditationIds],
        infrastructures: [infrastructureIds],
        organization: [organizationIds],
      });
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/department updated/);
    });
  });
});
