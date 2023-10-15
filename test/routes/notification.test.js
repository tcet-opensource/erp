import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import notificationModel from "#models/notification";
import connector from "#models/databaseUtil"; // Import your Express app instance

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  notificationModel
    .remove({
      data: "Sample Notification",
      title: "Test Title",
      from: "64fc3c8bde9fa947ea1f412f",
      type: "Student",
      filter: ["64fc3c8bde9fa947ea1f412f"],
    })
    .then(() => {
      connector.disconnect((DBerr) => {
        if (DBerr) console.log("database disconnect error: ", DBerr);
        callback();
      });
    });
}

afterAll((done) => {
  cleanUp(done);
});

describe("Notification API", () => {
  it("should create a new notification", async () => {
    const response = await agent.post("/notification/add").send({
      data: "Sample Notification",
      title: "Test Title",
      from: "64fc3c8bde9fa947ea1f412f", // Use a valid Faculty ID
      type: "Student",
      filter: ["64fc3c8bde9fa947ea1f412f"], // Use a valid User ID
    });
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/Added notification/);
    const notificationId = JSON.parse(response.res.text).id;
    await notificationModel.remove({ _id: notificationId });
  });

  describe("after adding notification", () => {
    let notificationId;
    beforeEach(async () => {
      const id = await agent.post("/notification/add").send({
        data: "Sample Notification",
        title: "Test Title",
        from: "64fc3c8bde9fa947ea1f412f",
        type: "Student",
        filter: ["64fc3c8bde9fa947ea1f412f"],
      });
      notificationId = JSON.parse(id.res.text).id;
    });
    afterEach(async () => {
      await notificationModel.remove({
        data: "Sample Notification",
        title: "Test Title",
        from: "64fc3c8bde9fa947ea1f412f",
        type: "Student",
        filter: ["64fc3c8bde9fa947ea1f412f"],
      });
    });

    it("should update a notification entity", async () => {
      const response = await agent
        .post(`/notification/update/${notificationId}`)
        .send({
          data: "Updated Notification Data",
          title: "Updated Title",
          from: "64fc3c8bde9fa947ea1f412f",
          type: "Faculty",
          filter: ["64fc3c8bde9fa947ea1f412f"],
        });

      expect(response.status).toBe(200);
      expect(response.body.res).toMatch(/Updated notification/);
    });

    it("should list notification entities", async () => {
      const response = await agent.get("/notification/list").send({
        data: "Sample Notification",
        title: "Test Title",
        from: "64fc3c8bde9fa947ea1f412f",
        type: "Student",
        filter: ["64fc3c8bde9fa947ea1f412f"],
      });
      expect(response.status).toBe(200);
      expect(response.body.res).toBeDefined();
    });
  });
});
