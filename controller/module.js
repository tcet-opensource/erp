import {
  getModule,
  addNewModule,
  updateModuleById,
  deleteModuleById,
} from "#services/module";
import { logger } from "#util";

async function showModule(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const modules = await getModule(filter, limit, page);
    return res.json({ res: modules });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

async function addModule(req, res) {
  const { no, name, contents, hrsPerModule, cognitiveLevels } = req.body;
  try {
    const newModule = await addNewModule(
      no,
      name,
      contents,
      hrsPerModule,
      cognitiveLevels,
    );
    res.json({ res: `added module ${newModule.name}` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function updateModule(req, res) {
  const { id } = req.params;
  const { ...data } = req.body;
  try {
    await updateModuleById(id, data);
    res.json({ res: `updated Module with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updaing in DB" });
  }
}

async function deleteModule(req, res) {
  const { id } = req.params;
  try {
    await deleteModuleById(id);

    res.json({ res: `Deleted Module with id ${id}` });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500).json({ error: "Error while deleting from DB" });
  }
}

export default {
  showModule,
  addModule,
  updateModule,
  deleteModule,
};
