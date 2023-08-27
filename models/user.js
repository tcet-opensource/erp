import connector from "#models/databaseUtil";
import { hashPassword } from "#util";

connector.set("debug", true);
const userSchema = {
  name: { type: String, required: true },
  emailId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  uid: { type: String, unique: true, required: true },
  userType: { type: String, required: true },
};

const User = connector.model("User", userSchema);

async function remove(filter) {
  const deleteResult = await User.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(userData) {
  const {
    name, password, emailId, uid, userType,
  } = userData;
  const hashedPassword = await hashPassword(password);
  const user = new User({
    name,
    password: hashedPassword,
    emailId,
    uid,
    userType,
  });
  const userDoc = await user.save();
  return userDoc;
}

async function read(filter, limit = 1) {
  const userDoc = await User.find(filter).limit(limit);
  return userDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await User.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create, read, update, remove,
};
