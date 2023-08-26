import OTPStore from "#models/otpStore";
import util, { logger } from "#util";
import { authenticateUser, userExists, updatePassword } from "#services/user";

async function login(req, res) {
  const { id, password } = req.body;
  try {
    const userValidated = await authenticateUser(id, password);
    const userDetails = {
      uid: userValidated.uid,
      name: userValidated.name,
      emailId: userValidated.emailId,
      type: userValidated.userType,
    };
    const token = util.generateToken(userDetails, req.ip);
    userDetails.token = token;
    res.json({ res: "welcome", user: userDetails });
  } catch (error) {
    logger.error("Error while login", error);
    if (error.name === "UserDoesNotExist") {
      res.status(403);
      res.json({ err: "Incorrect ID password" });
    } else {
      res.status(500);
      res.json({ err: "User doesn't exist" });
    }
  }
}

function validateUser(req, res) {
  res.json({ res: req.user, msg: "user validated", err: null });
}

async function sendOTP(req, res) {
  const { uid, emailId } = req.body;
  if (await userExists(uid, emailId)) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    await OTPStore.update({ uid }, { otp });
    util.sendOTP(emailId, otp);
    res.json({ res: "otp sent to emailID" });
  } else {
    res.json({ err: "incorrect UID or emailId" });
  }
}

async function resetPassword(req, res) {
  const { uid, otp, password } = req.body;
  const storedOtp = await OTPStore.read({ uid });
  if (storedOtp[0].otp === `${otp}`) {
    try {
      await updatePassword(uid, password);
      res.json({ res: "successfully updated password" });
    } catch (error) {
      logger.error("Error while updating", error);
      res.status(500);
      if (error.name === "UpdateError") res.json({ err: "Something went wrong while updating password" });
      else res.json({ err: "something went wrong" });
    }
  } else {
    res.json({ err: "incorrect otp" });
  }
}

export default {
  validateUser, sendOTP, resetPassword, login,
};
