import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import studentModel from "#models/student";
import connector from "#models/databaseUtil";

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  studentModel
    .remove({ 
    ERPID: "S1032220999",
    name: "Arya",
    joiningYear: 2020,
    branch: "Computer Science",
    division: "A",
    rollNo: 12,
    coursesOpted: "XYZ",

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

describe("checking student functions", () => {
  it("create student", async () => {
    const response = await agent.post("/student/add").send({
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: "Computer Science",
        division: "A",
        rollNo: 12,
        coursesOpted: "XYZ",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added student/);
  });
  let id;
  beforeEach(async () => {
    id = await agent.post("/student/add").send({
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: "Computer Science",
        division: "A",
        rollNo: 12,
        coursesOpted: "XYZ",
    });
    id = JSON.parse(id.res.text).id;
  });

  afterEach(async () => {
    await studentModel.remove({ 
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: "Computer Science",
        division: "A",
        rollNo: 12,
        coursesOpted: "XYZ",
     });
  });

  it("read student", async () => {
    const response = await agent
      .get("/student/list")
      .send({ 
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: "Computer Science",
        division: "A",
        rollNo: 12,
        coursesOpted: "XYZ",
    });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update student", async () => {
    const response = await agent
      .post(`/student/update/${id}`)
      .send({ 
        ERPID: "S1032220999",
        name: "Arya",
        joiningYear: 2020,
        branch: "Computer Science",
        division: "A",
        rollNo: 12,
        coursesOpted: "XYZ",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/student updated/);
  });
});
