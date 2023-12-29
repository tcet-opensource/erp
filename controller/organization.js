import {
  addNewOrganization,
  deleteOrganizationById,
  updateOrganizationById,
  getOrganizations,
} from "#services/organization";
import { logger } from "#util";
import { isEntityIdValid } from "#middleware/entityIdValidation";
import Accreditation from "#models/accreditation";
import Parent from "#models/organization";

async function addOrganization(req, res) {
  const { parent, startDate, name, accreditations } = req.body;
  const isAccreditationsValid = await isEntityIdValid(
    accreditations,
    Accreditation,
  );
  const isParentValid = await isEntityIdValid(parent, Parent);
  try {
    if (!isAccreditationsValid || !isParentValid) {
      console.log(isAccreditationsValid);
      console.log(isParentValid);
      res.status(400).json({
        error: "Invalid Id",
      });
      return;
    }
    const organization = await addNewOrganization(
      parent,
      startDate,
      name,
      accreditations,
    );
    res.json({
      res: `added organization${organization.name}`,
      id: organization.id,
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}
async function deleteOrganization(req, res) {
  const { id } = req.params;
  try {
    await deleteOrganizationById(id);
    res.json({ res: "Organization deleted successfully" });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500);
    res.json({ err: "Error while deleting from DB" });
  }
}

async function updateOrganization(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;

  try {
    await updateOrganizationById(id, data);
    res.json({ res: "organization updated" });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function showOrganization(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const organization = await getOrganizations(filter, limit, page);
    return res.json({ res: organization });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

export default {
  addOrganization,
  updateOrganization,
  deleteOrganization,
  showOrganization,
};
