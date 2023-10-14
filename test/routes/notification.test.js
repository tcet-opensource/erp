import { jest } from "@jest/globals";
import notificationModel from "#models/notification";
import connector from "#models/databaseUtil"; // Import your Express app instance

jest.mock("#util");
const {agent}= global;


function cleanUp(callback) {
    notificationModel.remove({
        data: "Sample Notification",
        title: "Test Title",
        from: "YOUR_FACULTY_ID", 
        type: "Student",
        filter: ["TARGETED_USER_ID"], 
    })
    .then(() => {
        connector.disconnect((DBerr) => {
            if (DBerr) console.log("database disconnect error: ", DBerr);
            callback();
        });
    })
    
}

afterAll((done) => {
  cleanUp(done);
});

describe("Notification API", () => {
  let notificationId;

  it("should create a new notification", async () => {
    const response = await agent.post("/notification/add").send({
      data: "Sample Notification",
      title: "Test Title",
      from: "YOUR_FACULTY_ID", // Use a valid Faculty ID
      type: "Student",
      filter: ["TARGETED_USER_ID"], // Use a valid User ID
    });

    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added notification/);

    
  });

  describe("after adding notification", () => {
    let notificationId;
    beforeEach(async () => {
        notificationId=await agent.post("notification/add").send({
            data: "Sample Notification",
            title: "Test Title",
            from: "YOUR_FACULTY_ID", 
            type: "Student",
            filter: ["TARGETED_USER_ID"], 
        });
        notificationId=JSON.parse(id.res.text).id;
    });
    afterEach(async () => {
        await notificationModel.remove({
            data: "Sample Notification",
            title: "Test Title",
            from: "YOUR_FACULTY_ID", 
            type: "Student",
            filter: ["TARGETED_USER_ID"], 
            
        });
    });

    it("should update a notification entity", async () => {
        const response = await agent.post(`/notification/update/${notificationId}`).send({
          data: "Updated Notification Data",
          title: "Updated Title",
          from: "YOUR_FACULTY_ID", 
          type: "Faculty",
          filter: ["TARGETED_USER_ID"], 
        });
    
        expect(response.status).toBe(200);
        expect(response.body.res).toMatch(/updated notification/);
      });
    
      it("should list notification entities", async () => {
        const response = await agent.get("/notification/list").send({
            data: "Sample Notification",
            title: "Test Title",
            from: "YOUR_FACULTY_ID", 
            type: "Student",
            filter: ["TARGETED_USER_ID"], 

        });
        expect(response.status).toBe(200);
        expect(response.body.res).toBeDefined();
      });
    
     
  })

  
});
