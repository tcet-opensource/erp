import {
  updateDepartmentbyid,
  createnewdepartment,
  listdepartment,
  deletedepartment,
} from "#services/department";
import { isEntityIdValid } from "#middleware/entityIdValidation";
import Accreditation from "#models/accreditation";
import Infrastructure from "#models/infrastructure";
import Organization from "#models/organization";
import { logger } from "#util";

async function addDepartment(req, res) {
  const {
    name,
    acronym,
    yearOfStarting,
    accreditations,
    infrastructures,
    organization,
  } = req.body;
  const isAccredationValid = await isEntityIdValid(
    accreditations,
    Accreditation,
  );
  const isInfrastructureValid = await isEntityIdValid(
    infrastructures,
    Infrastructure,
  );
  const isOrganizationValid = await isEntityIdValid(organization, Organization);

  try {
    if (!isAccredationValid && !isInfrastructureValid && !isOrganizationValid) {
      const error = "";
      if (!isAccredationValid) error.concat("Invalid Accreditation");
      if (!isInfrastructureValid) error.concat(" Invalid Infrastruction");
      if (!isOrganizationValid) error.concat(" Invalid Organization");
      res.status(400).json({ err: error });
    } else {
      const department = await createnewdepartment(
        name,
        acronym,
        yearOfStarting,
        accreditations,
        infrastructures,
        organization,
      );
      res.json({
        res: `added Department successfully ${department.name}`,
        id: department.id,
      });
    }
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function removedepartmentbyid(req, res) {
  const { departmentId } = req.params;
  try {
    await deletedepartment(departmentId);
    res.json({
      res: "Department deleted successfully",
    });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500);
    res.json({ err: "Error while deleting from DB" });
  }
}

async function showdepartments(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const departments = await listdepartment(filter, limit, page);
    return res.json({
      res: departments,
    });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

async function updatedDepartment(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateDepartmentbyid(id, data);
    res.json({
      res: "department updated successfully",
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

export default {
  updatedDepartment,
  showdepartments,
  removedepartmentbyid,
  addDepartment,
};
