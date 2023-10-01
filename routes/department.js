import express from "express";
import departmentContoller from "#controller/department";

const router = express.Router();

router.get("/list", departmentContoller.showdepartments);
router.post("/create", departmentContoller.addDepartment);
router.delete("/delete/:id", departmentContoller.removedepartmentbyid);
router.post("/update/:id", departmentContoller.updatedDepartment);

export default router;
