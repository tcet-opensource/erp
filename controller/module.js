import { getModule } from "#services/module";
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

export default {
  showModule,
}
