import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import groupController from "#controller/group";

const router = express.Router();
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  groupController.addGroup,
);
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  groupController.getGroup,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  groupController.updateGroup,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN", "FACULTY"]),
  groupController.deleteGroup,
);

export default router;
