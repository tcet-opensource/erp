import connector from "#models/databaseUtil";
import { hashPassword } from "#util";

const userSchema = {
  name: { type: String, required: true },
  emailId: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  uid: { type: String, unique: true, required: true },
  userType: {
    type: String,
    required: true,
    enum: ["ADMIN", "FACULTY", "EMPLOYEE", "STUDENT", "PARENT", "DEV"],
    default: "ADMIN",
    // for now we are keeping the default usertype as ADMIN
  },
};

const User = connector.model("User", userSchema);

async function remove(filter) {
  const deleteResult = await User.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(userData) {
  const { name, password, emailId, uid, userType } = userData;
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

async function createMultiple(userDataArray) {
  const hashPromises = userDataArray.map(async (userData) => {
    const { name, emailId, password, uid, userType } = userData;
    const hashedPassword = await hashPassword(password);
    return User({
      name,
      password: hashedPassword,
      emailId,
      uid,
      userType,
    });
  });
  const users = await Promise.all(hashPromises);
  const userDocs = await User.insertMany(users);
  return userDocs;
}

async function read(filter, limit = 0, page = 1) {
  const userDoc = await User.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await User.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: userDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await User.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
  createMultiple,
};
