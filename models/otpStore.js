import connector from "#models/databaseUtil";

const otpStoreSchema = {
  uid: { type: String, unique: true, required: true },
  otp: { type: String, unique: true, required: true },
};

const OTPStore = connector.model("OTPStore", otpStoreSchema);

async function remove(filter) {
  const deleteResult = await OTPStore.deleteMany(filter);
  return deleteResult.acknowledged;
}

async function create(otpData) {
  const { uid, otp } = otpData;
  const otpStore = new OTPStore({
    uid,
    otp,
  });
  const otpDoc = await otpStore.save();
  return otpDoc;
}

async function read(filter, limit = 1) {
  const otpDoc = await OTPStore.find(filter).limit(limit);
  return otpDoc;
}

async function update(filter, updateObject, options = { upsert: true }) {
  const updateResult = await OTPStore.updateMany(filter, { $set: updateObject }, options);
  return updateResult.acknowledged;
}

export default {
  create, read, update, remove,
};
