import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import semesterModel from "#models/semester";

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  semesterModel
    .remove({
      number: 3,
      academicYear: "2023",
      type: "ODD",
      startDate: "2023-06-18T14:11:30Z",
      endDate: "2023-06-18T14:11:30Z",
    })
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

describe("Semester API", () => {
  it("Should create semester", async () => {
    const response = await agent.post("/semester/add").send({
      number: 3,
      academicYear: "2023",
      type: "ODD",
      startDate: "2023-06-18T14:11:30Z",
      endDate: "2023-06-18T14:11:30Z",
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added semester/);
  });

  describe("after adding semester", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/semester/add").send({
        number: 3,
        academicYear: "2023",
        type: "ODD",
        startDate: "2023-06-18T14:11:30Z",
        endDate: "2023-06-18T14:11:30Z",
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await semesterModel.remove({
        number: 3,
        academicYear: "2023",
        type: "ODD",
        startDate: "2023-06-18T14:11:30Z",
        endDate: "2023-06-18T14:11:30Z",
      });
    });

    it("should read semester", async () => {
      const response = await agent
        .get("/semester/list")
        .send({ number: 3 });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update semester", async () => {
      const response = await agent
        .post(`/semester/update/${id}`)
        .send({ number: 3 }, { academicYear: 2024 });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/Updated Semester/);
    });
  });
});
