import {
  createAssignment, deleteAssignmentById, assignmentList, updateAssignmentById,
} from "#services/assignment";
import { logger } from "#util";

async function addAssignment(req, res) {
  const {
    no, title, type, marks,
  } = req.body;
  try {
    const newAssignment = await createAssignment(no, title, type, marks);
    res.json({ res: `added user ${newAssignment.id}` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateAssignment(req, res) {
  const {
    id, ...data
  } = req.body;
  try {
    await updateAssignmentById(id, data);
    res.json({ res: `updated assignment with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getAssignment(req, res) {
  const filter = req.query;
  const assingmentlist = await assignmentList(filter);
  res.json({ res: assingmentlist });
}

async function deleteAssignment(req, res) {
  const { assignmentId } = req.params;
  try {
    await deleteAssignmentById(assignmentId);

    res.json({ res: `Deleted assignment with ID ${assignmentId}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}
export default {
  addAssignment, deleteAssignment, getAssignment, updateAssignment,
};
