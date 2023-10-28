import {
  createCourse,
  courseList,
  deleteCourseById,
  updateCourseById,
} from "#services/course";
import { logger } from "#util";

async function addCourse(req, res) {
  const {
    name,
    code,
    theoryHours,
    department,
    tutorialHours,
    practicalHours,
    ISAMarks,
    ESEMarks,
    tutorialMarks,
    practicalMarks,
    semester,
    subType,
    prerequisites,
    objective,
    outcomes,
    modules,
    practicals,
    tutorials,
    assignments,
    reccTextbooks,
    refBooks,
  } = req.body;
  try {
    const newCourse = await createCourse(
      name,
      code,
      theoryHours,
      department,
      tutorialHours,
      practicalHours,
      ISAMarks,
      ESEMarks,
      tutorialMarks,
      practicalMarks,
      semester,
      subType,
      prerequisites,
      objective,
      outcomes,
      modules,
      practicals,
      tutorials,
      assignments,
      reccTextbooks,
      refBooks,
    );
    res.json({ res: `added course ${newCourse.ERPID}` });
  } catch (error) {
    logger.error("Error while inserting", error);
    res.status(500);
    res.json({ err: "Error while inserting in DB" });
  }
}

async function getCourse(req, res) {
  try {
    const filter = req.body;
    const { limit, page } = req.query;
    const courselist = await courseList(filter, limit, page);
    res.json({ res: courselist });
  } catch (error) {
    logger.error("Error while fetching", error);
    res.status(500);
    res.json({ err: "Error while fetching the data" });
  }
}

async function deleteCourse(req, res) {
  const { courseId } = req.params;
  try {
    await deleteCourseById(courseId);
    res.json({ res: "Course deleted successfully" });
  } catch (error) {
    logger.error("Error while deleting", error);
    res.status(500);
    res.json({ err: "Error while deleting from DB" });
  }
}

async function updateCourse(req, res) {
  const { id, ...data } = req.body;
  try {
    await updateCourseById(id, data);
    res.json({ res: `updated course with id ${id}` });
  } catch (error) {
    logger.error("Error while updating", error);
    res.status(500);
    res.json({ err: "Error while updating in DB" });
  }
}

export default {
  addCourse,
  getCourse,
  deleteCourse,
  updateCourse,
};
