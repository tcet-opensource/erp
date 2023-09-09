import {
    addNewTutorial, deleteTutorialById, updateTutorialById, getTutorials,
  } from "#services/tutorial";
  import { logger } from "#util";
  
  async function addTutorial(req, res) {
    const {
      no, title, hours, cognitiveLevel, 
    } = req.body;
    try {
      // eslint-disable-next-line max-len
      const tutorial = await addNewTutorial(no, title, hours, cognitiveLevel,);
      res.json({ res: `added tutorial ${tutorial.name}` });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  async function deleteTutorial(req, res) {
    const { tutorialId } = req.params;
    try {
      await deleteTutorialById(tutorialId);
      res.json({ res: "Tutorial deleted successfully" });
    } catch (error) {
      logger.error("Error while deleting", error);
      res.status(500);
      res.json({ err: "Error while deleting from DB" });
    }
  }
  
  async function updateTutorial(req, res) {
    const {
      id, ...data
    } = req.body;
  
    try {
      await updateTutorialById(id, data);
      res.json({ res: "tutorial updated" });
    } catch (error) {
      logger.error("Error while inserting", error);
      res.status(500);
      res.json({ err: "Error while inserting in DB" });
    }
  }
  
  async function showTutorial(req, res) {
    try {
      const tutorial = await getTutorials(req.query);
      return res.json({ res: tutorial });
    } catch (error) {
      logger.error("Error while fetching", error);
      res.status(500);
      return res.json({ err: "Error while fetching the data" });
    }
  }
  
  export default {
    addTutorial, updateTutorial, deleteTutorial, showTutorial,
  };