import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import studentModel from "#models/student";
import courseModel from "#models/course"; // Update this import
import departmentModel from "#models/department";

jest.mock("#util");
const { agent } = global;

let courseIds;
let branchId;
function cleanUp(callback) {
  studentModel
    .remove({
      branch: branchId,
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error : ", DBerr);
        callback();
      });
    });
}

/* eslint-disable no-underscore-dangle */
async function getIds(callback) {
  branchId = await departmentModel.read({});
  branchId = branchId.data[0]._id;
  courseIds = await courseModel.read({}, 3);
  courseIds = courseIds.data.flatMap((obj) => obj._id);
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("Student API", () => {
  it("should create student", async () => {
    const response = await agent.post("/student/create").send({
      ERPID: "S1032220999",
      name: "Arya",
      joiningYear: 2020,
      branch: branchId,
      division: "A",
      rollNo: 12,
      coursesOpted: courseIds,
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added user/);
  });

  describe("after adding student", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/student/create").send({
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: branchId,
        division: "A",
        rollNo: 12,
        coursesOpted: courseIds,
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await studentModel.remove({
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: branchId,
        division: "A",
        rollNo: 12,
        coursesOpted: courseIds,
      });
    });

    it("should read student", async () => {
      const response = await agent.get("/student/list").send({ name: "Arya" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update student", async () => {
      const response = await agent
        .post(`/student/update/${id}`)
        .send({ ERPID: "S1032220999" }, { joiningYear: 2021 });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(`updated Student with id ${id}`);
    });
  });
});
