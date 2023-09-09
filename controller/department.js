import {
  updateDepartmentbyid, createnewdepartment, listdepartment, deletedepartment,
} from "#services/department";

import { logger } from "#util";

async function addDepartment(req, res) {
  const {
    name,
    acronym,
    yearOfStarting,
    accreditations,
    infrastructures,
  } = req.body;
  try {
    const department = await createnewdepartment(
      name,
      acronym,
      yearOfStarting,
      accreditations,
      infrastructures,
    );
    res.json({
      res: `added Department successfully ${department.name}`,
    });
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
    const departments = await listdepartment(req.query);
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
  const {
    id, ...data
  } = req.body;
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
  updatedDepartment, showdepartments, removedepartmentbyid, addDepartment,
};
