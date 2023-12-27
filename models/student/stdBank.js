import connector from "#models/databaseUtil";

const studentBankSchema = {
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  bankName: {
    type: String,
    required: true,
    minLength: 7,
  },
  bankAccount: {
    type: String,
    required: true,
    unique: true,
  },
  bankBranch: {
    type: String,
    required: true,
  },
  bankIfsc: {
    type: String,
    required: true,
    maxLength: 11,
    minLength: 11,
  },
  bankMicr: {
    type: String,
    required: true,
    maxLength: 9,
    minLength: 9,
  },
};

const StudentBank = connector.model("Student bank", studentBankSchema);

async function create(studentBankData) {
  const { uid, bankName, bankAccount, bankBranch, bankIfsc, bankMicr } =
    studentBankData;

  const stdBank = new StudentBank({
    uid,
    bankName,
    bankAccount,
    bankBranch,
    bankIfsc,
    bankMicr,
  });

  const stdBankDoc = await stdBank.save({ session: studentBankData.session });
  return stdBankDoc;
}

async function read(filter, limit = 0, page = 1) {
  const stdBankDoc = await StudentBank.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await StudentBank.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: stdBankDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await StudentBank.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(stdBankId) {
  const deleteResult = await StudentBank.deleteMany(stdBankId);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
