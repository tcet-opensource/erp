import express from "express";
import groupController from "#controller/group";

const router = express.Router();
router.post("/add", groupController.addGroup);
router.get("/list", groupController.getGroup);
router.post("/update/:id", groupController.updateGroup);
router.delete("/delete/:id", groupController.deleteGroup);

export default router;
