import request from "supertest";
import { jest } from "@jest/globals";
import app from "#app";
import paperModel from "#models/paper";
import connector from "#models/databaseUtil";

jest.mock("#util");

let server;
let agent;

beforeAll((done) => {
  server = app.listen(null, () => {
    agent = request.agent(server);
    connector.set("debug", false);
    done();
  });
});

function cleanUp(callback) {
  paperModel.remove(
    {
      answerSheetID: "asd123",
      exam: "64fc3c8bde9fa947ea1f412f",
      student: "64fc3c8bde9fa947ea1f412f",
      checkedBy: "64fc3c8bde9fa947ea1f412f",
      mark: 100,
    },
  )
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("Database disconnect error: ", DBerr);
        server.close((serverErr) => {
          if (serverErr) console.log(serverErr);
          callback();
        });
      });
    });
}

afterAll((done) => {
  cleanUp(done);
});

describe("Paper CRUD", () => {
  it("should create paper with associated exam, student and faculty", async () => {
    const response = await agent.post("/paper/add").send(
      {
        answerSheetID: "asd123",
        exam: "64fc3c8bde9fa947ea1f412f",
        student: "64fc3c8bde9fa947ea1f412f",
        checkedBy: "64fc3c8bde9fa947ea1f412f",
        mark: 100,
      },
    );

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
  });

    let id;
    beforeEach(async () => {
      id = await agent.post("/paper/add").send(
        {
          answerSheetID: "asd123",
          exam: "64fc3c8bde9fa947ea1f412f",
          student: "64fc3c8bde9fa947ea1f412f",
          checkedBy: "64fc3c8bde9fa947ea1f412f",
          mark: 100,
        },
      );
      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await paperModel.remove(
        {
          answerSheetID: "asd123",
          exam: "64fc3c8bde9fa947ea1f412f",
          student: "64fc3c8bde9fa947ea1f412f",
          checkedBy: "64fc3c8bde9fa947ea1f412f",
          mark: 100,
        },
      );
    });

    it("should read paper", async () => {
      const response = await agent
        .get("/paper/list")
        .send(
          {
            answerSheetID: "asd123",
            exam: "64fc3c8bde9fa947ea1f412f",
            student: "64fc3c8bde9fa947ea1f412f",
            checkedBy: "64fc3c8bde9fa947ea1f412f",
            mark: 100,
          },
        );
      expect(response.body.res).not.toBeNull();
    });

    it("should update paper", async () => {
      const response = await agent
        .post(`/paper/update/${id}`)
        .send(
          {
            answerSheetID: "asd123",
            exam: "64fc3c8bde9fa947ea1f412f",
            student: "64fc3c8bde9fa947ea1f412f",
            checkedBy: "64fc3c8bde9fa947ea1f412f",
            mark: 100,
          },
        );
      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/Paper updated/);
    });
  });