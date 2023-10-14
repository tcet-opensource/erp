import { jest } from "@jest/globals"; // eslint-disable-line import/no-extraneous-dependencies
import util from "#util";
import userModel from "#models/user";
import otpModel from "#models/otpStore";
import connector from "#models/databaseUtil";

jest.mock("#util");
const { agent } = global;

function cleanUp(callback) {
  otpModel.remove({ uid: "S1032190220" });
  userModel.remove({ uid: "S1032190220" }).then(() => {
    connector.disconnect((DBerr) => {
      if (DBerr) console.log("Database dissconnnect error: ", DBerr);
      callback();
    });
  });
}

afterAll((done) => {
  cleanUp(done);
});

describe("checking user functions", () => {
  it("create user", async () => {
    const response = await agent
      .post("/users/add")
      .send({
        name: "testuser",
        password: "123",
        emailId: "test@gmail.com",
        uid: "S1032190220",
        userType: "STUDENT",
      });
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.status).toBe(200);
    expect(response.body.res).toMatch(/added user/);
    await userModel.remove({ uid: "S1032190220" });
  });
});

describe("checking auth functions", () => {
  beforeEach(async () => {
    await agent.post("/users/add").send({
      name: "testuser",
      password: "123",
      emailId: "test@gmail.com",
      uid: "S1032190220",
      userType: "STUDENT",
    });
  });

  afterEach(async () => {
    await userModel.remove({ uid: "S1032190220" });
  });

  it("login", async () => {
    const response = await agent
      .post("/auth")
      .send({
        id: "S1032190220",
        password: "123",
      });
    expect(response.status).toBe(200);
    expect(response.body.res).toBe("welcome");
  });

  it("validate", async () => {
    const token = await agent
      .post("/auth")
      .send({
        id: "S1032190220",
        password: "123",
      })
      .then((response) => response.body.user.token);
    const response = await agent
      .post("/auth/validateUser")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it("test forget password", async () => {
    let genratedOtp;
    jest.spyOn(util, "sendOTP").mockImplementation((emailID, otp) => { genratedOtp = otp; });
    const response = await agent
      .post("/auth/sendOTP")
      .send({
        uid: "S1032190220",
        emailId: "test@gmail.com",
      });
    expect(response.status).toBe(200);
    expect(response.body.res).toBe("otp sent to emailID");
    const passwordUpdateResponse = await agent
      .post("/auth/resetPassword")
      .send({
        uid: "S1032190220",
        otp: genratedOtp,
        password: "pass",
      });
    expect(passwordUpdateResponse.status).toBe(200);
    const token = await agent
      .post("/auth")
      .send({
        id: "S1032190220",
        password: "pass",
      })
      .then((res) => res.body.user.token);
    const validateResponse = await agent
      .post("/auth/validateUser")
      .set("Authorization", `Bearer ${token}`);
    expect(validateResponse.status).toBe(200);
    jest.spyOn(util, "sendOTP").mockRestore();
  });
});
