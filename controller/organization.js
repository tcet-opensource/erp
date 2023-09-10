import {
  addNewOrganization, deleteOrganizationById, updateOrganizationById, getOrganizations,
} from "#services/organization";
import { logger } from "#util";

async function addOrganization(req, res) {
  const {
    parent, startDate, name, accreditation,
  } = req.body;
  try {
    const organization = await addNewOrganization(parent, startDate, name, accreditation);
    res.json({ res: `added organization${organization.name}`, id: organization.id });
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
  const {
    ...data
  } = req.body;

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
    const organization = await getOrganizations(req.query);
    return res.json({ res: organization });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

export default {
  addOrganization, updateOrganization, deleteOrganization, showOrganization,
};
