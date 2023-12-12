import connector from "#models/databaseUtil";

const employeeBankSchema = {
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
  bankAcc: {
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
  appointmentApproveSgDte: {
    type: String,
  },
};

// eslint-disable-next-line  no-unused-vars
const EmployeeBank = connector.model("Employee Bank", employeeBankSchema);

/// crud operation///

// employee personal details  to the database
async function create(employeeBankData) {
  const {
    uid,
    bankName,
    bankAcc,
    bankBranch,
    bankIfsc,
    bankMicr,
    appointmentApproveSgDte,
  } = employeeBankData;

  const empBank = new EmployeeBank({
    uid,
    bankName,
    bankAcc,
    bankBranch,
    bankIfsc,
    bankMicr,
    appointmentApproveSgDte,
  });

  const empBankDoc = await empBank.save({ session: employeeBankData.session });
  return empBankDoc;
}

async function read(filter, limit = 0, page = 1) {
  const empBankDoc = await EmployeeBank.find(filter)
    .limit(limit)
    .skip((page - 1) * limit)
    .exec();
  const count = await EmployeeBank.count();
  const totalPages = Math.ceil(count / limit);
  return { totalPages, data: empBankDoc };
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await EmployeeBank.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(empBankId) {
  const deleteResult = await EmployeeBank.deleteMany(empBankId);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
