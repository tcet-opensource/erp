import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import accreditationModel from "#models/accreditation";
import connector from "#models/databaseUtil";

jest.mock("#util");

const { agent } = global;

function cleanUp(callback) {
  accreditationModel.remove({ name: "xyz" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database dissconnnect error: ", DBerr);
    });
    callback();
  });
}

afterAll((done) => {
  cleanUp(done);
});

describe("checking accreditation functions", () => {
  it("create accreditation", async () => {
    const response = await agent.post("/accreditation/add").send({
      name: "xyz",
      agencyName: "abc",
      dateofAccreditation: "2023-06-18T14:11:30Z",
      dateofExpiry: "2023-05-28T14:10:30Z",
    });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added accreditation/);
  });
  let id;
  beforeEach(async () => {
    id = await agent.post("/accreditation/add").send({
      name: "xyz",
      agencyName: "abc",
      dateofAccreditation: "2023-06-18T14:11:30Z",
      dateofExpiry: "2023-05-28T14:10:30Z",
    });
    id = JSON.parse(id.res.text).id;
  });

  afterEach(async () => {
    await accreditationModel.remove({ name: "xyz" });
  });

  it("read accreditation", async () => {
    const response = await agent
      .get("/accreditation/list")
      .send({ name: "xyz" });
    expect(response.status).toBe(200);
    expect(response.body.res).toBeDefined();
  });

  it("update accreditation", async () => {
    const response = await agent
      .post(`/accreditation/update/${id}`)
      .send({ name: "xyz" }, { name: "123" });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/accreditation updated/);
  });
});
