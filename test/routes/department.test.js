import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import mongoose from "mongoose";
import departmentmodel from "#models/department";
import connector from "#models/databaseUtil";

jest.mock("#util");
const { agent } = global;

// test case for deletion

function cleanUp(callback) {
  departmentmodel.remove(
    {
      name: "Computer",
      acronym: "COMPS",
      yearOfStarting: "2020-09-01T00:00:00.000Z",
      accreditations: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03a")],
      infrastructures: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03b")],
    },
  )
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error: ", DBerr);
        callback();
      });
    });
}

afterAll((done) => {
  cleanUp(done);
});

describe("Department CRUD", () => {
  it("should create a department with associated accreditations and infrastructure", async () => {
    const response = await agent.post("/department/create").send(
      {
        name: "Computer",
        acronym: "COMPS",
        yearOfStarting: "2020-09-01T00:00:00.000Z",
        accreditations: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03a")],
        infrastructures: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03b")],
      },
    );

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added Department/);
  });

  describe("after adding department", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/department/create").send(
        {
          name: "Computer",
          acronym: "COMPS",
          yearOfStarting: "2020-09-01T00:00:00.000Z",
          accreditations: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03a")],
          infrastructures: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03b")],
        },
      );
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await departmentmodel.remove(
        {
          name: "Computer",
          acronym: "COMPS",
          yearOfStarting: "2020-09-01T00:00:00.000Z",
          accreditations: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03a")],
          infrastructures: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03b")],
        },
      );
    });

    it("should read a department", async () => {
      const response = await agent
        .get("/department/list")
        .send(
          {
            name: "Computer",
            acronym: "COMPS",
            yearOfStarting: "2020-09-01T00:00:00.000Z",
            accreditations: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03a")],
            infrastructures: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03b")],
          },
        );
      expect(response.body.res).not.toBeNull();
    });

    it("should update department", async () => {
      const response = await agent
        .post(`/department/update/${id}`)
        .send(
          {
            name: "Electronics",
            acronym: "COMPS",
            yearOfStarting: "2020-09-01T00:00:00.000Z",
            accreditations: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03a")],
            infrastructures: [mongoose.Types.ObjectId("5f8778b54b553439ac49a03b")],
          },
        );
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/department updated/);
    });
  });
});
