import databaseError from "#error/database";
import EmployeePersonal from "#models/employee/empPersonal";

export async function addNewEmployeePersonal(uid, title, empFirstName, empLastName, bloodGroup, dob, birthPlace, motherTongue, gender, religion, numOfChildren, originalCastCategory, caste, subCaste, spouseMailAddress, spouseMobileNo, emrgContactNo, emrgContactPersonName, empMobileNo, panNumber, aadharCardNo, creditCardNumber, drivingLicenceNo, drivingLicenceExpiry, passportNumber, licId, identificationMark, addressTypePermanant, permanantPlotNo, permanantStreet, permanantAddress, permanantAddress2, permanantCity, permanantTahshil, permanantDistrict, permanantState, permanantCountry, permanantPincode, addressTypeCorrespondance, correspondancePlotNo, correspondanceStreet, correspondanceAddress, correspondanceAddress2, correspondanceCity, correspondanceTahshil, correspondanceDistrict, correspondanceState, correspondanceCountry, correspondancePincode, maritalStatus, maidenFirstName, maidenMiddleName, maidenLastName, isNameChangedBefore, previousFirstName, previousMiddleName, previousLastName) {
  const newEmployeePersonal = await EmployeePersonal.create({
    uid,
    title,
    empFirstName,
    empLastName,
    bloodGroup,
    dob,
    birthPlace,
    motherTongue,
    gender,
    religion,
    numOfChildren,
    originalCastCategory,
    caste,
    subCaste,
    spouseMailAddress,
    spouseMobileNo,
    emrgContactNo,
    emrgContactPersonName,
    empMobileNo,
    panNumber,
    aadharCardNo,
    creditCardNumber,
    drivingLicenceNo,
    drivingLicenceExpiry,
    passportNumber,
    licId,
    identificationMark,
    addressTypePermanant,
    permanantPlotNo,
    permanantStreet,
    permanantAddress,
    permanantAddress2,
    permanantCity,
    permanantTahshil,
    permanantDistrict,
    permanantState,
    permanantCountry,
    permanantPincode,
    addressTypeCorrespondance,
    correspondancePlotNo,
    correspondanceStreet,
    correspondanceAddress,
    correspondanceAddress2,
    correspondanceCity,
    correspondanceTahshil,
    correspondanceDistrict,
    correspondanceState,
    correspondanceCountry,
    correspondancePincode,
    maritalStatus,
    maidenFirstName,
    maidenMiddleName,
    maidenLastName,
    isNameChangedBefore,
    previousFirstName,
    previousMiddleName,
    previousLastName,
  });
  if (newEmployeePersonal.uid === uid) {
    return newEmployeePersonal;
  }
  throw new databaseError.DataEntryError("Add EmployeePersonal");
}

export async function getEmployeePersonal(filter) {
  const employeePersonal = await EmployeePersonal.read(filter);
  if (employeePersonal) {
    return employeePersonal;
  }
  throw new databaseError.DataNotFoundError("EmployeePersonal");
}

export async function deleteEmployeePersonalById(employeePersonalId) {
  const deleted = await EmployeePersonal.remove({ _id: employeePersonalId });
  if (deleted) {
    return deleted;
  }
  throw new databaseError.DataDeleteError("EmployeePersonal");
}

export async function updateEmployeePersonalById(id, data) {
  const updated = await EmployeePersonal.update({ _id: id }, data);
  if (updated) {
    return updated;
  }
  throw new databaseError.DataEntryError("EmployeePersonal");
}