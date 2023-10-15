import express from "express";
import authenticateToken from "#middleware/auth";
import authorization from "#middleware/authorization";
import departmentContoller from "#controller/department";

const router = express.Router();

router.get(
  "/list",
  authenticateToken,
  authorization(["ADMIN"]),
  departmentContoller.showdepartments,
);
router.post(
  "/create",
  authenticateToken,
  authorization(["ADMIN"]),
  departmentContoller.addDepartment,
);
router.delete(
  "/delete/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  departmentContoller.removedepartmentbyid,
);
router.post(
  "/update/:id",
  authenticateToken,
  authorization(["ADMIN"]),
  departmentContoller.updatedDepartment,
);

export default router;
