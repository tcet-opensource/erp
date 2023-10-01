import {
  addNewAccreditation, deleteAccreditationById, updateAccreditationById, getAccreditations,
} from "#services/accreditation";
import { logger } from "#util";

async function addAccreditation(req, res) {
  const {
    name, agencyName, dateofAccreditation, dateofExpiry,
  } = req.body;
  try {
    // eslint-disable-next-line max-len
    const accreditation = await addNewAccreditation(name, agencyName, dateofAccreditation, dateofExpiry);
    res.json({ res: `added accreditation ${accreditation.name}`, id: accreditation.id });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}
async function deleteAccreditation(req, res) {
  const { id } = req.params;
  try {
    await deleteAccreditationById(id);
    res.json({ res: "Accreditation deleted successfully" });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500);
    res.json({ err: "Error while deleting from DB" });
  }
}

async function updateAccreditation(req, res) {
  const { id } = req.params;
  const {
    ...data
  } = req.body;

  try {
    await updateAccreditationById(id, data);
    res.json({ res: `${id} accreditation updated` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function showAccreditation(req, res) {
  try {
    const accreditation = await getAccreditations(req.query);
    return res.json({ res: accreditation });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

export default {
  addAccreditation, updateAccreditation, deleteAccreditation, showAccreditation,
};
