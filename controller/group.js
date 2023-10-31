import {
  createGroup,
  deleteGroupById,
  groupList,
  updateGroupById,
} from "#services/group";
import { logger } from "#util";
import { isEntityIdValid } from "#middleware/entityIdValidation";
import Student from '#models/student';

async function addGroup(req, res) {
  const { title, student } = req.body;
  const isStudentValid = await isEntityIdValid(student, Student);
  try {
    if(isStudentValid){
    const group = await createGroup(title, student);
    res.json({ res: `added group ${group.id}`, id: group.id });
    }
    else{
      res.status(400).json({err: "Invalid Id"});
    }
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateGroup(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateGroupById(id, data);
    res.json({ res: `updated group with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function getGroup(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const group = await groupList(filter, limit, page);
    res.json({ res: group });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    res.json({ err: "Error while fetching the data" });
  }
}

async function deleteGroup(req, res) {
  const { id } = req.params;
  try {
    await deleteGroupById(id);
    res.json({ res: `Deleted group with ID ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  addGroup,
  deleteGroup,
  getGroup,
  updateGroup,
};
