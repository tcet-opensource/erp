import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import topicModel from "#models/topic";
import connector from "#models/databaseUtil";

jest.mock("#util");

const { agent } = global;

function cleanUp(callback) {
  topicModel.remove({ title: "xyz" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database dissconnnect error: ", DBerr);
    });
    callback();
  });
}

afterAll((done) => {
  cleanUp(done);
});

describe("checking topic functions", () => {
  it("create topic", async () => {
    const response = await agent.post("/topic/add").send({
      title: "xyz",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added topic/);
  });
  let id;
  beforeEach(async () => {
    id = await agent.post("/topic/add").send({
      title: "xyz",
    });
    id = JSON.parse(id.res.text).id;
  });

  afterEach(async () => {
    await topicModel.remove({ title: "xyz" });
  });

  it("read topic", async () => {
    const response = await agent
      .get("/topic/list")
      .send({ title: "xyz" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update topic", async () => {
    const response = await agent
      .post(`/topic/update/${id}`)
      .send({ title: "xyz" }, { title: "123" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/topic updated/);
  });
});
