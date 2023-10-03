import { jest } from "@jest/globals";  
import connector from "#models/databaseUtil"; 
import studentModel from "#models/student"; 

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  studentModel
    .remove({
      ERPID: "S1032220999",
      name: "Arya",
      joiningYear: 2020,
      branch: "64fc3c8bde9fa947ea1f412f",
      division: "A",
      rollNo: 12,
      coursesOpted: "64fc3c8bde9fa947ea1f412f",
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error : ", DBerr);
        callback();
      });
    });
}


afterAll((done) => {
  cleanUp(done);
});

describe("Student API", () => {
  it("should create student", async () => {
    const response = await agent.post("/student/add").send({
      ERPID: "S1032220999",
      name: "Arya",
      joiningYear: 2020,
      branch: "64fc3c8bde9fa947ea1f412f",
      division: "A",
      rollNo: 12,
      coursesOpted: "64fc3c8bde9fa947ea1f412f",
    });
    
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added student/);
  });

  describe("after adding student", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/student/add").send({
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: "64fc3c8bde9fa947ea1f412f",
        division: "A",
        rollNo: 12,
        coursesOpted: "64fc3c8bde9fa947ea1f412f",
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await studentModel.remove({
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: "64fc3c8bde9fa947ea1f412f",
        division: "A",
        rollNo: 12,
        coursesOpted: "64fc3c8bde9fa947ea1f412f",
      });
    });

    it("should read student", async () => {
      const response = await agent
        .get("/student/list")
        .send({ name: "Arya" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update student", async () => {
      const response = await agent
        .post(`/student/update/${id}`)
        .send({ joiningYear: 2020 });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated student/);
    });
  });
});
