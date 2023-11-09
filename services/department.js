import department from "#models/department";
import databaseError from "#error/database";

export async function createnewdepartment(
  name,
  acronym,
  yearOfStarting,
  accreditations,
  infrastructures,
  organization,
) {
  const newdepartment = await department.create({
    name,
    acronym,
    yearOfStarting,
    accreditations,
    infrastructures,
    organization,
  });
  if (newdepartment.name === name) {
    return newdepartment;
  }
  throw new databaseError.DataEntryError("Add department");
}

export async function listdepartment(filter, limit, page) {
  const listeddepartment = await department.read(filter, limit, page);
  if (listeddepartment) {
    return listeddepartment;
  }
  throw new databaseError.DataNotFoundError("Department");
}

export async function deletedepartment(departmentId) {
  const deletedDepartment = await department.remove({
    _id: departmentId,
  });
  if (deletedDepartment) {
    return deletedDepartment;
  }
  throw new databaseError.DataDeleteError("department");
}

export async function updateDepartmentbyid(id, data) {
  const updatedDepartment = await department.update(
    {
      _id: id,
    },
    data,
  );
  if (updatedDepartment) {
    return updatedDepartment;
  }
  throw new databaseError.DataEntryError("department");
}

export default {
  updateDepartmentbyid,
  createnewdepartment,
  listdepartment,
  deletedepartment,
};
