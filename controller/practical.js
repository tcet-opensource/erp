// Import Practical-related services and utilities
import {
    createPractical,
    deletePracticalById,
    listPractical,
    updatePracticalById,
  } from "#services/practical"; 
  
  import { logger } from "#util"; // Import the logger utility
  
  // Controller function to add a new Practical entity
  async function addPractical(req, res) {
    const {
      no, title, type, hours, cognitiveLevels,
    } = req.body;
    try {
      const newPractical = await createPractical({
        no, title, type, hours, cognitiveLevels,
      });
      res.json({ res: `Added Practical with ID ${newPractical.id}` });
    } catch (error) {
      logger.error("Error while inserting Practical", error);
      res.status(500);
      res.json({ err: "Error while inserting Practical in DB" });
    }
  }
  
  // Controller function to update a Practical entity
  async function updatePractical(req, res) {
    const {
      id, ...data
    } = req.body;
    try {
      await updatePracticalById(id, data);
      res.json({ res: `Updated Practical with ID ${id}` });
    } catch (error) {
      logger.error("Error while updating Practical", error);
      res.status(500);
      res.json({ err: "Error while updating Practical in DB" });
    }
  }
  
  // Controller function to get a list of Practical entities
  async function getPractical(req, res) {
    const filter = req.query;
    const practicalList = await listPractical(filter);
    res.json({ res: practicalList });
  }
  
  // Controller function to delete a Practical entity
  async function deletePractical(req, res) {
    const { practicalId } = req.params;
    try {
      await deletePracticalById(practicalId);
      res.json({ res: `Deleted Practical with ID ${practicalId}` });
    } catch (error) {
      logger.error("Error while deleting Practical", error);
      res.status(500).json({ error: "Error while deleting Practical from DB" });
    }
  }
  
  export default {
    addPractical,
    deletePractical,
    getPractical,
    updatePractical,
  };
  