import {
    addNewApplication,
    deleteApplicationById,
    updateApplicationById,
    getApplication,
  } from "#services/application";
  import { logger } from "#util";
  
  async function addApplication(req, res) {
    const {
        ERPID,
        type,
        data,
        collection,
    } = req.body;
    try {
      const application = await addNewApplication(
        ERPID,
        type,
        data,
        collection,
      );
      res.json({
        res: `added application ${application.ERPID}`,
        id: application.id,
      });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  async function deleteApplication(req, res) {
    const { id } = req.params;
    try {
      await deleteApplicationById(id);
      res.json({ res: "Application deleted successfully" });
    } catch (error) {
      logger.error("Error while deleting", error);
      res.status(500);
      res.json({ err: "Error while deleting from DB" });
    }
  }
  
  async function updateApplication(req, res) {
    const { id } = req.params;
    const { ...data } = req.body;
  
    try {
      await updateApplicationById(id, data);
      res.json({ res: `${id} application updated` });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  
  async function showApplication(req, res) {
    try {
      const filter = req.body;
      const { limit, page } = req.query;
      const application = await getApplication(filter, limit, page);
      return res.json({ res: application });
    } catch (error) {
      logger.error("Error while fetching", error);
      res.status(500);
      return res.json({ err: "Error while fetching the data" });
    }
  }
  
  export default {
    addApplication,
    updateApplication,
    deleteApplication,
    showApplication,
  };
  