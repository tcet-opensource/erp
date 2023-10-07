import connector from "#models/databaseUtil";

const employeeBankSchema = {
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  bank_name: {
    type: String,
    required: true,
    minLength: 7,
  },
  bank_acc: {
    type: String,
    required: true,
    unique: true,
  },
  bank_branch: {
    type: String,
    required: true,
  },
  bank_ifsc: {
    type: String,
    required: true,
    maxLength: 11,
    minLength: 11,
  },
  bank_micr: {
    type: String,
    required: true,
    maxLength: 9,
    minLength: 9,
  },
  appointment_approve_sg_dte: {
    type: String,
  },
};

// eslint-disable-next-line  no-unused-vars
const EmployeeBank = connector.model("Employee bank", employeeBankSchema);

///crud operation///

// employee personal details  to the database
async function create(employeeBankData) {
  const {
    uid,
    bank_name,
    bank_acc,
    bank_branch,
    bank_ifsc,
    bank_micr,
    appointment_approve_sg_dte,
  } = employeeBankData;

  const empBank = new EmployeeBank({
    uid,
    bank_name,
    bank_acc,
    bank_branch,
    bank_ifsc,
    bank_micr,
    appointment_approve_sg_dte,
  });

  const empBankDoc = await empBank.save();
  return empBankDoc;
}

async function read(filter, limit = 1) {
  const empBankDoc = employeeBankSchema.find(filter).limit(limit);
  return empBankDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await employeeBankSchema.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(empBankId) {
  const deleteResult = await employeeBankSchema.deleteMany(empBankId);
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};