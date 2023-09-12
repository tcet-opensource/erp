import {jest} from "@jest/globals" ; //eslint-disable-line-import/no-extraneous-dependencies
import request from "supertest";
import app from "#app";//Update this import based on your app's 
import connector from "#models/databaseUtil"; //Update this import
import activityModel from "#models/activity"; //Update this import

jest.mock("#util");

let server;
let agent;

beforeAll((done) => {
    server = app.listen(null,() => {
        agent = request.agent(server);
        connector.set("debug",false);
        done();
    });
});

function cleanUp(callback){
    activityModel
    .remove({
        startTime:"11:45 AM",
        duration:2,
        course:  "64fc3c8bde9fa947ea1f412f",
        faculty: "64fc3c8bde9fa947ea1f412f",
        type:"LECTURE",
        task:"Practical",
        group: "64fc3c8bde9fa947ea1f412f",
        students:"xyz",
    })
    .then(()=>{
        connector.disconnect ((DBerr)=>{
            if (DBerr) console.log("Database disconnect error : ",DBerr);
            server.close((serverErr)=> {
                if (serverErr) console.log(serverErr);
                callback();
            });
        });
    });
}


    afterAll((done) => {
        cleanUp(done);
    });

    describe("Activity API", () => {
        it("should create activity",async () => {
            const response = await agent.post ("/activity/add").send({
        startTime:"11:45 AM",
        duration:2,
        course:  "64fc3c8bde9fa947ea1f412f",
        faculty: "64fc3c8bde9fa947ea1f412f",
        type:"LECTURE",
        task:"Practical",
        group: "64fc3c8bde9fa947ea1f412f",
        students:"xyz",
            });

            expect(response.status).toBe(200);
            expect(response.body.res).toMatch(/added activity/);
        });

        describe("after adding activity",()=>{
            beforeEach(async () => {
                await agent.post("/activity/add").send({
        startTime:"11:45 AM",
        duration:2,
        course:  "64fc3c8bde9fa947ea1f412f",
        faculty: "64fc3c8bde9fa947ea1f412f",
        type:"LECTURE",
        task:"Practical",
        group: "64fc3c8bde9fa947ea1f412f",
        students:"xyz",
                });
            });

            afterEach(async () => {
                await activityModel.remove({
        startTime:"11:45 AM",
        duration:2,
        course:  "64fc3c8bde9fa947ea1f412f",
        faculty: "64fc3c8bde9fa947ea1f412f",
        type:"LECTURE",
        task:"Practical",
        group: "64fc3c8bde9fa947ea1f412f",
        students:"xyz",
                });
            });

            it("should read activity", async () => {
                const response = await agent 
                .post("/activity/list")
                .send({startTime:"11:45 AM"});
                expect(response.status).toBe(200);
                expect(response.body.res).toBeDefined();
            });

            it("should update activity",async () => {
                const response =await agent 
                .post("/activity/update")
                .send({
                startTime:"11:45 AM",
                duration:2,
                course:  "64fc3c8bde9fa947ea1f412f",
                faculty: "64fc3c8bde9fa947ea1f412f",
                type:"LECTURE",
                task:"Practical",
                group: "64fc3c8bde9fa947ea1f412f",
                students:"xyz",});

                expect (response.status).toBe(200);
                expect(response.body.res).toMatch(/updated activity/);
            });
        });
    });
