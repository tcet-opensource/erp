import {
  createAssignment,
  deleteAssignmentById,
  assignmentList,
  updateAssignmentById,
} from "#services/assignment";
import { logger } from "#util";

async function addAssignment(req, res) {
  const { no, title, type, marks } = req.body;
  try {
    const newAssignment = await createAssignment(no, title, type, marks);
    res.json({
      res: `added assignment ${newAssignment.id}`,
      id: newAssignment.id,
    });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateAssignment(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateAssignmentById(id, data);
    res.json({ res: `updated assignment ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getAssignment(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const assingmentlist = await assignmentList(filter, limit, page);
    return res.json({ res: assingmentlist });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

async function deleteAssignment(req, res) {
  const { id } = req.params;
  try {
    await deleteAssignmentById(id);
    return res.json({ res: `Deleted assignment with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    return res.status(500).json({ error: "Error while deleting from DB" });
  }
}
export default {
  addAssignment,
  deleteAssignment,
  getAssignment,
  updateAssignment,
};
