import {
  createAssingment, deleteAssingmentById, assingmentList, updateAssingmentById,
} from "#services/assingment";
import { logger } from "#util";

async function addAssingment(req, res) {
  const {
    no, title, type, marks,
  } = req.body;
  try {
    const newAssignment = await createAssingment(no, title, type, marks);
    res.json({ res: `added user ${newAssignment.id}` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateAssingment(req, res) {
  const {
    id, ...data
  } = req.body;
  try {
    await updateAssingmentById(id, data);
    res.json({ res: `updated assingment with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getAssingment(req, res) {
  const filter = req.query;
  const assingmentlist = await assingmentList(filter);
  res.json({ res: assingmentlist });
}

async function deleteAssingment(req, res) {
  const { assingmentId } = req.params;
  try {
    await deleteAssingmentById(assingmentId);

    res.json({ res: `Deleted assingment with ID ${assingmentId}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}
export default {
  addAssingment, deleteAssingment, getAssingment, updateAssingment,
};
