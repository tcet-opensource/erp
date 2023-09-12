import { getModule, addNewModule } from "#services/module";
import { logger } from "#util";

async function showModule(req, res) {
  try {
    const modules = await getModule(req.query);
    return res.json({ res: modules });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    return res.json({ err: "Error while fetching the data" });
  }
}

async function addModule(req, res) {
  const {
    no, name, outcome, contents, hrsPerModule, cognitiveLevels,
  } = req.body;
  try {
    const newModule = await addNewModule(
      no,
      name,
      outcome,
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

export default {
  showModule, addModule,
};
