import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import performacontroller from "#controller/performance";

const router = express.Router();

router.get(
  "/test",
  authenticateToken,
  authorization(["ADMIN"]),
  performacontroller,
);

export default router;
