import connector from "#models/databaseUtil";

const employeePersonalSchema = {
  uid: { type: String, require: true },
  title: { type: String, required: true },
  empFirstName: { type: String, required: true },
  empMiddleName: { type: String, required: true },
  empLastName: { type: String, required: true },
  bloodGroup: { type: String, required: true },
  dob: { type: Date, required: true },
  birthPlace: { type: String, required: true },
  motherTongue: { type: String, required: true },
  gender: { type: String, required: true },
  religion: { type: String, required: true },
  numOfChildren: { type: Number },
  originalCastCategory: { type: String, required: true },
  caste: { type: String, required: true },
  subCaste: { type: String, required: true },
  spouseMailAddress: { type: String },
  spouseMobileNo: { type: Number },
  emrgContactNo: { type: Number, required: true },
  emrgContactPersonName: { type: String, required: true },
  empMobileNo: { type: Number, required: true },
  panNumber: { type: String, required: true },
  aadharCardNo: { type: Number, required: true },
  creditCardNumber: { type: Number },
  drivingLicenceNo: { type: String },
  drivingLicenceExpiry: { type: Date },
  passportNumber: { type: String },
  licId: { type: String },
  identificationMark: { type: String, required: true },
  addressTypePermanant: { type: String, required: true },
  permanantPlotNo: { type: String, required: true },
  permanantStreet: { type: String, required: true },
  permanantAddress: { type: String, required: true },
  permanantAddress2: { type: String },
  permanantCity: { type: String, required: true },
  permanantTahshil: { type: String, required: true },
  permanantDistrict: { type: String, required: true },
  permanantState: { type: String, required: true },
  permanantCountry: { type: String, required: true },
  permanantPincode: { type: Number, required: true },
  addressTypeCorrespondance: { type: String, required: true },
  correspondancePlotNo: { type: String, required: true },
  correspondanceStreet: { type: String, required: true },
  correspondanceAddress: { type: String, required: true },
  correspondanceAddress2: { type: String },
  correspondanceCity: { type: String, required: true },
  correspondanceTahshil: { type: String, required: true },
  correspondanceDistrict: { type: String, required: true },
  correspondanceState: { type: String, required: true },
  correspondanceCountry: { type: String, required: true },
  correspondancePincode: { type: Number, required: true },
  maritalStatus: { type: String, required: true },
  maidenFirstName: { type: String },
  maidenMiddleName: { type: String },
  maidenLastName: { type: String },
  isNameChangedBefore: { type: Boolean, required: true },
  previousFirstName: { type: String },
  previousMiddleName: { type: String },
  previousLastName: { type: String },
};
const EmployeePersonal = connector.model(
  "EmplyeePersonalData",
  employeePersonalSchema,
);
/// CRUD operations ///

async function create(employeePersonalData) {
  const employeePersonal = new EmployeePersonal(employeePersonalData);
  const employeePersonalDoc = await employeePersonal.save();
  return employeePersonalDoc;
}

async function read(filter, limit = 1) {
  const employeePersonalDoc = await EmployeePersonal.find(filter).limit(limit);
  return employeePersonalDoc;
}

async function update(filter, updateObject, options = { multi: true }) {
  const updateResult = await EmployeePersonal.updateMany(
    filter,
    { $set: updateObject },
    options,
  );
  return updateResult.acknowledged;
}

async function remove(filter) {
  const deleteResult = await EmployeePersonal.deleteMany(filter).exec();
  return deleteResult.acknowledged;
}

export default {
  create,
  read,
  update,
  remove,
};
