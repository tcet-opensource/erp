import { jest } from "@jest/globals";
import request from "supertest";
import app from "#app"; 
import mongoose from "mongoose";
import connector from "#models/databaseUtil"; 
import facultyModel from "#models/faculty"; 

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
//test case for deletion
function cleanUp(callback) {
  facultyModel.remove(
    {
      ERPID: "test123",
      dateOfJoining: "2023-06-18T14:11:30Z",
      dateOfLeaving:"20-07-18T14:11:30Z" ,
      profileLink: "https://test123.com",
      qualifications: ["Ph.D.", "M.Sc."],
      totalExperience: 5,
      achievements: ["Award 1", "Award 2"],
      areaOfSpecialization: ["Specialization 1", "Specialization 2"],
      papersPublishedPG: 10,
      papersPublishedUG: 5,
      department: [mongoose.Types.ObjectId("5f8778b54b553439ac49a031")],
      preferredSubjects:[mongoose.Types.ObjectId("5f8778b54b553439ac49a03a2")],
      designation: "Assistant Professor",
      natureOfAssociation: "Regular",
      additionalResponsibilities: "Teaching and Research",
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

describe("Faculty API", () => {
  it("should create faculty", async () => {
    const response = await agent.post("/faculty/add").send({
      ERPID: "test123",
      dateOfJoining: "2023-06-18T14:11:30Z",
      dateOfLeaving:"20-07-18T14:11:30Z" ,
      profileLink: "https://test123.com",
      qualifications: ["Ph.D.", "M.Sc."],
      totalExperience: 5,
      achievements: ["Award 1", "Award 2"],
      areaOfSpecialization: ["Specialization 1", "Specialization 2"],
      papersPublishedPG: 10,
      papersPublishedUG: 5,
      department: [mongoose.Types.ObjectId("5f8778b54b553439ac49a031")],
      preferredSubjects:[mongoose.Types.ObjectId("5f8778b54b553439ac49a03a2")],
      designation: "Assistant Professor",
      natureOfAssociation: "Regular",
      additionalResponsibilities: "Teaching and Research",
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added faculty/);
  });

  describe("after adding faculty", () => {
    let id;
    beforeEach(async () => {
      id = await agent.post("/faculty/add").send(
        {
        ERPID: "test123",
        dateOfJoining: "2023-06-18T14:11:30Z",
        dateOfLeaving:"20-07-18T14:11:30Z" ,
        profileLink: "https://test123.com",
        qualifications: ["Ph.D.", "M.Sc."],
        totalExperience: 5,
        achievements: ["Award 1", "Award 2"],
        areaOfSpecialization: ["Specialization 1", "Specialization 2"],
        papersPublishedPG: 10,
        papersPublishedUG: 5,
        department: [mongoose.Types.ObjectId("5f8778b54b553439ac49a031")],
        preferredSubjects:[mongoose.Types.ObjectId("5f8778b54b553439ac49a03a2")],
        designation: "Assistant Professor",
        natureOfAssociation: "Regular",
        additionalResponsibilities: "Teaching and Research",
      });

      id = JSON.parse(id.res.text).id;
    });

    afterEach(async () => {
      await facultyModel.remove(
        {ERPID: "test123",
        dateOfJoining: "2023-06-18T14:11:30Z",
        dateOfLeaving:"20-07-18T14:11:30Z" ,
        profileLink: "https://test123.com",
        qualifications: ["Ph.D.", "M.Sc."],
        totalExperience: 5,
        achievements: ["Award 1", "Award 2"],
        areaOfSpecialization: ["Specialization 1", "Specialization 2"],
        papersPublishedPG: 10,
        papersPublishedUG: 5,
        department: [mongoose.Types.ObjectId("5f8778b54b553439ac49a031")],
        preferredSubjects:[mongoose.Types.ObjectId("5f8778b54b553439ac49a03a2")],
        designation: "Assistant Professor",
        natureOfAssociation: "Regular",
        additionalResponsibilities: "Teaching and Research",
       });
    });

    it("should read faculty", async () => {
      const response = await agent
        .get(`/faculty/${facultyId}`)
        .send();

      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });

    it("should update faculty", async () => {
      const response = await agent
        .post(`/faculty/update/${id}`)
        .send({ERPID: "test123" }, {totalExperience: 10});

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/updated faculty/);
    });
  });
});
