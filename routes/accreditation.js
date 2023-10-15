import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import accreditationController from "#controller/accreditation";

const router = express.Router();
router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  accreditationController.showAccreditation,
);
router.post(
  "/add",
  authenticateToken,
  authorization(["ADMIN"]),
  accreditationController.addAccreditation,
);
router.delete("/delete/:id", accreditationController.deleteAccreditation);
router.post("/update/:id", accreditationController.updateAccreditation);

export default router;
