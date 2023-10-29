import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import examModel from "#models/exam";

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  examModel
    .remove({
      supervisor: "60a0e7e9a09c3f001c834e07",
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

describe("exam API", () => {
  it("should create exam", async () => {
    const response = await agent.post("/exam/add").send({
      date: "2023-06-18T14:11:30Z",
      startTime: "2023-06-18T14:11:30Z",
      duration: 5,
      supervisor: "5f8778b54b553439ac49a03a",
      infrastructure: "5f8778b54b553439ac49a03a",
      course: "5f8778b54b553439ac49a03a",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added exam/);
  });

  describe("after adding exam", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/exam/add").send({
        date: "2023-06-18T14:11:30Z",
        startTime: "2023-06-18T14:11:30Z",
        duration: 5,
        supervisor: "64453a62c8f2146f2f34c73a",
        infrastructure: "64453a62c8f2146f2f34c73a",
        course: "64453a62c8f2146f2f34c73a",
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await examModel.remove({ supervisor: "64453a62c8f2146f2f34c73a" });
    });

    it("should read exam", async () => {
      const response = await agent
        .get("/exam/list")
        .send({ supervisor: "64453a62c8f2146f2f34c73a" });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update exam", async () => {
      const response = await agent
        .post(`/exam/update/${id}`)
        .send({ duration: 10 });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated exam/);
    });
  });
});
