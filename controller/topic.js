import {
    addNewTopic, deleteTopicById, updateTopicById, getTopics,
  } from "#services/topic";
  import { logger } from "#util";
  
  async function addTopic(req, res) {
    const {
        title,
    } = req.body;
    try {
      // eslint-disable-next-line max-len
      const topic = await addNewTopic(title);
      res.json({ res: `added accreditation ${topic.name}`, id: topic.id });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  async function deleteTopic(req, res) {
    const { id } = req.params;
    try {
      await deleteTopicById(id);
      res.json({ res: "Topic deleted successfully" });
    } catch (error) {
      logger.error("Error while deleting", error);
      res.status(500);
      res.json({ err: "Error while deleting from DB" });
    }
  }
  
  async function updateTopic(req, res) {
    const { id } = req.params;
    const {
      ...data
    } = req.body;
  
    try {
      await updateTopicById(id, data);
      res.json({ res: `${id} topic updated` });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  
  async function showTopic(req, res) {
    try {
      const topic = await getTopics(req.query);
      return res.json({ res: topic });
    } catch (error) {
      logger.error("Error while fetching", error);
      res.status(500);
      return res.json({ err: "Error while fetching the data" });
    }
  }
  
  export default {
    addTopic, updateTopic, deleteTopic, showTopic,
  };