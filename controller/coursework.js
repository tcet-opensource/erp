// Import Coursework-related services and utilities
import {
    createCoursework,
    deleteCourseworkById,
    listCoursework,
    updateCourseworkById,
  } from "#services/coursework"; 
  
  import { logger } from "#util"; // Import the logger utility
  
  // Controller function to add a new Coursework entity
  async function addCoursework(req, res) {
    const {
        student , type , course , task , objectID , activity , marks , 
    } = req.body;
    try {
      const newCoursework = await createCoursework({
        student , type , course , task , objectID , activity , marks , 
      });
      res.json({ res: `Added Coursework with ID ${newCoursework.id}` });
    } catch (error) {
      logger.error("Error while inserting Coursework", error);
      res.status(500);
      res.json({ err: "Error while inserting Coursework in DB" });
    }
  }
  
  // Controller function to update a Coursework entity
  async function updateCoursework(req, res) {
    const {
      id, ...data
    } = req.body;
    try {
      await updateCourseworkById(id, data);
      res.json({ res: `/Updated Coursework/` });
    } catch (error) {
      logger.error("Error while updating Coursework", error);
      res.status(500);
      res.json({ err: "Error while updating Coursework in DB" });
    }
  }
  
  // Controller function to get a list of Coursework entities
  async function getCoursework(req, res) {
    const filter = req.query;
    const courseworkList = await listCoursework(filter);
    res.json({ res: courseworkList });
  }
  
  // Controller function to delete a Coursework entity
  async function deleteCoursework(req, res) {
    const { courseworkId } = req.params;
    try {
      await deleteCourseworkById(courseworkId);
      res.json({ res: `Deleted Coursework with ID ${courseworkId}` });
    } catch (error) {
      logger.error("Error while deleting Coursework", error);
      res.status(500).json({ error: "Error while deleting Coursework from DB" });
    }
  }
  
  export default {
    addCoursework,
    deleteCoursework,
    getCoursework,
    updateCoursework,
  };
  