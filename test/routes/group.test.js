import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import connector from "#models/databaseUtil";
import groupModel from "#models/group";
import studentModel from "#models/student";

jest.mock("#util");
const { agent } = global;

let studentIds;

function cleanUp(callback) {
  groupModel
    .remove({
      student: "Group 1",
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
  studentIds = await studentModel.read({}, 3);
  studentIds = studentIds.data.flatMap((obj) => obj._id);
  callback();
}

beforeAll((done) => {
  getIds(done);
});

afterAll((done) => {
  cleanUp(done);
});

describe("group API", () => {
  it("should create group", async () => {
    const response = await agent.post("/group/add").send({
      title: "Group 1",
      students: studentIds,
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added group/);
  });

  describe("after adding group", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/group/add").send({
        title: "Group 1",
        students: studentIds,
      });
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await groupModel.remove({
        title: "Group 1",
      });
    });

    it("should read group", async () => {
      const response = await agent.get("/group/list");
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update group", async () => {
      const response = await agent
        .post(`/group/update/${id}`)
        .send({ title: "Group 2" });
      expect(response.headers["content-type"]).toMatch(/json/);
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated group/);
    });
  });
});
